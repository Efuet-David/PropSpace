import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Alert, Paper, Grid, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { propertyService } from '../services/propertyService';

const CreateProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    country: '',
    propertyType: 'Apartment',
    images: [''],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleAddImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ''],
    });
  };

  const handleRemoveImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages.length > 0 ? newImages : [''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate
    if (!formData.title || !formData.description || !formData.price || !formData.city || !formData.country) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    const propertyData = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      location: {
        city: formData.city,
        country: formData.country,
      },
      propertyType: formData.propertyType,
      images: formData.images.filter(img => img.trim() !== ''),
    };

    try {
      await propertyService.createProperty(propertyData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create property');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#00FF7F', fontWeight: 'bold', textAlign: 'center' }}>
            Create New Listing
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              helperText="Max 100 characters"
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              required
              multiline
              rows={4}
              helperText="Max 1000 characters"
              inputProps={{ maxLength: 1000 }}
            />
            <TextField
              fullWidth
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              margin="normal"
              required
              InputProps={{ inputProps: { min: 0, step: 0.01 } }}
            />
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  margin="normal"
                  required
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              select
              label="Property Type"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              margin="normal"
              required
            >
              <MenuItem value="Apartment">Apartment</MenuItem>
              <MenuItem value="House">House</MenuItem>
              <MenuItem value="Studio">Studio</MenuItem>
            </TextField>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Images
            </Typography>
            {formData.images.map((image, index) => (
              <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label={`Image URL ${index + 1}`}
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  margin="normal"
                  size="small"
                />
                {formData.images.length > 1 && (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveImage(index)}
                    sx={{ mt: 1 }}
                  >
                    Remove
                  </Button>
                )}
              </Box>
            ))}
            <Button
              variant="outlined"
              onClick={handleAddImage}
              sx={{ mt: 1 }}
            >
              Add Another Image
            </Button>
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
              {loading ? 'Creating...' : 'Create Listing'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default CreateProperty;
