import React from 'react';
import { View, Text } from 'react-native';
// WebView will be added when react-native-webview is installed
// import { WebView } from 'react-native-webview';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { styles } from '../styles';
import { MapScreenProps } from '../types';

const MapScreen: React.FC<MapScreenProps> = ({ 
  user, 
  isActive, 
  onToggleActivity, 
  onNavigateToSettings 
}) => {
  const onNavigateToMap = () => {
    // Already on map screen, do nothing
  };

  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
        .map-container { 
          width: 100%; 
          height: 400px; 
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #90caf9;
        }
        .placeholder { 
          text-align: center; 
          color: #1976d2;
          font-size: 18px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="map-container">
        <div class="placeholder">
          🗺️<br>
          Interactive Map<br>
          <small>Coming Soon</small>
        </div>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={styles.mapContainer}>
      {/* Header */}
      <Header username={user.username} isActive={isActive} />
      
      {/* Main Content - Map View */}
      <View style={styles.mapContent}>
        {/* Placeholder for WebView - will be enabled when react-native-webview is installed */}
        <View style={styles.webView}>
          <View style={styles.centered}>
            <Text style={styles.bodyText}>🗺️ Interactive Map Coming Soon</Text>
          </View>
        </View>
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