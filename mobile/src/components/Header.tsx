import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  username: string;
  isActive: boolean;
}

const Header: React.FC<HeaderProps> = ({ username, isActive }) => {
  return (
    <View style={[
      styles.container, 
      { backgroundColor: isActive ? '#457a00' : '#cc4e00' } // Green when active, orange when inactive
    ]}>
      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome {username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 65, // More space to avoid iPhone selfie camera/notch
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#457a00', // Secondary theme color
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    color: 'white', // White text on theme background
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default Header;
