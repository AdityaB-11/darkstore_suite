import React, { useState, useEffect } from 'react';
import { 
  Typography, Box, Grid, Paper, TextField, Button, CircularProgress, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Card, CardContent, List, ListItem, ListItemText, Chip
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SpeedIcon from '@mui/icons-material/Speed';
import RouteIcon from '@mui/icons-material/Route';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

function DeliveryOptimization() {
  const [deliveries, setDeliveries] = useState('');
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchDeliveryStats();
  }, []);

  const fetchDeliveryStats = () => {
    // Simulate API call for delivery statistics
    setTimeout(() => {
      setStats({
        totalDeliveries: 150,
        averageTime: 28,
        onTimePercentage: 92,
        latePercentage: 8,
        deliveryStatus: [
          { name: 'On Time', value: 138 },
          { name: 'Late', value: 12 },
        ],
        vehicleUtilization: [
          { name: 'Utilized', value: 85 },
          { name: 'Idle', value: 15 },
        ],
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for route optimization
    setTimeout(() => {
      const addresses = deliveries.split(',').map(address => address.trim());
      const mockOptimizedRoute = addresses.map((address, index) => ({
        stop: index + 1,
        address: address,
        estimatedTime: Math.floor(Math.random() * 30 + 10) + ' mins',
        distance: (Math.random() * 5 + 1).toFixed(1) + ' km'
      }));
      setOptimizedRoute(mockOptimizedRoute);
      setLoading(false);
    }, 2000);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Delivery Optimization</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Optimize Delivery Route</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Enter delivery addresses"
                value={deliveries}
                onChange={(e) => setDeliveries(e.target.value)}
                placeholder="Enter comma-separated addresses"
                sx={{ mb: 2 }}
              />
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                startIcon={<RouteIcon />}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Optimize Route'}
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Delivery Performance</Typography>
              {stats && (
                <List>
                  <ListItem>
                    <ListItemText primary="Total Deliveries" secondary={stats.totalDeliveries} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Average Delivery Time" secondary={`${stats.averageTime} mins`} />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="On-Time Delivery Rate" 
                      secondary={
                        <Chip 
                          icon={<SpeedIcon />} 
                          label={`${stats.onTimePercentage}%`} 
                          color="success" 
                        />
                      } 
                    />
                  </ListItem>
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Delivery Status</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats?.deliveryStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats?.deliveryStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Vehicle Utilization</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={stats?.vehicleUtilization}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats?.vehicleUtilization.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        {optimizedRoute && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Stop</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Estimated Time</TableCell>
                    <TableCell>Distance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {optimizedRoute.map((stop) => (
                    <TableRow key={stop.stop}>
                      <TableCell>{stop.stop}</TableCell>
                      <TableCell>{stop.address}</TableCell>
                      <TableCell>{stop.estimatedTime}</TableCell>
                      <TableCell>{stop.distance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default DeliveryOptimization;
