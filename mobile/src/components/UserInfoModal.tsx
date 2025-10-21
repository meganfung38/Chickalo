import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { styles, SPACING, TYPOGRAPHY, COLORS } from '../styles';
import { UserInfoModalProps } from '../types';
import DiceBearAvatar from './DiceBearAvatar';

const UserInfoModal: React.FC<UserInfoModalProps> = ({ visible, user, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <View style={styles.userInfoModalContainer}>
            <TouchableOpacity 
              style={localStyles.closeButton} 
              onPress={onClose}
            >
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>

            <View style={styles.userInfoAvatarContainer}>
              <DiceBearAvatar settings={user.avatar_data} size={100} />
            </View>

            <Text style={styles.userInfoUsername}>{user.username}</Text>

            {user.headline && user.headline.trim() !== '' && (
              <Text style={styles.userInfoHeadline}>"{user.headline}"</Text>
            )}

            {user.pronouns && user.pronouns.trim() !== '' && (
              <Text style={styles.userInfoPronouns}>{user.pronouns}</Text>
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const localStyles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: SPACING.SM,
    right: SPACING.SM,
    padding: SPACING.SM,
    zIndex: 1,
  },
});

export default UserInfoModal;

