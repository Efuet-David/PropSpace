import React from 'react';
import { Box, TextField, MenuItem, Button, Typography, Paper } from '@mui/material';

const FilterSidebar = ({ filters, onFilterChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <Paper sx={{ p: 3, height: 'fit-content' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#00FF7F' }}>
        Filters
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          fullWidth
          label="City"
          name="city"
          value={filters.city || ''}
          onChange={handleChange}
          size="small"
        />
        <TextField
          fullWidth
          label="Min Price"
          name="minPrice"
          type="number"
          value={filters.minPrice || ''}
          onChange={handleChange}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
        />
        <TextField
          fullWidth
          label="Max Price"
          name="maxPrice"
          type="number"
          value={filters.maxPrice || ''}
          onChange={handleChange}
          size="small"
          InputProps={{ inputProps: { min: 0 } }}
        />
        <TextField
          fullWidth
          select
          label="Property Type"
          name="propertyType"
          value={filters.propertyType || ''}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="Apartment">Apartment</MenuItem>
          <MenuItem value="House">House</MenuItem>
          <MenuItem value="Studio">Studio</MenuItem>
        </TextField>
        <Button
          fullWidth
          variant="contained"
          onClick={() => onFilterChange(filters)}
          sx={{
            backgroundColor: '#00FF7F',
            color: '#1A1A1A',
            '&:hover': {
              backgroundColor: '#00CC66',
            },
          }}
        >
          Apply Filters
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={onReset}
          sx={{
            borderColor: '#1A1A1A',
            color: '#1A1A1A',
            '&:hover': {
              borderColor: '#00FF7F',
              color: '#00FF7F',
            },
          }}
        >
          Reset
        </Button>
      </Box>
    </Paper>
  );
};

export default FilterSidebar;
