// src/App.js

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import Login from './pages/Login';
import DashboardRoutes from './routes/DashboardRoutes';
import Welcome from './pages/Welcome';
import AboutSection from './pages/About';
import Contact from './pages/Contact';
import Property from './pages/Property';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
// Check if the path is a dashboard route
const shouldSkipHeaderFooter = (pathname) => pathname.startsWith('/admin');

function LayoutWrapper({ children }) {
  const location = useLocation();
  const showHeaderFooter = !shouldSkipHeaderFooter(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div data-aos="fade-up">
      <Router>
        <LayoutWrapper>
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/property" element={<Property />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path='/about' element={<AboutSection />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/*" element={<DashboardRoutes />} />
            {/* Protect the entire admin route */}
            {/* <Route element={<ProtectedRoute roles={['admin']} />}>
              <Route path="/admin/*" element={<DashboardRoutes />} />
            </Route> */}
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </LayoutWrapper>
      </Router>
    </div>
  );
}

export default App;
