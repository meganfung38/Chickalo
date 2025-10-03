import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Using your computer's IP address
// run ifconfig | grep "inet " | grep -v 127.0.0.1 to get your IP address
// API_BASE_URL = http://<ip_address>:3000
const API_BASE_URL = 'http://192.168.4.38:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Generic API update function to reduce duplication
const updateUserField = async (endpoint: string, data: any) => {
  const response = await api.put(endpoint, data);
  return response.data;
};

export const authAPI = {
  register: async (email: string, password: string, headline?: string) => {
    const response = await api.post('/api/auth/register', {
      email,
      password,
      headline: headline || '',
    });
    return response.data;
  },

  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/auth/profile');
    return response.data;
  },

  // Simplified update functions using generic helper
  updateHeadline: async (headline: string) => 
    updateUserField('/api/auth/update-headline', { headline }),

  updateAvatar: async (avatarData: any) => 
    updateUserField('/api/auth/update-avatar', { avatar_data: avatarData }),

  updatePronouns: async (pronouns: string) => 
    updateUserField('/api/auth/update-pronouns', { pronouns }),

  updateActivity: async (isActive: boolean) => 
    updateUserField('/api/auth/update-activity', { is_active: isActive }),
};

export const storageAPI = {
  setToken: async (token: string) => {
    await AsyncStorage.setItem('token', token);
  },
  
  getToken: async () => {
    return await AsyncStorage.getItem('token');
  },
  
  removeToken: async () => {
    await AsyncStorage.removeItem('token');
  },
};

export default api;