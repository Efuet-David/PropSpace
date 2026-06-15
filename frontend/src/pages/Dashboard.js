import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../services/propertyService';

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProperties();
  }, []);

  const fetchUserProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getUserProperties();
      setProperties(data.properties || []);
    } catch (err) {
      setError('Failed to fetch your properties. Please try again.');
      console.error('Error fetching user properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProperty = () => {
    navigate('/create-property');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" sx={{ color: '#1A1A1A', fontWeight: 'bold' }}>
          My Listings
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreateProperty}
          sx={{
            backgroundColor: '#00FF7F',
            color: '#1A1A1A',
            '&:hover': {
              backgroundColor: '#00CC66',
            },
          }}
        >
          Add New Property
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress sx={{ color: '#00FF7F' }} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && properties.length === 0 && (
        <Box sx={{ textAlign: 'center', p: 6 }}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            You haven't listed any properties yet
          </Typography>
          <Button
            variant="contained"
            onClick={handleCreateProperty}
            sx={{
              mt: 2,
              backgroundColor: '#00FF7F',
              color: '#1A1A1A',
              '&:hover': {
                backgroundColor: '#00CC66',
              },
            }}
          >
            Create Your First Listing
          </Button>
        </Box>
      )}

      {!loading && !error && properties.length > 0 && (
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property._id}>
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
