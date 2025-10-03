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

interface MapScreenProps {
  user: any;
  onLogout: () => void;
  onNavigateToSettings: () => void;
}

const MapScreen: React.FC<MapScreenProps> = ({ user, onLogout, onNavigateToSettings }) => {
  const [isActive, setIsActive] = useState(user.is_active || false);

  const handleToggleActivity = (value: boolean) => {
    setIsActive(value);
    // TODO: Send activity status to backend
    Alert.alert(
      'Activity Status',
      value ? 'You are now visible on the map' : 'You are now hidden from the map'
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
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={onNavigateToSettings} style={styles.settingsButton}>
            <Text style={styles.settingsText}>⚙️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
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
        
        <View style={styles.activityContainer}>
          <Text style={styles.activityLabel}>Activity Status</Text>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              {isActive ? 'Visible on map' : 'Hidden from map'}
            </Text>
            <Switch
              value={isActive}
              onValueChange={handleToggleActivity}
              trackColor={{ false: '#FF3B30', true: '#34C759' }}
              thumbColor={isActive ? '#ffffff' : '#ffffff'}
              ios_backgroundColor="#FF3B30"
            />
          </View>
        </View>
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    padding: 10,
    marginRight: 10,
  },
  settingsText: {
    fontSize: 20,
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
  activityContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activityLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
});

export default MapScreen;
