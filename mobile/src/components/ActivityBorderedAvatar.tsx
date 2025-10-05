import React from 'react';
import { View } from 'react-native';
import DiceBearAvatar from './DiceBearAvatar';
import { AvatarSettings } from '../types';
import { COLORS } from '../styles';

interface ActivityBorderedAvatarProps {
  settings: AvatarSettings;
  size: number;
  isActive: boolean;
  seed?: string; // Optional key for forcing re-render
}

/**
 * Avatar with activity-synced border
 * Green border when active, orange when inactive
 * Used consistently across map, settings, and navigation
 */
const ActivityBorderedAvatar: React.FC<ActivityBorderedAvatarProps> = ({
  settings,
  size,
  isActive,
  seed,
}) => {
  const borderColor = isActive ? COLORS.SECONDARY : COLORS.PRIMARY; // Green : Orange

  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: 3,
        borderColor: borderColor,
        borderRadius: size / 2,
        overflow: 'hidden',
      }}
    >
      <DiceBearAvatar 
        key={seed}
        settings={settings} 
        size={size} 
      />
    </View>
  );
};

export default ActivityBorderedAvatar;
