import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1A1A' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: '#00FF7F',
            fontWeight: 'bold',
          }}
        >
          PropSpace
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{ 
              color: location.pathname === '/' ? '#00FF7F' : 'white',
              textDecoration: 'none'
            }}
          >
            Browse
          </Button>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/dashboard"
                sx={{ 
                  color: location.pathname === '/dashboard' ? '#00FF7F' : 'white',
                  textDecoration: 'none'
                }}
              >
                My Listings
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/profile"
                sx={{ 
                  color: location.pathname === '/profile' ? '#00FF7F' : 'white',
                  textDecoration: 'none'
                }}
              >
                Profile
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/create-property"
                sx={{ 
                  color: location.pathname === '/create-property' ? '#00FF7F' : 'white',
                  textDecoration: 'none'
                }}
              >
                Add Property
              </Button>
              <Button
                onClick={handleLogout}
                sx={{ 
                  color: '#00FF7F',
                  border: '1px solid #00FF7F',
                  '&:hover': {
                    backgroundColor: '#00FF7F',
                    color: '#1A1A1A',
                  }
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ 
                  color: location.pathname === '/login' ? '#00FF7F' : 'white',
                  textDecoration: 'none'
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/register"
                sx={{ 
                  color: '#00FF7F',
                  border: '1px solid #00FF7F',
                  '&:hover': {
                    backgroundColor: '#00FF7F',
                    color: '#1A1A1A',
                  }
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
