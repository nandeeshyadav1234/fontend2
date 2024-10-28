// src/routes/DashboardRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../admin/layout/DashboardLayout'
import DashboardHome from '../admin/pages/Dashboard';
import DashboardSettings from '../admin/pages/DashboardSettings';
// import DashboardProfile from '../admin//pages/DashboardProfile';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="settings" element={<DashboardSettings />} />
        {/* <Route path="profile" element={<DashboardProfile />} /> */}
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
