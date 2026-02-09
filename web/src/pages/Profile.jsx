import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getProfile, updateProfile } from '../services/authService';

const Profile = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    course: '',
    year: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data);
      setFormData({
        fullName: data.fullName || '',
        studentId: data.studentId || '',
        course: data.course || '',
        year: data.year || 1,
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await updateProfile(formData);
      setSuccess('Profile updated successfully!');
      setProfile(result.user);
      setEditing(false);
      
      // Update localStorage with new user data
      const storedUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({
        ...storedUser,
        ...formData,
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: profile.fullName || '',
      studentId: profile.studentId || '',
      course: profile.course || '',
      year: profile.year || 1,
    });
    setEditing(false);
    setError('');
    setSuccess('');
  };

  if (loading && !profile) {
    return (
      <div style={styles.container}>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <h1>My Profile</h1>
          {!editing && (
            <button 
              onClick={() => setEditing(true)}
              style={styles.editButton}
            >
              Edit Profile
            </button>
          )}
        </div>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        {!editing ? (
          // View Mode
          <div style={styles.infoSection}>
            <div style={styles.infoGroup}>
              <label style={styles.label}>Full Name</label>
              <p style={styles.value}>{profile?.fullName}</p>
            </div>

            <div style={styles.infoGroup}>
              <label style={styles.label}>Email</label>
              <p style={styles.value}>{profile?.email}</p>
            </div>

            <div style={styles.infoGroup}>
              <label style={styles.label}>Student ID</label>
              <p style={styles.value}>{profile?.studentId || 'Not set'}</p>
            </div>

            <div style={styles.infoGroup}>
              <label style={styles.label}>Course</label>
              <p style={styles.value}>{profile?.course || 'Not set'}</p>
            </div>

            <div style={styles.infoGroup}>
              <label style={styles.label}>Year</label>
              <p style={styles.value}>{profile?.year ? `${profile.year}${getOrdinalSuffix(profile.year)} Year` : 'Not set'}</p>
            </div>

            <div style={styles.infoGroup}>
              <label style={styles.label}>Member Since</label>
              <p style={styles.value}>{new Date(profile?.createdAt).toLocaleDateString()}</p>
            </div>

            <div style={styles.infoGroup}>
              <label style={styles.label}>Last Updated</label>
              <p style={styles.value}>{new Date(profile?.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email (cannot be changed)</label>
              <input
                type="email"
                value={profile?.email}
                disabled
                style={{...styles.input, backgroundColor: '#f5f5f5'}}
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

            <div style={styles.buttonGroup}>
              <button 
                type="submit" 
                style={styles.saveButton}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button 
                type="button"
                onClick={handleCancel}
                style={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  profileCard: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #ecf0f1',
  },
  editButton: {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#efe',
    color: '#2c3',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontWeight: 'bold',
    color: '#7f8c8d',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '1.1rem',
    color: '#2c3e50',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default Profile;