import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div style={styles.container}>
            <div style={styles.hero}>
                <h1 style={styles.title}>Welcome to StudentPortal Lite</h1>
                <p style={styles.subtitle}>
                    Your simplified student management system
                </p>

                <div style={styles.features}>
                    <div style={styles.feature}>
                        <h3>📚 Easy to Use</h3>
                        <p>Simple and intuitive interface for students</p>
                    </div>
                    <div style={styles.feature}>
                        <h3>🔒 Secure</h3>
                        <p>Your data is protected with JWT authentication</p>
                    </div>
                    <div style={styles.feature}>
                        <h3>📱 Responsive</h3>
                        <p>Access from any device, anywhere</p>
                    </div>
                </div>

                <div style={styles.cta}>
                    {isAuthenticated() ? (
                        <Link to="/dashboard" style={styles.ctaButton}>
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" style={styles.ctaButton}>
                                Get Started
                            </Link>
                            <Link to="/login" style={styles.ctaButtonSecondary}>
                                Login
                            </Link>
                        </>
                    )}
                </div>
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
    },
    hero: {
        textAlign: 'center',
        maxWidth: '1000px',
    },
    title: {
        fontSize: '3rem',
        color: '#2c3e50',
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.5rem',
        color: '#7f8c8d',
        marginBottom: '3rem',
    },
    features: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
    },
    feature: {
        padding: '2rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cta: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
    },
    ctaButton: {
        backgroundColor: '#3498db',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    ctaButtonSecondary: {
        backgroundColor: '#95a5a6',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '4px',
        textDecoration: 'none',
        fontSize: '1.1rem',
        fontWeight: 'bold',
    },
};

export default Home;