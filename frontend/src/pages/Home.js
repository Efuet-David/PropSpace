import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, CircularProgress, Alert, Button } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import FilterSidebar from '../components/FilterSidebar';
import { propertyService } from '../services/propertyService';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    city: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async (currentFilters = filters) => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getAllProperties(currentFilters);
      setProperties(data.properties || []);
    } catch (err) {
      setError('Failed to fetch properties. Please try again.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    fetchProperties(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      city: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
    };
    setFilters(resetFilters);
    fetchProperties(resetFilters);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1A1A1A', fontWeight: 'bold' }}>
        Browse Properties
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleApplyFilters}
            sx={{
              mt: 2,
              backgroundColor: '#00FF7F',
              color: '#1A1A1A',
              '&:hover': {
                backgroundColor: '#00CC66',
              },
            }}
          >
            Apply Filters
          </Button>
        </Grid>
        <Grid item xs={12} md={9}>
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
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h6" color="textSecondary">
                No properties found
              </Typography>
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
