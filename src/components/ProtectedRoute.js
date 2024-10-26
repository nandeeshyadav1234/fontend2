// src/components/ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { isAuthenticated, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, roles }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;

  const userRole = getUserRole();
  if (roles && !roles.includes(userRole)) return <Navigate to="/unauthorized" />;

  return children;
};

export default ProtectedRoute;
