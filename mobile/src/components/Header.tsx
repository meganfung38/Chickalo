import React from 'react';
import { View, Text } from 'react-native';
import { styles, COLORS } from '../styles';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ username, isActive }) => {
  return (
    <View style={[
      styles.headerContainer, 
      { backgroundColor: isActive ? COLORS.SECONDARY : COLORS.PRIMARY }
    ]}>
      <Text style={styles.headerText}>Welcome {username}</Text>
    </View>
  );
};

export default Header;