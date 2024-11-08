// src/pages/SignIn.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Paper,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validate inputs
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${apiUrl}auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));

        if (response.ok) {
          // Handle successful login
          console.log('Login successful:', data);
          navigate('/admin'); // Redirect to the admin page
        } else {
          // Display error message
          setError(data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        // Handle network or other fetch errors
        setError('An error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Don't have an account? Sign Up"}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
