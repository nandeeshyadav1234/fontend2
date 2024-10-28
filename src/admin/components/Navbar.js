// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">Admin Dashboard</Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
