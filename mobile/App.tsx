import React, { useState, useEffect } from 'react';
import { View, Alert, Text } from 'react-native';
import { useFonts, LeagueSpartan_400Regular, LeagueSpartan_700Bold } from '@expo-google-fonts/league-spartan';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MapScreen from './src/screens/MapScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { authAPI, storageAPI } from './src/services/api';
import { styles } from './src/styles';
import { User, Screen } from './src/types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  // Load League Spartan font
  const [fontsLoaded] = useFonts({
    LeagueSpartan_400Regular,
    LeagueSpartan_700Bold,
  });

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const savedToken = await storageAPI.getToken();
      if (savedToken) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.user);
          setIsActive(response.user.is_active || false);
          setToken(savedToken);
          setCurrentScreen('map');
        } catch (error) {
          // Token is invalid, clear it
          await storageAPI.removeToken();
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (newToken: string, userData: User) => {
    await storageAPI.setToken(newToken);
    setToken(newToken);
    setUser(userData);
    setIsActive(userData.is_active || false);
    setCurrentScreen('map');
  };

  const handleRegister = async (newToken: string, userData: User) => {
    await storageAPI.setToken(newToken);
    setToken(newToken);
    setUser(userData);
    setIsActive(userData.is_active || false);
    setCurrentScreen('map');
  };

  const handleLogout = async () => {
    await storageAPI.removeToken();
    setToken(null);
    setUser(null);
    setCurrentScreen('login');
  };

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    // Keep isActive state in sync with user.is_active
    if (updatedUser.is_active !== isActive) {
      setIsActive(updatedUser.is_active);
    }
  };

  const handleToggleActivity = async () => {
    const newStatus = !isActive;
    
    try {
      // Send activity status to backend
      const response = await authAPI.updateActivity(newStatus);
      
      // Update local state only if backend update succeeds
      setIsActive(newStatus);
      
      // Update user object
      if (user) {
        const updatedUser = { ...user, is_active: newStatus };
        setUser(updatedUser);
      }
      
      // Don't show alert - it can cause app to background and disconnect socket
      console.log(`Activity status changed to: ${newStatus ? 'active' : 'inactive'}`);
    } catch (error) {
      console.error('Failed to update activity status:', error);
      // Only alert on error
      Alert.alert(
        'Error',
        'Failed to update activity status. Please try again.'
      );
    }
  };

  // Show loading screen while fonts load
  if (!fontsLoaded) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.bodyText}>Loading...</Text>
      </View>
    );
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onLogin={handleLogin}
            onNavigateToRegister={() => setCurrentScreen('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegister={handleRegister}
            onNavigateToLogin={() => setCurrentScreen('login')}
          />
        );
      case 'map':
        return user ? (
          <MapScreen
            user={user}
            isActive={isActive}
            onToggleActivity={handleToggleActivity}
            onNavigateToSettings={() => setCurrentScreen('settings')}
          />
        ) : null;
      case 'settings':
        return user ? (
          <SettingsScreen
            user={user}
            isActive={isActive}
            onToggleActivity={handleToggleActivity}
            onBack={() => setCurrentScreen('map')}
            onLogout={handleLogout}
            onUserUpdate={handleUserUpdate}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

// Styles now imported from unified system

export default App;
