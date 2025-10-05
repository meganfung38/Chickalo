import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../styles';
import { BottomNavigationProps } from '../types';
import ActivityBorderedAvatar from './ActivityBorderedAvatar';

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  currentScreen,
  isActive,
  onToggleActivity,
  onNavigateToMap,
  onNavigateToSettings,
  userAvatarData
}) => {
  return (
    <View style={styles.navigationContainer}>
      {/* Map Button with Logo */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={onNavigateToMap}
      >
        <Image 
          source={require('../../assets/Chickalo_LOGO.png')} 
          style={styles.logoIcon}
          resizeMode="contain"
        />
        <Text style={[styles.navLabel, currentScreen === 'map' && styles.navLabelActive]}>
          Map
        </Text>
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
        style={styles.navButton}
        onPress={onNavigateToSettings}
        activeOpacity={0.7}
      >
        <View pointerEvents="none">
          <ActivityBorderedAvatar 
            settings={userAvatarData} 
            size={52}
            isActive={isActive}
          />
        </View>
        <Text style={[styles.navLabel, currentScreen === 'settings' && styles.navLabelActive]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomNavigation;