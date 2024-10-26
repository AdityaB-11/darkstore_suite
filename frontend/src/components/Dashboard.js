import React, { useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InventoryIcon from '@mui/icons-material/Inventory';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import RecommendIcon from '@mui/icons-material/Recommend';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import './Dashboard.css';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  width: 64,
  height: 64,
  borderRadius: '50%',
  background: 'rgba(255, 255, 255, 0.1)',
  '& > svg': {
    fontSize: 32,
  },
}));

const data = [
  { name: 'Mon', sales: 4000, stock: 2400 },
  { name: 'Tue', sales: 3000, stock: 1398 },
  { name: 'Wed', sales: 2000, stock: 9800 },
  { name: 'Thu', sales: 2780, stock: 3908 },
  { name: 'Fri', sales: 1890, stock: 4800 },
  { name: 'Sat', sales: 2390, stock: 3800 },
  { name: 'Sun', sales: 3490, stock: 4300 },
];

const dashboardModules = [
  { name: 'Inventory Prediction', icon: <InventoryIcon />, path: '/inventory-prediction', color: '#3f51b5' },
  { name: 'Stock Alerts', icon: <NotificationsActiveIcon />, path: '/stock-alerts', color: '#f44336' },
  { name: 'Recommendations', icon: <RecommendIcon />, path: '/recommendations', color: '#4caf50' },
  { name: 'Delivery Optimization', icon: <LocalShippingIcon />, path: '/delivery-optimization', color: '#ff9800' },
  { name: 'Product Layout', icon: <ViewQuiltIcon />, path: '/product-layout', color: '#2196f3' },
  { name: 'Quality Control', icon: <VerifiedUserIcon />, path: '/quality-control', color: '#9c27b0' },
];

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add animation classes after component mount
    const timer = setTimeout(() => {
      document.querySelector('.dashboard-title').classList.add('animate');
      document.querySelectorAll('.dashboard-card').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate');
        }, 100 * index);
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#111827', minHeight: '100vh', p: 3 }}>
      <Typography variant="h4" gutterBottom component="div" sx={{ mb: 4, fontWeight: 'bold' }} className="dashboard-title">
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} className="dashboard-card">
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Weekly Sales and Stock Overview</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="stock" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} className="dashboard-card">
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Key Metrics</Typography>
            <Typography variant="body1">Total Sales: $15,240</Typography>
            <Typography variant="body1">Total Stock: 3,500 units</Typography>
            <Typography variant="body1">Active Alerts: 3</Typography>
            <Typography variant="body1">Delivery Efficiency: 92%</Typography>
          </Paper>
        </Grid>
        {dashboardModules.map((module, index) => (
          <Grid item xs={12} sm={6} md={4} key={module.name} className="dashboard-card">
            <StyledCard>
              <CardActionArea onClick={() => navigate(module.path)} sx={{ height: '100%' }}>
                <CardContent>
                  <IconWrapper>
                    {module.icon}
                  </IconWrapper>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {module.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Access AI-driven insights and optimize your {module.name.toLowerCase()} processes.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export { dashboardModules };
export default Dashboard;
