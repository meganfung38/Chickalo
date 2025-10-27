// Centralized validation utilities to maintain DRY principle

export const ValidationUtils = {
  // Email validation
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  },

  // Password validation - do NOT trim passwords as spaces may be intentional
  isValidPassword: (password: string): boolean => {
    return !!password && password.length >= 6;
  },

  // Check if passwords match - both must exist and be identical
  doPasswordsMatch: (password: string, confirmPassword: string): boolean => {
    return !!password && !!confirmPassword && password === confirmPassword;
  },

  // Check if required fields are filled
  areRequiredFieldsFilled: (fields: string[]): boolean => {
    return fields.every(field => field.trim() !== '');
  },

  // Get validation error message
  getValidationError: (email: string, password: string, confirmPassword: string): string | null => {
    if (!ValidationUtils.areRequiredFieldsFilled([email, password, confirmPassword])) {
      return 'Please fill in email and password fields';
    }
    
    if (!ValidationUtils.isValidEmail(email)) {
      return 'Please enter a valid email address';
    }
    
    if (!ValidationUtils.isValidPassword(password)) {
      return 'Password must be at least 6 characters long';
    }
    
    if (!ValidationUtils.doPasswordsMatch(password, confirmPassword)) {
      return 'Passwords do not match';
    }
    
    return null; // No validation errors
  },

  // Extract error message from API response
  getErrorMessage: (error: any, fallback: string = 'An error occurred. Please try again.'): string => {
    return error?.response?.data?.error || fallback;
  },
};

// Form validation for registration
export const validateRegistrationForm = (
  email: string, 
  password: string, 
  confirmPassword: string
): { isValid: boolean; error: string | null } => {
  const error = ValidationUtils.getValidationError(email, password, confirmPassword);
  return {
    isValid: error === null,
    error
  };
};
