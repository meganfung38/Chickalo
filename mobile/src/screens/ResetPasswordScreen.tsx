import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { authAPI } from '../services/api';
import { styles } from '../styles';
import { ValidationUtils } from '../utils/validation';
import { ResetPasswordScreenProps } from '../types';

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ token, onSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const isFormValid =
    password !== '' &&
    confirmPassword !== '' &&
    ValidationUtils.isValidPassword(password) &&
    ValidationUtils.doPasswordsMatch(password, confirmPassword);

  const handleResetPassword = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please enter matching passwords (at least 6 characters)');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.resetPassword(token, password);
      Alert.alert(
        'Success',
        response.message || 'Your password has been reset successfully. You can now log in with your new password.',
        [
          {
            text: 'OK',
            onPress: onSuccess,
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', ValidationUtils.getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.containerGray}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your new password</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleResetPassword}
            disabled={!isFormValid || loading}
          >
            <Text style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ResetPasswordScreen;

