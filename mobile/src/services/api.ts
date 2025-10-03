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

  updateHeadline: async (headline: string) => {
    const response = await api.put('/api/auth/update-headline', {
      headline,
    });
    return response.data;
  },

  updateAvatar: async (avatarData: any) => {
    const response = await api.put('/api/auth/update-avatar', {
      avatar_data: avatarData,
    });
    return response.data;
  },

  updatePronouns: async (pronouns: string) => {
    const response = await api.put('/api/auth/update-pronouns', {
      pronouns,
    });
    return response.data;
  },
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
