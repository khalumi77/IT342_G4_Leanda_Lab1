import api from './api';

export interface LoginResponse {
  token: string;
  email: string;
  fullName: string;
}

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  password: string;
}

// Login
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', {email, password});
  return response.data;
};

// Register
export const register = async (userData: RegisterData): Promise<any> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

// Logout
export const logout = async (): Promise<void> => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Get user profile
export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/user/profile');
  return response.data;
};

// Get dashboard data
export const getDashboard = async (): Promise<any> => {
  const response = await api.get('/user/dashboard');
  return response.data;
};

// Update profile
export const updateProfile = async (updates: {
  fullName?: string;
}): Promise<any> => {
  const response = await api.put('/user/profile', updates);
  return response.data;
};
