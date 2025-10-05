// Grayscale avatar component for inactive users
import React from 'react';
import { View } from 'react-native';
import DiceBearAvatar from './DiceBearAvatar';
import { AvatarSettings } from '../types';

interface GrayscaleAvatarProps {
  settings: AvatarSettings;
  size: number;
}

/**
 * Render avatar in grayscale for inactive state
 * Simple black & white filter applied to the full avatar
 */
const GrayscaleAvatar: React.FC<GrayscaleAvatarProps> = ({ settings, size }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        opacity: 0.4,
      }}
    >
      <DiceBearAvatar settings={settings} size={size} />
    </View>
  );
};

export default GrayscaleAvatar;
