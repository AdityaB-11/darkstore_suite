import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import InventoryPrediction from './components/InventoryPrediction';
import StockAlerts from './components/StockAlerts';
import Recommendations from './components/Recommendations';
import DeliveryOptimization from './components/DeliveryOptimization';
import ProductLayout from './components/ProductLayout';
import QualityControl from './components/QualityControl';
import Login from './components/Login';
import Signup from './components/Signup';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    secondary: {
      main: '#10b981',
    },
    background: {
      default: '#111827',
      paper: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

function PrivateRoute({ children }) {
const { currentUser } = useAuth();
return currentUser ? children : <Navigate to="/login" />;
}

function App() {
return (
<ThemeProvider theme={theme}>
<CssBaseline />
<AuthProvider>
<Router>
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
<Route index element={<Dashboard />} />
<Route path="inventory-prediction" element={<InventoryPrediction />} />
<Route path="stock-alerts" element={<StockAlerts />} />
<Route path="recommendations" element={<Recommendations />} />
<Route path="delivery-optimization" element={<DeliveryOptimization />} />
<Route path="product-layout" element={<ProductLayout />} />
<Route path="quality-control" element={<QualityControl />} />
</Route>
</Routes>
</Router>
</AuthProvider>
</ThemeProvider>
);
}

export default App;
