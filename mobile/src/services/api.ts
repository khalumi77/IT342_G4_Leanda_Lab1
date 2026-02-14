import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// IMPORTANT: Replace this with your computer's local IP address
// Find it by running: ipconfig (Windows) or ifconfig (Mac/Linux)
// Example: http://192.168.1.100:8080/api
const API_BASE_URL = 'http://10.0.2.2:8080/api'; // 10.0.2.2 is Android emulator's localhost

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error reading token:', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor: handle 401 errors
api.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response?.status === 401 &&
      !error.config.url.includes('/auth/')
    ) {
      // Clear stored credentials
      await AsyncStorage.multiRemove(['token', 'user']);
    }
    return Promise.reject(error);
  },
);

export default api;
