import React, { useState, useEffect } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, 
  Chip, IconButton, TextField, MenuItem, Grid, Card, CardContent, LinearProgress, Button
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SortIcon from '@mui/icons-material/Sort';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockAlerts = [
  { id: 1, product: 'Earphones', currentStock: 5, threshold: 10, status: 'Low', daysUntilStockout: 3, reorderQuantity: 50 },
  { id: 2, product: 'Coca Cola ', currentStock: 0, threshold: 5, status: 'Out of Stock', daysUntilStockout: 0, reorderQuantity: 25 },
  { id: 3, product: 'Apple', currentStock: 8, threshold: 15, status: 'Low', daysUntilStockout: 5, reorderQuantity: 30 },
  { id: 4, product: 'Smartphone', currentStock: 20, threshold: 25, status: 'Adequate', daysUntilStockout: 14, reorderQuantity: 0 },
  { id: 5, product: 'T-shirt', currentStock: 3, threshold: 10, status: 'Critical', daysUntilStockout: 1, reorderQuantity: 40 },
];

function StockAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('status');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAlerts(mockAlerts);
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Out of Stock':
        return 'error';
      case 'Critical':
        return 'error';
      case 'Low':
        return 'warning';
      case 'Adequate':
        return 'success';
      default:
        return 'default';
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleSort = () => {
    const sortedAlerts = [...alerts].sort((a, b) => {
      if (sortBy === 'status') {
        return a.status.localeCompare(b.status);
      } else if (sortBy === 'stock') {
        return a.currentStock - b.currentStock;
      }
      return 0;
    });
    setAlerts(sortedAlerts);
    setSortBy(sortBy === 'status' ? 'stock' : 'status');
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'All' || alert.status === filter
  );

  const chartData = [
    { name: 'Critical', value: alerts.filter(a => a.status === 'Critical').length },
    { name: 'Low', value: alerts.filter(a => a.status === 'Low').length },
    { name: 'Adequate', value: alerts.filter(a => a.status === 'Adequate').length },
    { name: 'Out of Stock', value: alerts.filter(a => a.status === 'Out of Stock').length },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Stock Alerts</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <TextField
                select
                label="Filter by Status"
                value={filter}
                onChange={handleFilter}
                sx={{ minWidth: 150 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Adequate">Adequate</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </TextField>
              <Box>
                <IconButton onClick={handleSort} title={`Sort by ${sortBy === 'status' ? 'Current Stock' : 'Status'}`}>
                  <SortIcon />
                </IconButton>
                <IconButton onClick={fetchAlerts} title="Refresh">
                  <RefreshIcon />
                </IconButton>
              </Box>
            </Box>
            {loading ? (
              <LinearProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Current Stock</TableCell>
                      <TableCell align="right">Threshold</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="right">Days Until Stockout</TableCell>
                      <TableCell align="right">Reorder Quantity</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredAlerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell component="th" scope="row">
                          {alert.product}
                        </TableCell>
                        <TableCell align="right">{alert.currentStock}</TableCell>
                        <TableCell align="right">{alert.threshold}</TableCell>
                        <TableCell>
                          <Chip label={alert.status} color={getStatusColor(alert.status)} />
                        </TableCell>
                        <TableCell align="right">{alert.daysUntilStockout}</TableCell>
                        <TableCell align="right">{alert.reorderQuantity}</TableCell>
                        <TableCell>
                          <Button 
                            variant="contained" 
                            size="small" 
                            color="primary"
                            disabled={alert.status === 'Adequate'}
                          >
                            Reorder
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Stock Status Overview</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
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
      </Grid>
    </Box>
  );
}

export default StockAlerts;
