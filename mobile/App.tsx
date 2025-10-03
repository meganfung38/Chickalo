import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MapScreen from './src/screens/MapScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { authAPI, storageAPI } from './src/services/api';

type Screen = 'login' | 'register' | 'map' | 'settings';

interface User {
  id: number;
  username: string;
  email: string;
  headline: string;
  avatar_data: any;
  pronouns: string | null;
  is_active: boolean;
  created_at: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const savedToken = await storageAPI.getToken();
      if (savedToken) {
        try {
          const response = await authAPI.getProfile();
          setUser(response.user);
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
    setCurrentScreen('map');
  };

  const handleRegister = async (newToken: string, userData: User) => {
    await storageAPI.setToken(newToken);
    setToken(newToken);
    setUser(userData);
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
  };

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
            onLogout={handleLogout}
            onNavigateToSettings={() => setCurrentScreen('settings')}
          />
        ) : null;
      case 'settings':
        return user ? (
          <SettingsScreen
            user={user}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
