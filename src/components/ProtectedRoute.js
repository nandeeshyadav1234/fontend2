import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ roles }) => {
  const isAuthenticated = true; // Replace with your authentication logic
  const userRole = 'user'; // Replace with your logic to get the current user's role

  if (!isAuthenticated || (roles && !roles.includes(userRole))) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
