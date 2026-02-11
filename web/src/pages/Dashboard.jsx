import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDashboard } from '../services/authService';

const Dashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const data = await getDashboard();
            setDashboardData(data);
        } catch (err) {
            setError('Failed to load dashboard data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={styles.container}>
                <h2>Loading dashboard...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.container}>
                <div style={styles.error}>{error}</div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Welcome, {user?.fullName}! 👋</h1>
                <p style={styles.subtitle}>Welcome to your dashboard</p>
            </div>
        </div>
    );
};

// Helper function for ordinal suffix
const getOrdinalSuffix = (num) => {
    const j = num % 10;
    const k = num % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
};

const styles = {
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
    },
    header: {
        marginBottom: '2rem',
    },
    subtitle: {
        color: '#7f8c8d',
        fontSize: '1.1rem',
    },
    error: {
        backgroundColor: '#fee',
        color: '#c33',
        padding: '1rem',
        borderRadius: '4px',
        textAlign: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    cardTitle: {
        marginBottom: '1rem',
        color: '#2c3e50',
        fontSize: '1.2rem',
    },
    infoGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    infoItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 0',
        borderBottom: '1px solid #ecf0f1',
    },
    infoLabel: {
        fontWeight: 'bold',
        color: '#7f8c8d',
    },
    infoValue: {
        color: '#2c3e50',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
        gap: '1rem',
    },
    statCard: {
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '4px',
    },
    statNumber: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#3498db',
    },
    statLabel: {
        fontSize: '0.9rem',
        color: '#7f8c8d',
        marginTop: '0.5rem',
    },
    actionButtons: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.75rem',
    },
    actionButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '0.75rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9rem',
    },
    activityList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    activityItem: {
        padding: '0.5rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '4px',
        margin: 0,
    },
};

export default Dashboard;