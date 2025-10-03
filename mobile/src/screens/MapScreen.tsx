import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { authAPI } from '../services/api';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';

interface MapScreenProps {
  user: any;
  isActive: boolean;
  onToggleActivity: () => void;
  onNavigateToSettings: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ user, isActive, onToggleActivity, onNavigateToSettings }) => {

  const handleNavigateToMap = () => {
    // Already on map screen, do nothing or scroll to top
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header username={user.username} isActive={isActive} />
      
      {/* Main Content - Map View */}
      <View style={styles.content}>
        {/* Map Container - Full Screen */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>🗺️ Interactive Map</Text>
          <Text style={styles.mapSubtext}>
            {isActive ? 'You are visible to others nearby' : 'You are hidden from the map'}
          </Text>
          <Text style={styles.mapPlaceholder}>
            Map implementation coming soon...
          </Text>
        </View>
      </View>

      {/* Floating Bottom Navigation */}
      <BottomNavigation
        currentScreen="map"
        isActive={isActive}
        onToggleActivity={onToggleActivity}
        onNavigateToMap={handleNavigateToMap}
        onNavigateToSettings={onNavigateToSettings}
        userAvatarData={user.avatar_data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Clean white background
  },
  content: {
    flex: 1,
    paddingHorizontal: 0, // Remove horizontal padding for full width map
    paddingBottom: 120, // Add space so content doesn't get hidden under floating nav
  },
  mapContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0, // Full width and height
    borderRadius: 0, // Remove border radius for full coverage
  },
  mapText: {
    fontSize: 28,
    marginBottom: 15,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  mapPlaceholder: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default MapScreen;