// src/layout/DashboardLayout.js
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Sidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Navbar />
      <Outlet /> {/* This renders the child components */}
    </Box>
  </Box>
);

export default DashboardLayout;
