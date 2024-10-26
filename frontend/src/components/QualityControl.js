import React, { useState } from 'react';
import { Typography, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function QualityControl() {
  const [qualityReports, setQualityReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (event) => {
    setLoading(true);
    // Simulate image processing and AI analysis
    setTimeout(() => {
      const mockQualityReports = [
        { id: 1, product: 'Earphones', batchNumber: 'WA-001', expirationDate: '2023-12-31', condition: 'Good', action: 'None' },
        { id: 2, product: 'Coca Cola ', batchNumber: 'GB-002', expirationDate: '2023-11-15', condition: 'Damaged Packaging', action: 'Markdown' },
        { id: 3, product: 'Apple', batchNumber: 'TC-003', expirationDate: '2023-10-01', condition: 'Near Expiration', action: 'Remove' },
      ];
      setQualityReports(mockQualityReports);
      setLoading(false);
    }, 2000);
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'Good':
        return 'success';
      case 'Damaged Packaging':
        return 'warning';
      case 'Near Expiration':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Automated Quality Control</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
          disabled={loading}
        >
          Upload Product Images
          <input type="file" hidden onChange={handleImageUpload} multiple />
        </Button>
        {loading && <CircularProgress sx={{ ml: 2 }} />}
      </Paper>
      {qualityReports.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Batch Number</TableCell>
                <TableCell>Expiration Date</TableCell>
                <TableCell>Condition</TableCell>
                <TableCell>Recommended Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qualityReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.product}</TableCell>
                  <TableCell>{report.batchNumber}</TableCell>
                  <TableCell>{report.expirationDate}</TableCell>
                  <TableCell>
                    <Chip label={report.condition} color={getConditionColor(report.condition)} />
                  </TableCell>
                  <TableCell>{report.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default QualityControl;
