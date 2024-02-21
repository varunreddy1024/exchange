import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, CircularProgress, Grid } from '@mui/material';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/profile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserProfile(data);
      } else {
        if (response.status === 401) {
          console.log('Authentication error. Redirecting to login.');
        } else {
          console.error('Error fetching user profile:', response.statusText);
        }
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedProfile({ ...userProfile });
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setUpdatedProfile({});
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch('http://localhost:3001/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        console.log('User profile updated successfully!');
        setIsEditing(false);
        fetchUserProfile();
      } else {
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  const handleInputChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: '20px', textAlign: 'center' }}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            User Profile
          </Typography>

          {!isEditing ? (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Username: {userProfile.username}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Email: {userProfile.email}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Phone Number: {userProfile.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Address: {userProfile.address}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Country: {userProfile.country}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">State: {userProfile.state}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">City: {userProfile.city}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h5">Pincode: {userProfile.pincode}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleEditClick}>
                  Edit Profile
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField label="Username" name="username" value={updatedProfile.username || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" name="email" value={updatedProfile.email || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Phone Number" name="phoneNumber" value={updatedProfile.phoneNumber || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Address" name="address" value={updatedProfile.address || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Country" name="country" value={updatedProfile.country || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="State" name="state" value={updatedProfile.state || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="City" name="city" value={updatedProfile.city || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Pincode" name="pincode" value={updatedProfile.pincode || ''} onChange={handleInputChange} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default ProfilePage;




