import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { SvgXml } from 'react-native-svg';

interface AvatarSettings {
  seed: string;
  backgroundColor?: string[];
  // DiceBear Big Smile actual options
  accessoriesChance?: number;
  accessories?: string[];
  clothingChance?: number;
  clothing?: string[];
  clothingColor?: string[];
  eyesChance?: number;
  eyes?: string[];
  eyebrowsChance?: number;
  eyebrows?: string[];
  mouthChance?: number;
  mouth?: string[];
  hairChance?: number;
  hair?: string[];
  hairColor?: string[];
  skinColor?: string[];
}

interface DiceBearAvatarProps {
  settings: AvatarSettings;
  size?: number;
}

const DiceBearAvatar: React.FC<DiceBearAvatarProps> = ({ settings, size = 100 }) => {
  const avatarSvg = useMemo(() => {
    try {
      // Create a unique seed that changes when any setting changes
      const uniqueSeed = settings?.seed || 'default';
      
      // Use DiceBear Big Smile schema properties
      const safeSettings: any = {
        seed: uniqueSeed,
        size: size,
      };

      // Add all supported DiceBear Big Smile options
      if (settings?.backgroundColor && settings.backgroundColor.length > 0) {
        safeSettings.backgroundColor = settings.backgroundColor;
      }
      if (settings?.skinColor && settings.skinColor.length > 0) {
        safeSettings.skinColor = settings.skinColor;
      }
      if (settings?.hair && settings.hair.length > 0) {
        safeSettings.hair = settings.hair;
      }
      if (settings?.hairColor && settings.hairColor.length > 0) {
        safeSettings.hairColor = settings.hairColor;
      }
      if (settings?.eyes && settings.eyes.length > 0) {
        safeSettings.eyes = settings.eyes;
      }
      if (settings?.mouth && settings.mouth.length > 0) {
        safeSettings.mouth = settings.mouth;
      }
      if (settings?.accessories && settings.accessories.length > 0) {
        if (settings.accessories[0] === 'none') {
          safeSettings.accessoriesProbability = 0; // No accessories
        } else {
          safeSettings.accessories = settings.accessories;
          safeSettings.accessoriesProbability = 100; // Always show accessories when selected
        }
      }

      console.log('Generating avatar with settings:', safeSettings);
      console.log('Full settings received:', settings);

      const avatar = createAvatar(bigSmile, safeSettings);
      
      return avatar.toString();
    } catch (error) {
      console.error('Error generating avatar:', error);
      console.error('Settings that caused error:', settings);
      // Return a simple fallback SVG
      return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="#b6e3f4"/>
        <circle cx="35" cy="40" r="3" fill="#000"/>
        <circle cx="65" cy="40" r="3" fill="#000"/>
        <path d="M 30 60 Q 50 75 70 60" stroke="#000" stroke-width="2" fill="none"/>
      </svg>`;
    }
  }, [settings, size]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <SvgXml xml={avatarSvg} width={size} height={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
});

export default DiceBearAvatar;
