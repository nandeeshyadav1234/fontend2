// src/routes/DashboardRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../admin/layout/DashboardLayout'
import DashboardHome from '../admin/pages/Dashboard';
import DashboardSettings from '../admin/pages/DashboardSettings';
import { AppBar, Toolbar, Typography } from '@mui/material';
import Users from '../admin/pages/Users.js'; // Main Users page
import Brokers from '../admin/pages/Brokers';
import Leads from '../admin/pages/Leads';
import Admins from '../admin/pages/Admins';
import Products from '../admin/pages/Products'; // Main Products page
import Plots from '../admin/pages/Plots'; // Add this page
import House from '../admin/pages/House'; // Add this page
import Lands from '../admin/pages/Lands'; // Add this page
import Orders from '../admin/pages/Orders';
const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="settings" element={<DashboardSettings />} />
      <Route path="users" element={<Users />} />
      <Route path="users/brokers" element={<Brokers />} />
      <Route path="users/leads" element={<Leads />} />
      <Route path="users/admins" element={<Admins />} />
      <Route path="products" element={<Products />} />
      <Route path="products/plots" element={<Plots />} />
      <Route path="products/house" element={<House />} />
      <Route path="products/lands" element={<Lands />} />
      <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
