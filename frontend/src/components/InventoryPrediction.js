import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, Grid, CircularProgress, Autocomplete, Slider, Chip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const products = ['Earphones', 'Coca Cola ', 'Apple', 'Smartphone', 'T-shirt'];

function InventoryPrediction() {
  const [productName, setProductName] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [predictionDate, setPredictionDate] = useState(new Date());
  const [seasonalFactor, setSeasonalFactor] = useState(50);
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockPrediction = generateMockPrediction();
      setPrediction(mockPrediction);
      setLoading(false);
    }, 2000);
  };

  const generateMockPrediction = () => {
    const predictedStock = Array.from({ length: 30 }, (_, i) => ({
      date: `Day ${i + 1}`,
      stock: Math.floor(Math.random() * 1000 + 500),
      demand: Math.floor(Math.random() * 200 + 50)
    }));

    return {
      productName,
      currentStock: parseInt(currentStock),
      predictedStock,
      confidenceLevel: Math.floor(Math.random() * 20 + 80),
      recommendedAction: Math.random() > 0.5 ? 'Increase inventory' : 'Maintain current levels'
    };
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Inventory Prediction</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <form onSubmit={handleSubmit}>
              <Autocomplete
                fullWidth
                options={products}
                renderInput={(params) => <TextField {...params} label="Product Name" required />}
                value={productName}
                onChange={(event, newValue) => setProductName(newValue)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Current Stock"
                type="number"
                value={currentStock}
                onChange={(e) => setCurrentStock(e.target.value)}
                required
                sx={{ mb: 2 }}
              />
              <Typography gutterBottom>Prediction Date</Typography>
              <DatePicker
                selected={predictionDate}
                onChange={(date) => setPredictionDate(date)}
                customInput={<TextField fullWidth />}
                sx={{ mb: 2 }}
              />
              <Typography gutterBottom>Seasonal Factor</Typography>
              <Slider
                value={seasonalFactor}
                onChange={(e, newValue) => setSeasonalFactor(newValue)}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
                sx={{ mb: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Predict Inventory'}
              </Button>
            </form>
          </Paper>
        </Grid>
        {prediction && (
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Prediction Results</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Product: {prediction.productName}</Typography>
                <Typography variant="subtitle1">Current Stock: {prediction.currentStock}</Typography>
                <Typography variant="subtitle1">Confidence Level: {prediction.confidenceLevel}%</Typography>
                <Chip 
                  label={prediction.recommendedAction} 
                  color={prediction.recommendedAction.includes('Increase') ? 'error' : 'success'} 
                  sx={{ mt: 1 }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={prediction.predictedStock}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="stock" stroke="#8884d8" name="Predicted Stock" />
                  <Line yAxisId="right" type="monotone" dataKey="demand" stroke="#82ca9d" name="Predicted Demand" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default InventoryPrediction;
