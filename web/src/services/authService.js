import api from './api';

// Login
export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

// Register
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

// Logout
export const logout = async () => {
    try {
        await api.post('/auth/logout');
    } catch (error) {
        // Even if server logout fails, we still clear local storage
        console.error('Logout error:', error);
    }
};

// Get user profile
export const getProfile = async () => {
    const response = await api.get('/user/profile');
    return response.data;
};

// Get dashboard data
export const getDashboard = async () => {
    const response = await api.get('/user/dashboard');
    return response.data;
};

// Update profile
export const updateProfile = async (updates) => {
    const response = await api.put('/user/profile', updates);
    return response.data;
};