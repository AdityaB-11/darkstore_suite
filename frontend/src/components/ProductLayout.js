import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Grid, Paper, TextField, Button, CircularProgress, 
  Card, CardContent, List, ListItem, ListItemText, Chip, Slider
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SpeedIcon from '@mui/icons-material/Speed';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function ProductLayout() {
  const [storeLayout, setStoreLayout] = useState('');
  const [optimizedLayout, setOptimizedLayout] = useState(null);
  const [loading, setLoading] = useState(false);
  const [layoutEfficiency, setLayoutEfficiency] = useState(0);
  const [pickingSpeed, setPickingSpeed] = useState(0);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchLayoutStats();
  }, []);

  const fetchLayoutStats = () => {
    // Simulate API call for layout statistics
    setTimeout(() => {
      setStats({
        currentEfficiency: 65,
        averagePickingTime: 120, // seconds
        topSellingCategories: [
          { name: 'Electronics', value: 30 },
          { name: 'Groceries', value: 25 },
          { name: 'Clothing', value: 20 },
          { name: 'Home & Garden', value: 15 },
          { name: 'Beauty', value: 10 },
        ],
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for layout optimization
    setTimeout(() => {
      const mockOptimizedLayout = `
Entrance:
- Popular items (Electronics, Groceries)
- Promotional displays

Aisle 1-3: Electronics
- Smartphones and accessories
- Laptops and computers
- Audio equipment

Aisle 4-6: Groceries
- Fresh produce
- Dairy and refrigerated items
- Canned and packaged goods

Aisle 7-8: Clothing
- Men's apparel
- Women's apparel
- Children's clothing

Aisle 9-10: Home & Garden
- Kitchen appliances
- Bedding and bath items
- Gardening tools

Aisle 11: Beauty
- Skincare products
- Makeup
- Hair care items

Checkout Area:
- Impulse purchase items
- Customer service desk
      `;
      setOptimizedLayout(mockOptimizedLayout);
      setLayoutEfficiency(Math.floor(Math.random() * 20 + 80)); // 80-99%
      setPickingSpeed(Math.floor(Math.random() * 30 + 60)); // 60-89 seconds
      setLoading(false);
    }, 2000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Product Layout Optimizer</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Current Store Layout</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Enter current store layout"
                value={storeLayout}
                onChange={(e) => setStoreLayout(e.target.value)}
                placeholder="Describe your current store layout..."
                sx={{ mb: 2 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                startIcon={<StorefrontIcon />}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Optimize Layout'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Layout Performance</Typography>
              {stats && (
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="Current Layout Efficiency" 
                      secondary={
                        <Chip 
                          icon={<SpeedIcon />} 
                          label={`${stats.currentEfficiency}%`} 
                          color={stats.currentEfficiency >= 80 ? "success" : "warning"} 
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Average Picking Time" secondary={`${stats.averagePickingTime} seconds`} />
                  </ListItem>
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Top Selling Categories</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats?.topSellingCategories}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {optimizedLayout && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Optimization Results</Typography>
                <List>
                  <ListItem>
                    <ListItemText 
                      primary="New Layout Efficiency" 
                      secondary={
                        <Chip 
                          icon={<TrendingUpIcon />} 
                          label={`${layoutEfficiency}%`} 
                          color="success" 
                        />
                      } 
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Estimated Picking Speed" secondary={`${pickingSpeed} seconds`} />
                  </ListItem>
                </List>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>Efficiency Improvement</Typography>
                  <Slider
                    value={layoutEfficiency - stats?.currentEfficiency}
                    max={35}
                    valueLabelDisplay="on"
                    valueLabelFormat={(value) => `+${value}%`}
                    disabled
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
        {optimizedLayout && (
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Optimized Store Layout</Typography>
              <Typography variant="body1" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
                {optimizedLayout}
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default ProductLayout;
