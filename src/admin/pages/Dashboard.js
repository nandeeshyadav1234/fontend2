// src/pages/Dashboard.js
import React from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Dummy data for charts
const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
  { name: 'Jul', sales: 3490 },
];

const Dashboard = () => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h4" gutterBottom>
      Real Estate Dashboard
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6">Total Listings</Typography>
          <Typography variant="h4">150</Typography>
          <ArrowUpwardIcon color="success" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6">Sales This Month</Typography>
          <Typography variant="h4">$500,000</Typography>
          <MonetizationOnIcon color="success" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6">New Leads</Typography>
          <Typography variant="h4">30</Typography>
          <PeopleIcon color="success" />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
          <Typography variant="h6">Average Property Price</Typography>
          <Typography variant="h4">$300,000</Typography>
          <HomeIcon color="success" />
        </Paper>
      </Grid>
    </Grid>

    {/* Additional Statistics */}
    <Typography variant="h5" sx={{ marginTop: 4 }}>
      Additional Statistics
    </Typography>
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <Grid item xs={12} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Properties Sold</Typography>
            <Typography variant="h4">75</Typography>
            <InsertChartIcon />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Pending Transactions</Typography>
            <Typography variant="h4">20</Typography>
            <InsertChartIcon />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6} lg={4}>
        <Card elevation={3}>
          <CardContent>
            <Typography variant="h6">Total Agents</Typography>
            <Typography variant="h4">50</Typography>
            <InsertChartIcon />
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    {/* Sales Chart */}
    <Typography variant="h5" sx={{ marginTop: 4 }}>
      Sales Trend
    </Typography>
    <LineChart
      width={600}
      height={300}
      data={salesData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="sales" stroke="#8884d8" />
    </LineChart>
  </Box>
);

export default Dashboard;
