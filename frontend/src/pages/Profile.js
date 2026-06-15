import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Alert, Paper, Tabs, Tab, Avatar } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [tabValue, setTabValue] = useState(0);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setProfileError('');
    setPasswordError('');
    setProfileSuccess('');
    setPasswordSuccess('');
  };

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    setProfileError('');
    setProfileSuccess('');
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
    setPasswordError('');
    setPasswordSuccess('');
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setLoading(true);

    const result = await updateProfile(profileData);
    
    if (result.success) {
      setProfileSuccess('Profile updated successfully!');
    } else {
      setProfileError(result.error);
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    setLoading(true);

    const result = await changePassword(passwordData);
    
    if (result.success) {
      setPasswordSuccess('Password changed successfully!');
      setPasswordData({ oldPassword: '', newPassword: '' });
    } else {
      setPasswordError(result.error);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#00FF7F', fontWeight: 'bold', textAlign: 'center' }}>
            Account Settings
          </Typography>

          {/* Profile Picture Display */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={profileData.avatar || user?.avatar}
              sx={{ width: 120, height: 120, mb: 2, bgcolor: '#00FF7F' }}
              alt={profileData.username || user?.username}
            >
              {!profileData.avatar && !user?.avatar && (profileData.username || user?.username)?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="body2" color="textSecondary">
              {profileData.avatar || user?.avatar ? 'Current profile picture' : 'No profile picture set'}
            </Typography>
          </Box>

          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Profile" />
            <Tab label="Security" />
          </Tabs>

          {tabValue === 0 && (
            <form onSubmit={handleProfileSubmit}>
              {profileError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {profileError}
                </Alert>
              )}
              {profileSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {profileSuccess}
                </Alert>
              )}
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={profileData.username}
                onChange={handleProfileChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                value={user?.email || ''}
                margin="normal"
                disabled
                helperText="Email cannot be changed"
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Avatar URL"
                name="avatar"
                value={profileData.avatar}
                onChange={handleProfileChange}
                margin="normal"
                helperText="Enter a URL for your profile picture"
              />
              {profileData.avatar && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  Preview: Your profile picture will update after saving
                </Alert>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  backgroundColor: '#00FF7F',
                  color: '#1A1A1A',
                  '&:hover': {
                    backgroundColor: '#00CC66',
                  },
                  '&:disabled': {
                    backgroundColor: '#CCCCCC',
                  },
                }}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </form>
          )}

          {tabValue === 1 && (
            <form onSubmit={handlePasswordSubmit}>
              {passwordError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {passwordError}
                </Alert>
              )}
              {passwordSuccess && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {passwordSuccess}
                </Alert>
              )}
              <TextField
                fullWidth
                label="Current Password"
                name="oldPassword"
                type="password"
                value={passwordData.oldPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                margin="normal"
                required
                helperText="Password must be at least 6 characters"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  backgroundColor: '#00FF7F',
                  color: '#1A1A1A',
                  '&:hover': {
                    backgroundColor: '#00CC66',
                  },
                  '&:disabled': {
                    backgroundColor: '#CCCCCC',
                  },
                }}
              >
                {loading ? 'Changing...' : 'Change Password'}
              </Button>
            </form>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
