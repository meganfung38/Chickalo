// Custom avatar marker component for map display
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DiceBearAvatar from './DiceBearAvatar';
import GrayscaleAvatar from './GrayscaleAvatar';
import { AvatarMarkerProps } from '../types';
import { styles, COLORS } from '../styles';

/**
 * Avatar marker for map display with speech bubble headline
 * - Active users: Colored avatar with green border + headline speech bubble
 * - Inactive users: Grayscale avatar with orange border (current user only visible when inactive)
 * - Border colors: Green = active, Orange = inactive
 * - Speech bubble: Matches avatar background color, only shown when active
 * - Tappable: onPress handler for user interaction
 */
const AvatarMarker: React.FC<AvatarMarkerProps> = ({
  settings,
  isActive,
  isCurrentUser = false,
  headline,
  onPress,
}) => {
  const size = 45;
  // Extract background color from avatar settings for speech bubble
  const backgroundColor = settings.backgroundColor 
    ? `#${settings.backgroundColor[0]}` 
    : COLORS.AVATAR_BG_DEFAULT;
  
  // Create darker shade for border (darken by ~30%)
  const darkerColor = settings.backgroundColor
    ? `#${Math.floor(parseInt(settings.backgroundColor[0].slice(0, 2), 16) * 0.7).toString(16).padStart(2, '0')}${Math.floor(parseInt(settings.backgroundColor[0].slice(2, 4), 16) * 0.7).toString(16).padStart(2, '0')}${Math.floor(parseInt(settings.backgroundColor[0].slice(4, 6), 16) * 0.7).toString(16).padStart(2, '0')}`
    : COLORS.AVATAR_BG_DARK;

  // Determine border style based on activity status
  // Green when active (#457a00), Orange when inactive (#cc4e00)
  const getBorderStyle = () => {
    return isActive ? styles.activeMarkerBorder : styles.currentUserMarkerBorder;
  };

  // SIMPLE: Show headline when active, don't show when inactive
  const showHeadline = isActive && headline;

  // Wrapper component based on whether it's tappable
  const Wrapper = onPress ? TouchableOpacity : View;
  const wrapperProps = onPress ? { onPress, activeOpacity: 0.7 } : {};

  return (
    <Wrapper style={{ alignItems: 'center' }} {...wrapperProps}>
      {/* Speech Bubble with triangle tail */}
      {showHeadline && (
        <View style={{ marginBottom: 5, alignItems: 'center' }}>
          {/* Bubble */}
          <Text style={{ 
            backgroundColor: backgroundColor,
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: darkerColor,
            fontSize: 12,
            fontWeight: 'bold',
            color: COLORS.BLACK,
          }}>
            {headline}
          </Text>
          {/* Triangle tail pointing down */}
          <View style={{
            width: 0,
            height: 0,
            marginTop: -1,
            borderLeftWidth: 6,
            borderRightWidth: 6,
            borderTopWidth: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: backgroundColor,
          }} />
        </View>
      )}

      {/* Avatar */}
      <View
        style={[
          styles.avatarMarkerContainer,
          {
            width: size + 8,
            height: size + 8,
            borderRadius: (size + 8) / 2,
          },
          getBorderStyle(),
        ]}
      >
        {isActive ? (
          <DiceBearAvatar settings={settings} size={size} />
        ) : (
          <GrayscaleAvatar settings={settings} size={size} />
        )}
      </View>
    </Wrapper>
  );
};

// Don't use React.memo - we need this to re-render on every prop change
// The memo was preventing headline from reappearing after activity toggle
export default AvatarMarker;
