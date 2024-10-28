// src/pages/Dashboard.js
import React from 'react';
import { Typography, Grid, Paper, Box } from '@mui/material';

const Dashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Dashboard
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">Total Sales</Typography>
          <Typography variant="h4">$5,000</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6">New Users</Typography>
          <Typography variant="h4">120</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default Dashboard;
