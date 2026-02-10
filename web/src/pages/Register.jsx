import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        studentId: '',
        course: '',
        year: 1,
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            // Convert year to a number — the backend User entity expects int, not string
            [name]: name === 'year' ? parseInt(value, 10) : value,
        });
    };

    const validatePassword = (password) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        if (!/[A-Z]/.test(password)) {
            return 'Password must contain at least 1 uppercase letter';
        }
        if (!/[a-z]/.test(password)) {
            return 'Password must contain at least 1 lowercase letter';
        }
        if (!/[0-9]/.test(password)) {
            return 'Password must contain at least 1 number';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setLoading(true);

        // Strip confirmPassword — backend doesn't have this field
        const { confirmPassword, ...userData } = formData;

        const result = await register(userData);

        if (result.success) {
            alert('Registration successful! Please login.');
            navigate('/login');
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={styles.title}>Register for StudentPortal Lite</h2>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Full Name *</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password *</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Enter password"
                        />
                        <div style={styles.passwordRequirements}>
                            <p style={styles.requirementLabel}>Password must contain:</p>
                            <div style={{...styles.requirement, color: formData.password.length >= 6 ? '#27ae60' : '#95a5a6'}}>
                                ✓ At least 6 characters
                            </div>
                            <div style={{...styles.requirement, color: /[A-Z]/.test(formData.password) ? '#27ae60' : '#95a5a6'}}>
                                ✓ At least 1 uppercase letter (A-Z)
                            </div>
                            <div style={{...styles.requirement, color: /[a-z]/.test(formData.password) ? '#27ae60' : '#95a5a6'}}>
                                ✓ At least 1 lowercase letter (a-z)
                            </div>
                            <div style={{...styles.requirement, color: /[0-9]/.test(formData.password) ? '#27ae60' : '#95a5a6'}}>
                                ✓ At least 1 number (0-9)
                            </div>
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Confirm Password *</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Confirm your password"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Student ID</label>
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your student ID (optional)"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Course</label>
                        <input
                            type="text"
                            name="course"
                            value={formData.course}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your course (optional)"
                        />
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Year</label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value={1}>1st Year</option>
                            <option value={2}>2nd Year</option>
                            <option value={3}>3rd Year</option>
                            <option value={4}>4th Year</option>
                            <option value={5}>5th Year</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        style={styles.button}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <p style={styles.footer}>
                    Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: '#f5f5f5',
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px',
    },
    title: {
        textAlign: 'center',
        color: '#2c3e50',
        marginBottom: '2rem',
    },
    error: {
        backgroundColor: '#fee',
        color: '#c33',
        padding: '0.75rem',
        borderRadius: '4px',
        marginBottom: '1rem',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '0.9rem',
    },
    input: {
        padding: '0.75rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    button: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '0.75rem',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '1rem',
    },
    footer: {
        textAlign: 'center',
        marginTop: '1.5rem',
        color: '#7f8c8d',
    },
    link: {
        color: '#3498db',
        textDecoration: 'none',
    },
    passwordRequirements: {
        backgroundColor: '#f8f9fa',
        padding: '0.75rem',
        borderRadius: '4px',
        marginTop: '0.5rem',
        fontSize: '0.85rem',
    },
    requirementLabel: {
        margin: '0 0 0.5rem 0',
        fontWeight: 'bold',
        color: '#2c3e50',
        fontSize: '0.85rem',
    },
    requirement: {
        margin: '0.25rem 0',
        fontSize: '0.8rem',
    },
};

export default Register;