// Custom avatar marker component for map display
import React from 'react';
import { View } from 'react-native';
import DiceBearAvatar from './DiceBearAvatar';
import GrayscaleAvatar from './GrayscaleAvatar';
import { AvatarSettings } from '../types';
import { styles } from '../styles';

interface AvatarMarkerProps {
  avatarSettings: AvatarSettings;
  isActive: boolean;
  isCurrentUser?: boolean;
  size?: number;
}

/**
 * Avatar marker for map display
 * - Active users: Colored avatar with green border
 * - Inactive users: Grayscale avatar (only visible to owner)
 * - Current user: Orange border to distinguish from others
 */
const AvatarMarker: React.FC<AvatarMarkerProps> = ({
  avatarSettings,
  isActive,
  isCurrentUser = false,
  size = 45,
}) => {
  return (
    <View
      style={[
        styles.avatarMarkerContainer,
        {
          width: size + 8,
          height: size + 8,
          borderRadius: (size + 8) / 2,
        },
        isCurrentUser
          ? styles.currentUserMarkerBorder
          : isActive
          ? styles.activeMarkerBorder
          : styles.inactiveMarkerBorder,
      ]}
    >
      {isActive ? (
        <DiceBearAvatar settings={avatarSettings} size={size} />
      ) : (
        <GrayscaleAvatar settings={avatarSettings} size={size} />
      )}
    </View>
  );
};

export default React.memo(AvatarMarker);
