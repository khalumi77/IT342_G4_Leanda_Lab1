import axios from 'axios';

const API_URL = "http://localhost:8080/api/auth/";

export const register = (userData) => {
    return axios.post(API_URL + "register", userData);
};

export const login = (credentials) => {
    return axios.post(API_URL + "login", credentials)
        .then(response => {
            if (response.data.token) {
                // Store JWT in localStorage as per your Sequence Diagram flow
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};