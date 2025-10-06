// Centralized location utilities for GPS tracking and proximity calculations
import * as Location from 'expo-location';

// Proximity radius in feet (200-300ft as specified)
export const PROXIMITY_RADIUS_FEET = 250;
export const PROXIMITY_RADIUS_METERS = PROXIMITY_RADIUS_FEET * 0.3048; // Convert to meters

// Location update interval (milliseconds) - Pokemon Go style real-time tracking
export const LOCATION_UPDATE_INTERVAL = 1000; // 1 second (real-time)
export const LOCATION_UPDATE_DISTANCE = 1; // 1 meter minimum movement (smooth tracking)

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Request location permissions from the user
 * @returns Permission status and location if granted
 */
export const requestLocationPermissions = async (): Promise<{
  granted: boolean;
  location: Location.LocationObject | null;
}> => {
  try {
    // Request foreground location permissions
    const { status } = await Location.requestForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Location permission denied');
      return { granted: false, location: null };
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return { granted: true, location };
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return { granted: false, location: null };
  }
};

/**
 * Start watching user's location with updates
 * @param callback Function to call when location updates
 * @returns Location watch subscription
 */
export const startLocationTracking = async (
  callback: (location: Location.LocationObject) => void
): Promise<Location.LocationSubscription | null> => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    
    if (status !== 'granted') {
      console.log('Location permission not granted');
      return null;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation, // High accuracy for real-time tracking
        timeInterval: LOCATION_UPDATE_INTERVAL,
        distanceInterval: LOCATION_UPDATE_DISTANCE,
      },
      callback
    );

    return subscription;
  } catch (error) {
    console.error('Error starting location tracking:', error);
    return null;
  }
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns Distance in meters
 */
export const calculateDistance = (coord1: Coordinates, coord2: Coordinates): number => {
  const R = 6371000; // Earth's radius in meters
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters

  return distance;
};

/**
 * Convert degrees to radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Check if two coordinates are within proximity radius
 * @param coord1 First coordinate
 * @param coord2 Second coordinate
 * @returns True if within proximity radius
 */
export const isWithinProximity = (coord1: Coordinates, coord2: Coordinates): boolean => {
  const distance = calculateDistance(coord1, coord2);
  return distance <= PROXIMITY_RADIUS_METERS;
};

/**
 * Convert meters to feet
 */
export const metersToFeet = (meters: number): number => {
  return meters * 3.28084;
};

/**
 * Convert feet to meters
 */
export const feetToMeters = (feet: number): number => {
  return feet * 0.3048;
};
