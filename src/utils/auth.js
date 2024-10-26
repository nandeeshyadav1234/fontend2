// src/utils/auth.js

// Check if the user is authenticated by looking for a token
export const isAuthenticated = () => !!localStorage.getItem('token');

// Get the user role from the token (simplified, assuming role is in token payload)
export const getUserRole = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;

  try {
    const payload = JSON.parse(user)// decode JWT payload
    console.log('payload',payload)
    return payload.role_name; // Adjust based on your backend's JWT structure
  } catch (e) {
    return null;
  }
};
