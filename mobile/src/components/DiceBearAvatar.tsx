import React, { useMemo } from 'react';
import { View, Text } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { createAvatar } from '@dicebear/core';
import { bigSmile } from '@dicebear/collection';
import { styles } from '../styles';
import { DiceBearAvatarProps } from '../types';

const DiceBearAvatar: React.FC<DiceBearAvatarProps> = ({ settings, size = 50 }) => {
  const avatarSvg = useMemo(() => {
    try {
      if (!settings) {
        return null;
      }

      // Create safe settings object, only including defined values
      const safeSettings: any = {};
      
      if (settings.seed) safeSettings.seed = settings.seed;
      if (settings.backgroundColor?.length) safeSettings.backgroundColor = settings.backgroundColor;
      if (settings.skinColor?.length) safeSettings.skinColor = settings.skinColor;
      if (settings.hair?.length) safeSettings.hair = settings.hair;
      if (settings.hairColor?.length) safeSettings.hairColor = settings.hairColor;
      if (settings.eyes?.length) safeSettings.eyes = settings.eyes;
      if (settings.mouth?.length) safeSettings.mouth = settings.mouth;
      
      // Handle accessories with 'none' option
      if (settings.accessories?.length) {
        if (settings.accessories[0] === 'none') {
          safeSettings.accessoriesProbability = 0;
        } else {
          safeSettings.accessories = settings.accessories;
          safeSettings.accessoriesProbability = settings.accessoriesChance || 100;
        }
      }

      const avatar = createAvatar(bigSmile, safeSettings);
      return avatar.toString();
    } catch (error) {
      console.log('Avatar generation error:', error);
      return null;
    }
  }, [settings, size]);

  if (!avatarSvg) {
    return (
      <View style={[styles.avatarError, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={styles.avatarErrorText}>?</Text>
      </View>
    );
  }

  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden' }}>
      <SvgXml 
        xml={avatarSvg} 
        width={size} 
        height={size}
      />
    </View>
  );
};

export default DiceBearAvatar;