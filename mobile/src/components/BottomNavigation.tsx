import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import DiceBearAvatar from './DiceBearAvatar';

interface BottomNavigationProps {
  currentScreen: 'map' | 'settings';
  isActive: boolean;
  onToggleActivity: () => void;
  onNavigateToMap: () => void;
  onNavigateToSettings: () => void;
  userAvatarData: any;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  isActive,
  onToggleActivity,
  onNavigateToMap,
  onNavigateToSettings,
  userAvatarData
}) => {
  return (
    <View style={styles.container}>
      {/* Map Button with Logo */}
      <TouchableOpacity
        style={[styles.navButton, currentScreen === 'map' && styles.activeButton]}
        onPress={onNavigateToMap}
      >
        <Image 
          source={require('../../assets/Chickalo_LOGO.png')} 
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={[styles.navLabel, currentScreen === 'map' && styles.activeLabel]}>Map</Text>
      </TouchableOpacity>

      {/* Activity Toggle */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={onToggleActivity}
      >
        <Text style={[styles.toggleIcon, isActive && styles.toggleIconActive]}>
          {isActive ? '●' : '○'}
        </Text>
        <Text style={[styles.toggleLabel, isActive && styles.toggleLabelActive]}>
          {isActive ? 'Visible' : 'Hidden'}
        </Text>
      </TouchableOpacity>

      {/* Settings Button (User Avatar) */}
      <TouchableOpacity
        style={[styles.navButton, currentScreen === 'settings' && styles.activeButton]}
        onPress={onNavigateToSettings}
      >
        <View style={styles.avatarContainer}>
          <DiceBearAvatar settings={userAvatarData} size={52} />
        </View>
        <Text style={[styles.navLabel, currentScreen === 'settings' && styles.activeLabel]}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'transparent', // Invisible background
    paddingVertical: 0, // No extra vertical space
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40, // Float above bottom edge
    left: 0,
    right: 0,
  },
  navButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
  },
  activeButton: {
    // No background styling - just icons
  },
  logoIcon: {
    width: 56,
    height: 56,
    marginBottom: 10,
  },
  navIcon: {
    fontSize: 36,
    marginBottom: 6,
  },
  activeIcon: {
    color: '#007AFF',
  },
  navLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  toggleButton: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 100,
  },
  toggleButtonActive: {
    // No background styling - just icons
  },
  toggleIcon: {
    fontSize: 56,
    marginBottom: 10,
    color: '#999',
  },
  toggleIconActive: {
    color: '#457a00', // Theme color for active state
  },
  toggleLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  toggleLabelActive: {
    color: '#457a00', // Theme color for active state
    fontWeight: '600',
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
});

export default BottomNavigation;
