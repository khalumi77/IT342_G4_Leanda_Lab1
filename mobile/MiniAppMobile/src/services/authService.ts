import api from './api';
import { RegisterData, LoginResponse, User } from '../types';

// Login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Register
export const register = async (userData: RegisterData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Logout
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Get user profile
export const getProfile = async (): Promise<User> => {
  const response = await api.get('/user/profile');
  return response.data;
};

// Get dashboard data
export const getDashboard = async () => {
  const response = await api.get('/user/dashboard');
  return response.data;
};

// Update profile
export const updateProfile = async (updates: Partial<User>) => {
  const response = await api.put('/user/profile', updates);
  return response.data;
};
