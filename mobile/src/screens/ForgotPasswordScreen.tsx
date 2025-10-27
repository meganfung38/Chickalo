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
import { styles, SPACING } from '../styles';
import { ValidationUtils } from '../utils/validation';
import { ForgotPasswordScreenProps } from '../types';

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ onBack, onTokenSubmit }) => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  const isEmailValid = email.trim() !== '' && ValidationUtils.isValidEmail(email);
  const isTokenValid = token.trim().length > 0;

  const handleRequestReset = async () => {
    if (!isEmailValid) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.requestPasswordReset(email.trim());
      Alert.alert(
        'Check Your Email',
        'If an account exists with this email, a password reset code has been sent. Enter the code below to continue.',
        [
          {
            text: 'OK',
            onPress: () => setShowTokenInput(true),
          },
        ]
      );
    } catch (error: any) {
      Alert.alert('Error', ValidationUtils.getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleTokenSubmit = async () => {
    if (!isTokenValid) {
      Alert.alert('Error', 'Please enter the reset code from your email');
      return;
    }
    
    setLoading(true);
    try {
      // Verify token is valid before proceeding
      await authAPI.verifyResetToken(token.trim());
      
      // Token is valid, navigate to reset password screen
      if (onTokenSubmit) {
        onTokenSubmit(token.trim());
      }
    } catch (error: any) {
      Alert.alert(
        'Invalid Code',
        ValidationUtils.getErrorMessage(
          error,
          'The reset code you entered is invalid or has expired. Please request a new code.'
        )
      );
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
        <Text style={styles.title}>Forgot Password</Text>
        
        {!showTokenInput ? (
          <>
            <Text style={styles.subtitle}>
              Enter your email address and we'll send you a password reset code
            </Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={[styles.button, !isEmailValid && styles.buttonDisabled]}
                onPress={handleRequestReset}
                disabled={!isEmailValid || loading}
              >
                <Text style={[styles.buttonText, !isEmailValid && styles.buttonTextDisabled]}>
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Enter the reset code from your email
            </Text>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Reset Code"
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                style={[styles.button, (!isTokenValid || loading) && styles.buttonDisabled]}
                onPress={handleTokenSubmit}
                disabled={!isTokenValid || loading}
              >
                <Text style={[styles.buttonText, (!isTokenValid || loading) && styles.buttonTextDisabled]}>
                  {loading ? 'Verifying...' : 'Continue'}
                </Text>
              </TouchableOpacity>

              <View style={styles.spacedLinkContainer}>
                <TouchableOpacity onPress={() => setShowTokenInput(false)}>
                  <Text style={styles.linkText}>Send a new code</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity onPress={onBack}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

