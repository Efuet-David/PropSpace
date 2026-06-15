import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 16px rgba(0, 255, 127, 0.2)',
        },
      }}
    >
      {property.images && property.images.length > 0 ? (
        <CardMedia
          component="img"
          height="200"
          image={property.images[0]}
          alt={property.title}
          sx={{ objectFit: 'cover' }}
        />
      ) : (
        <Box
          sx={{
            height: 200,
            backgroundColor: '#E0E0E0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No Image
          </Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {property.title}
        </Typography>
        <Typography variant="h5" color="#00FF7F" gutterBottom>
          ${property.price.toLocaleString()}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Chip 
            label={property.propertyType} 
            size="small" 
            sx={{ backgroundColor: '#1A1A1A', color: '#00FF7F' }}
          />
        </Box>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {property.location.city}, {property.location.country}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {property.description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleViewDetails}
          sx={{
            borderColor: '#00FF7F',
            color: '#00FF7F',
            '&:hover': {
              backgroundColor: '#00FF7F',
              color: '#1A1A1A',
            },
          }}
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default PropertyCard;
