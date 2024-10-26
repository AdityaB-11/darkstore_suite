import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function Hero() {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
        backgroundImage: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        borderRadius: '0 0 50% 50% / 4%',
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          DarkStore Suite
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Revolutionize your dark store operations with AI-powered insights and optimization
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/inventory-prediction"
            variant="contained"
            size="large"
            sx={{ 
              mr: 2,
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              color: 'white',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            }}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{
              color: 'primary.main',
              borderColor: 'primary.main',
            }}
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
