// Centralized Socket.io service for real-time location updates
import { io, Socket } from 'socket.io-client';
import { Coordinates } from '../utils/location';

// Socket.io connection URL 
// Using your computer's IP address
// run ifconfig | grep "inet " | grep -v 127.0.0.1 to get your IP address
// API_BASE_URL = http://<ip_address>:3000
const SOCKET_URL = 'http://192.168.6.219:3000'; // Update this with your backend URL

let socket: Socket | null = null;

export interface LocationUpdate {
  userId: number;
  username: string;
  latitude: number;
  longitude: number;
  avatar_data: any;
  is_active: boolean;
  headline: string | null;
}

/**
 * Initialize Socket.io connection
 * @param token JWT token for authentication
 */
export const initializeSocket = (token: string): void => {
  if (socket?.connected) {
    console.log('Socket already connected');
    return;
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket'],
    reconnection: false, // Disable auto-reconnect to prevent crashes
  });

  socket.on('connect', () => {
    console.log('Socket.io connected:', socket?.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('Socket.io disconnected. Reason:', reason);
    // Don't auto-reconnect if we intentionally disconnected
    if (reason === 'io client disconnect') {
      console.log('Client intentionally disconnected, not reconnecting');
    }
  });

  socket.on('connect_error', (error) => {
    console.error('Socket.io connection error:', error);
  });
};

/**
 * Disconnect Socket.io connection
 */
export const disconnectSocket = (): void => {
  if (socket?.connected) {
    socket.disconnect();
    socket = null;
    console.log('Socket.io disconnected');
  }
};

/**
 * Emit location update to server
 * @param userId User's ID
 * @param location User's current location
 */
export const emitLocationUpdate = (userId: number, location: Coordinates): void => {
  if (!socket?.connected) {
    console.log('Socket not connected, cannot emit location');
    return;
  }

  socket.emit('location:update', {
    user_id: userId,
    latitude: location.latitude,
    longitude: location.longitude,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Subscribe to nearby users' location updates
 * @param callback Function to call when location updates received
 */
export const subscribeToLocationUpdates = (
  callback: (users: LocationUpdate[]) => void
): void => {
  if (!socket) {
    console.log('Socket not initialized');
    return;
  }

  socket.on('location:nearby-users', (users: LocationUpdate[]) => {
    callback(users);
  });
};

/**
 * Unsubscribe from location updates
 */
export const unsubscribeFromLocationUpdates = (): void => {
  if (!socket) return;
  socket.off('location:nearby-users');
};

/**
 * Join location tracking (when activity is enabled)
 * @param userId User's ID
 */
export const joinLocationTracking = (userId: number): void => {
  if (!socket?.connected) {
    console.log('Socket not connected, cannot join location tracking');
    return;
  }

  socket.emit('location:join', { user_id: userId });
  console.log('Joined location tracking');
};

/**
 * Leave location tracking (when activity is disabled)
 * @param userId User's ID
 */
export const leaveLocationTracking = (userId: number): void => {
  if (!socket?.connected) {
    console.log('Socket not connected, cannot leave location tracking');
    return;
  }

  socket.emit('location:leave', { user_id: userId });
  console.log('Left location tracking');
};

/**
 * Get socket connection status
 */
export const isSocketConnected = (): boolean => {
  return socket?.connected || false;
};
