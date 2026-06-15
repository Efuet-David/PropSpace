import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { propertyService } from '../services/propertyService';
import { useAuth } from '../context/AuthContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await propertyService.getPropertyById(id);
      setProperty(data.property);
    } catch (err) {
      setError('Failed to fetch property details');
      console.error('Error fetching property:', err);
    } finally {
      setLoading(false);
    }
  };

  const isOwner = isAuthenticated && property && user && property.author._id === user.id;

  const handleEdit = () => {
    navigate(`/edit-property/${id}`);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await propertyService.deleteProperty(id);
      setDeleteDialogOpen(false);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to delete property');
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress sx={{ color: '#00FF7F' }} />
      </Box>
    );
  }

  if (error || !property) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error || 'Property not found'}</Alert>
          <Button
            onClick={() => navigate('/')}
            sx={{ mt: 2 }}
          >
            Back to Browse
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          ← Back to Browse
        </Button>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              {property.images && property.images.length > 0 ? (
                <Box
                  component="img"
                  src={property.images[0]}
                  alt={property.title}
                  sx={{
                    width: '100%',
                    height: 400,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: 400,
                    backgroundColor: '#E0E0E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body2" color="textSecondary">
                    No Image Available
                  </Typography>
                </Box>
              )}
              {property.images && property.images.length > 1 && (
                <Grid container spacing={1} sx={{ mt: 1 }}>
                  {property.images.slice(1).map((image, index) => (
                    <Grid item xs={4} key={index}>
                      <Box
                        component="img"
                        src={image}
                        alt={`${property.title} ${index + 2}`}
                        sx={{
                          width: '100%',
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 1,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h4" gutterBottom sx={{ color: '#1A1A1A', fontWeight: 'bold' }}>
                {property.title}
              </Typography>
              <Typography variant="h3" color="#00FF7F" gutterBottom>
                ${property.price.toLocaleString()}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Chip
                  label={property.propertyType}
                  sx={{ backgroundColor: '#1A1A1A', color: '#00FF7F' }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {property.location.city}, {property.location.country}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Description
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                {property.description}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Listed by
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {property.author.username}
              </Typography>
              {isOwner && (
                <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleEdit}
                    sx={{
                      borderColor: '#00FF7F',
                      color: '#00FF7F',
                      '&:hover': {
                        backgroundColor: '#00FF7F',
                        color: '#1A1A1A',
                      },
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleDeleteClick}
                    disabled={deleting}
                  >
                    {deleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this property? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={deleting}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PropertyDetails;
