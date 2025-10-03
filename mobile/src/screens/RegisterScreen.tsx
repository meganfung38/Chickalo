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
import { authAPI, storageAPI } from '../services/api';
import { styles } from '../styles';
import { RegisterScreenProps } from '../types';
import { validateRegistrationForm } from '../utils/validation';

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onRegister, onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(false);

  // Use centralized validation - no duplication
  const { isValid: isFormValid, error: validationError } = validateRegistrationForm(email, password, confirmPassword);

  const handleRegister = async () => {
    // This should never be called if button is properly disabled, but adding safeguard
    if (!isFormValid) {
      Alert.alert('Error', validationError || 'Please complete all required fields correctly');
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.register(email.trim(), password, headline.trim());
      await storageAPI.setToken(response.token);
      onRegister(response.token, response.user);
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.error || 'An error occurred during registration');
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
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the community</Text>
        
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
          
          <TextInput
            style={styles.input}
            placeholder="Password (min 6 characters)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Headline (optional - tell us about yourself)"
            value={headline}
            onChangeText={setHeadline}
            multiline
            autoCapitalize="sentences"
            autoCorrect={true}
          />
          
          <TouchableOpacity
            style={[styles.button, !isFormValid && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={!isFormValid || loading}
          >
            <Text style={[styles.buttonText, !isFormValid && styles.buttonTextDisabled]}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={onNavigateToLogin}>
          <Text style={styles.linkText}>
            Already have an account? Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;