import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Grid, Card, CardContent, CardActions, Button, CircularProgress,
  Chip, Avatar, List, ListItem, ListItemText, ListItemAvatar, Divider, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const mockRecommendations = [
  { 
    id: 1, 
    title: 'Increase stock of Earphones', 
    description: 'Based on recent sales trends and upcoming seasonal demand, we recommend increasing the stock of Earphones by 20%.', 
    impact: 'High',
    category: 'Inventory',
    potentialRevenue: '$5,000',
    implementationCost: '$1,000',
    timeToImplement: '1 week'
  },
  { 
    id: 2, 
    title: 'PromoteCoca Cola ', 
    description: 'Coca Cola  has been underperforming. Consider running a promotional campaign to boost sales.', 
    impact: 'Medium',
    category: 'Marketing',
    potentialRevenue: '$3,000',
    implementationCost: '$500',
    timeToImplement: '2 weeks'
  },
  { 
    id: 3, 
    title: 'Optimize layout forApple', 
    description: 'Apple sells better when placed near the entrance. Consider relocating it for better visibility.', 
    impact: 'Low',
    category: 'Store Layout',
    potentialRevenue: '$1,000',
    implementationCost: '$100',
    timeToImplement: '1 day'
  },
  { 
    id: 4, 
    title: 'Bundle Smartphone with T-shirt', 
    description: 'Customers who buy Smartphone often purchase T-shirt as well. Create a bundle offer to increase average order value.', 
    impact: 'Medium',
    category: 'Sales',
    potentialRevenue: '$2,500',
    implementationCost: '$200',
    timeToImplement: '3 days'
  },
];

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRecommendations(mockRecommendations);
      setLoading(false);
    }, 1500);
  };

  const handleImplement = (id) => {
    // Implement the recommendation logic here
    console.log(`Implementing recommendation ${id}`);
  };

  const handleDismiss = (id) => {
    setRecommendations(recommendations.filter(rec => rec.id !== id));
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'error';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Inventory':
        return <InventoryIcon />;
      case 'Marketing':
        return <LocalOfferIcon />;
      case 'Store Layout':
        return <ShoppingCartIcon />;
      case 'Sales':
        return <TrendingUpIcon />;
      default:
        return <TrendingUpIcon />;
    }
  };

  const filteredRecommendations = recommendations
    .filter(rec => rec.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                   rec.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(rec => selectedCategory === 'All' || rec.category === selectedCategory);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>AI-Powered Recommendations</Typography>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search recommendations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box sx={{ mb: 3 }}>
        {['All', 'Inventory', 'Marketing', 'Store Layout', 'Sales'].map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => setSelectedCategory(category)}
            color={selectedCategory === category ? 'primary' : 'default'}
            sx={{ mr: 1, mb: 1 }}
          />
        ))}
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {filteredRecommendations.map((rec) => (
            <Grid item xs={12} md={6} key={rec.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: getImpactColor(rec.impact), mr: 2 }}>
                      {getCategoryIcon(rec.category)}
                    </Avatar>
                    <Typography variant="h6">{rec.title}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {rec.description}
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <TrendingUpIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Potential Revenue" secondary={rec.potentialRevenue} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <TrendingDownIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Implementation Cost" secondary={rec.implementationCost} />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <InventoryIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Time to Implement" secondary={rec.timeToImplement} />
                    </ListItem>
                  </List>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleImplement(rec.id)}>
                    Implement
                  </Button>
                  <Button size="small" color="secondary" onClick={() => handleDismiss(rec.id)}>
                    Dismiss
                  </Button>
                  <Box flexGrow={1} />
                  <Chip 
                    label={`Impact: ${rec.impact}`}
                    color={getImpactColor(rec.impact)}
                    size="small"
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Recommendations;
