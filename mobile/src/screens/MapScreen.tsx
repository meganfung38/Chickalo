import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import * as Location from 'expo-location';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import AvatarMarker from '../components/AvatarMarker';
import { styles } from '../styles';
import { MapScreenProps } from '../types';
import { COLORS } from '../styles';
import { MAP_BOUNDARY_RADIUS } from '../constants/mapStyle';
import { 
  requestLocationPermissions, 
  startLocationTracking, 
  calculateDistance,
  Coordinates 
} from '../utils/location';
import {
  initializeSocket,
  disconnectSocket,
  emitLocationUpdate,
  subscribeToLocationUpdates,
  joinLocationTracking,
  leaveLocationTracking,
  LocationUpdate,
} from '../services/socket';
import { storageAPI } from '../services/api';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL } from '../config/mapbox';

// Initialize Mapbox
Mapbox.setAccessToken(MAPBOX_ACCESS_TOKEN);

const MapScreen: React.FC<MapScreenProps> = ({ 
  user, 
  isActive, 
  onToggleActivity, 
  onNavigateToSettings 
}) => {
  const cameraRef = useRef<Mapbox.Camera>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);
  const lastEmittedLocation = useRef<Coordinates | null>(null);
  const emitDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  
  // State
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [initialCameraPosition, setInitialCameraPosition] = useState<Coordinates | null>(null);
  const [nearbyUsers, setNearbyUsers] = useState<LocationUpdate[]>([]);
  const [hasLocationPermission, setHasLocationPermission] = useState<boolean>(false);

  // Initialize location and socket on mount
  useEffect(() => {
    console.log('[MapScreen] Component mounted, initializing...');
    initializeLocationTracking();
    
    return () => {
      // Cleanup on unmount
      console.log('[MapScreen] Component UNMOUNTING - cleaning up...');
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
      if (emitDebounceTimer.current) {
        clearTimeout(emitDebounceTimer.current);
      }
      disconnectSocket();
    };
  }, []);

  // Handle activity toggle changes
  useEffect(() => {
    if (!hasLocationPermission) return;

    if (isActive) {
      // User went active: join location tracking and recenter
      handleJoinLocationTracking();
      handleRecenterMap();
    } else {
      // User went inactive: leave location tracking and recenter
      handleLeaveLocationTracking();
      handleRecenterMap();
    }
  }, [isActive, hasLocationPermission]);

  // Subscribe to location updates from nearby users
  useEffect(() => {
    subscribeToLocationUpdates((users) => {
      setNearbyUsers(users);
    });

    return () => {
      // Unsubscribe on unmount
      if (typeof subscribeToLocationUpdates === 'function') {
        // Note: unsubscribe handled in socket service
      }
    };
  }, []);

  const initializeLocationTracking = async () => {
    const { granted, location } = await requestLocationPermissions();

    if (!granted) {
      setHasLocationPermission(false);
      Alert.alert(
        'Location Permission Required',
        'Chickalo requires location access to show you on the map and connect you with nearby users. Please enable location permissions in your device settings to use the app.',
        [{ text: 'OK' }]
      );
      return;
    }

    setHasLocationPermission(true);

    if (location) {
      const coords: Coordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(coords);
      setInitialCameraPosition(coords); // Set initial camera position once

      // Initialize Socket.io
      const token = await storageAPI.getToken();
      if (token) {
        initializeSocket(token);
      }

      // Start watching location
      const subscription = await startLocationTracking((newLocation) => {
        const newCoords: Coordinates = {
          latitude: newLocation.coords.latitude,
          longitude: newLocation.coords.longitude,
        };
        
        // Update local state immediately for smooth visual updates
        setUserLocation(newCoords);

        // Debounce network emissions to prevent excessive Socket.io traffic
        // Only emit if user moved significantly (5+ meters) or after 2 seconds
        if (isActive) {
          const shouldEmit = !lastEmittedLocation.current || 
            calculateDistance(lastEmittedLocation.current, newCoords) >= 5;

          if (shouldEmit) {
            // Emit immediately if moved 5+ meters
            emitLocationUpdate(user.id, newCoords);
            lastEmittedLocation.current = newCoords;
            
            // Clear any pending debounce timer
            if (emitDebounceTimer.current) {
              clearTimeout(emitDebounceTimer.current);
            }
          } else {
            // Debounce: emit after 2 seconds of small movements
            if (emitDebounceTimer.current) {
              clearTimeout(emitDebounceTimer.current);
            }
            emitDebounceTimer.current = setTimeout(() => {
              emitLocationUpdate(user.id, newCoords);
              lastEmittedLocation.current = newCoords;
            }, 2000);
          }
        }
      });

      locationSubscription.current = subscription;
    }
  };

  const handleJoinLocationTracking = () => {
    try {
      console.log('[MapScreen] Joining location tracking for user:', user.id);
      joinLocationTracking(user.id);
      if (userLocation) {
        emitLocationUpdate(user.id, userLocation);
      }
    } catch (error) {
      console.error('Error joining location tracking:', error);
    }
  };

  const handleLeaveLocationTracking = () => {
    try {
      console.log('[MapScreen] Leaving location tracking for user:', user.id);
      leaveLocationTracking(user.id);
      setNearbyUsers([]); // Clear nearby users when inactive
    } catch (error) {
      console.error('Error leaving location tracking:', error);
    }
  };

  const handleRecenterMap = () => {
    if (cameraRef.current && userLocation) {
      cameraRef.current.setCamera({
        centerCoordinate: [userLocation.longitude, userLocation.latitude],
        zoomLevel: 19, // Very zoomed in for detailed view
        pitch: 60,
        animationDuration: 1000,
        animationMode: 'flyTo',
      });
    }
  };

  const handleRegionDidChange = async () => {
    // Mapbox boundary enforcement
    // Note: Mapbox uses different approach - we'll handle in onCameraChanged
  };

  const onNavigateToMap = () => {
    // Already on map screen, do nothing
  };

  // Show permission denied message if no location access
  if (!hasLocationPermission) {
    return (
      <View style={styles.mapContainer}>
        <Header username={user.username} isActive={false} />
        
        <View style={[styles.mapContent, styles.permissionDeniedContainer]}>
          <Text style={styles.permissionDeniedEmoji}>📍</Text>
          <Text style={styles.permissionDeniedTitle}>Location Access Required</Text>
          <Text style={styles.permissionDeniedMessage}>
            Please enable location permissions in your device settings to use Chickalo.
          </Text>
        </View>

        <BottomNavigation
          currentScreen="map"
          isActive={false}
          onToggleActivity={() => {}} // Disabled
          onNavigateToMap={onNavigateToMap}
          onNavigateToSettings={onNavigateToSettings}
          userAvatarData={user.avatar_data}
        />
      </View>
    );
  }

  // Show loading if location not yet obtained
  if (!userLocation) {
    return (
      <View style={styles.mapContainer}>
        <Header username={user.username} isActive={isActive} />
        
        <View style={[styles.mapContent, styles.loadingContainer]}>
          <Text style={styles.loadingText}>🗺️ Loading map...</Text>
        </View>

        <BottomNavigation
          currentScreen="map"
          isActive={isActive}
          onToggleActivity={onToggleActivity}
          onNavigateToMap={onNavigateToMap}
          onNavigateToSettings={onNavigateToSettings}
          userAvatarData={user.avatar_data}
        />
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      {/* Header */}
      <Header username={user.username} isActive={isActive} />
      
      {/* Main Content - Map View */}
      <View style={styles.mapContent}>
        <Mapbox.MapView
          style={styles.mapView}
          styleURL={MAPBOX_STYLE_URL}
          zoomEnabled={true}
          scrollEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          attributionEnabled={false}
          logoEnabled={false}
        >
          <Mapbox.Camera
            ref={cameraRef}
            zoomLevel={19}
            pitch={60}
            centerCoordinate={initialCameraPosition ? [initialCameraPosition.longitude, initialCameraPosition.latitude] : [userLocation.longitude, userLocation.latitude]}
            animationMode="flyTo"
            animationDuration={1000}
          />

          {/* Current User Marker */}
          <Mapbox.MarkerView
            key={`current-user-${isActive}`}
            id="current-user"
            coordinate={[userLocation.longitude, userLocation.latitude]}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <AvatarMarker
              avatarSettings={user.avatar_data}
              isActive={isActive}
              isCurrentUser={true}
              headline={user.headline}
            />
          </Mapbox.MarkerView>

          {/* Nearby Active Users (only shown when current user is active) */}
          {isActive && nearbyUsers.map((nearbyUser) => (
            <Mapbox.MarkerView
              key={`user-${nearbyUser.userId}`}
              id={`user-${nearbyUser.userId}`}
              coordinate={[nearbyUser.longitude, nearbyUser.latitude]}
              anchor={{ x: 0.5, y: 0.5 }}
            >
              <AvatarMarker
                avatarSettings={nearbyUser.avatar_data}
                isActive={nearbyUser.is_active}
                isCurrentUser={false}
                headline={nearbyUser.headline}
              />
            </Mapbox.MarkerView>
          ))}
        </Mapbox.MapView>

        {/* Recenter Button */}
        <TouchableOpacity
          style={styles.recenterButton}
          onPress={handleRecenterMap}
        >
          <Text style={styles.recenterButtonText}>⊕</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentScreen="map"
        isActive={isActive}
        onToggleActivity={onToggleActivity}
        onNavigateToMap={onNavigateToMap}
        onNavigateToSettings={onNavigateToSettings}
        userAvatarData={user.avatar_data}
      />
    </View>
  );
};

export default MapScreen;