import React, { useState } from 'react';
import { register } from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '', email: '', password: '', studentId: '', course: '', year: 1
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Registration successful! Redirecting to login...");
            // Redirect logic here
        } catch (error) {
            alert("Registration failed: " + error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
            <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <input type="text" placeholder="Student ID" onChange={(e) => setFormData({...formData, studentId: e.target.value})} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;