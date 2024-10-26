// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header'
import Footer from './pages/Footer'; // Assuming you have a Footer component
import Login from './pages/Login'; // Your Login page
import Dashboard from './pages/Dashboard'; // Your Dashboard page
import Admin from './pages/Admin'; // Your Admin page
import Welcome from './pages/Welcome'; // Your Welcome page
import ProtectedRoute from './components/ProtectedRoute'; // Your ProtectedRoute component
import AOS from 'aos';
import React, { useEffect } from 'react';
import 'aos/dist/aos.css'; // Import AOS styles
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      easing: 'ease-in-out', // Animation easing
      once: true, // Whether animation should happen only once
    });
  }, []);
  return (
    <div data-aos="fade-up">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['user', 'admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute roles={['admin']}>
            <Admin />
          </ProtectedRoute>
        } />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      </Routes>
      <Footer />
    </Router>
    </div>
  );
}

export default App;
