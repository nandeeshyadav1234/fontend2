// src/layout/DashboardLayout.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const DashboardLayout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Navbar />
      {children}
    </Box>
  </Box>
);

export default DashboardLayout;
