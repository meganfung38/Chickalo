import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { authAPI } from '../services/api';

interface MapScreenProps {
  user: any;
  onLogout: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ user, onLogout }) => {
  const [isActive, setIsActive] = useState(user.is_active || false);

  const handleToggleActivity = () => {
    setIsActive(!isActive);
    // TODO: Send location update to backend
    Alert.alert(
      'Activity Toggle',
      isActive ? 'You are now hidden from the map' : 'You are now visible on the map'
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chickalo Map</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome, {user.username}!
        </Text>
        
        <Text style={styles.headlineText}>
          "{user.headline || 'No headline set'}"
        </Text>
        
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>🗺️ Map will go here</Text>
          <Text style={styles.mapSubtext}>
            {isActive ? 'You are visible to others' : 'You are hidden from others'}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.toggleButton, isActive && styles.toggleButtonActive]} 
          onPress={handleToggleActivity}
        >
          <Text style={[styles.toggleButtonText, isActive && styles.toggleButtonTextActive]}>
            {isActive ? 'Go Invisible' : 'Go Active'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  headlineText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 30,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  mapText: {
    fontSize: 24,
    marginBottom: 10,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  toggleButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#34C759',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleButtonTextActive: {
    color: 'white',
  },
});

export default MapScreen;
