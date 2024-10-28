// src/pages/Login.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const { data } = await api.post('/login', { username: 'user', password: 'password' });
    if (data.token) {
      localStorage.setItem('token', data.token);
      const role = JSON.parse(atob(data.token.split('.')[1])).role;
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
