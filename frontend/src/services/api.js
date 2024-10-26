import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InventoryPrediction from './components/InventoryPrediction';
import StockAlerts from './components/StockAlerts';
import Recommendations from './components/Recommendations';
import DeliveryOptimization from './components/DeliveryOptimization';
import ProductLayout from './components/ProductLayout';
import QualityControl from './components/QualityControl';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory-prediction" element={<InventoryPrediction />} />
        <Route path="/stock-alerts" element={<StockAlerts />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/delivery-optimization" element={<DeliveryOptimization />} />
        <Route path="/product-layout" element={<ProductLayout />} />
        <Route path="/quality-control" element={<QualityControl />} />
      </Routes>
    </Router>
  );
}

export default App;
