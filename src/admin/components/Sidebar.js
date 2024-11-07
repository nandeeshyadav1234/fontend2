import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/SettingsApplications'; // Stylish settings icon
import GroupIcon from '@mui/icons-material/Group'; // Updated Users icon
import CategoryIcon from '@mui/icons-material/Category'; // Stylish Products icon
import ListAltIcon from '@mui/icons-material/ListAlt'; // Stylish Orders icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [openUsers, setOpenUsers] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);

  const handleUsersClick = () => {
    setOpenUsers(!openUsers);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#2C3E50', // Sidebar background color
          color: 'white', // Text color
        },
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', pt: 3 }}>
        {/* Dashboard Item */}
        <ListItem button component={Link} to="/admin" sx={{ '&:hover': { backgroundColor: '#34495E' } }}>
          <ListItemIcon sx={{ color: 'white' }}><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: 'white' }} />
        </ListItem>

        {/* Users Section */}
        <ListItem button onClick={handleUsersClick} aria-expanded={openUsers} sx={{ '&:hover': { backgroundColor: '#34495E' } }}>
          <ListItemIcon sx={{ color: 'white' }}><GroupIcon /></ListItemIcon>
          <ListItemText primary="Users" sx={{ color: 'white' }} />
          {openUsers ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
        </ListItem>
        <Collapse in={openUsers} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/users/brokers" sx={{ pl: 4, '&:hover': { backgroundColor: '#34495E' } }}>
              <ListItemText primary="Brokers" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem button component={Link} to="/admin/users/leads" sx={{ pl: 4, '&:hover': { backgroundColor: '#34495E' } }}>
              <ListItemText primary="Leads" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem button component={Link} to="/admin/users/admins" sx={{ pl: 4, '&:hover': { backgroundColor: '#34495E' } }}>
              <ListItemText primary="Admins" sx={{ color: 'white' }} />
            </ListItem>
          </List>
        </Collapse>

        {/* Products Section */}
        <ListItem button onClick={handleProductsClick} aria-expanded={openProducts} sx={{ '&:hover': { backgroundColor: '#34495E' } }}>
          <ListItemIcon sx={{ color: 'white' }}><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Products" sx={{ color: 'white' }} />
          {openProducts ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
        </ListItem>
        <Collapse in={openProducts} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/admin/products/plots" sx={{ pl: 4, '&:hover': { backgroundColor: '#34495E' } }}>
              <ListItemText primary="Plots" sx={{ color: 'white' }} />
            </ListItem>
            {/* <ListItem button component={Link} to="/admin/products/house" sx={{ pl: 4, '&:hover': { backgroundColor: '#34495E' } }}>
              <ListItemText primary="House" sx={{ color: 'white' }} />
            </ListItem>
            <ListItem button component={Link} to="/admin/products/lands" sx={{ pl: 4, '&:hover': { backgroundColor: '#34495E' } }}>
              <ListItemText primary="Lands" sx={{ color: 'white' }} />
            </ListItem> */}
          </List>
        </Collapse>

        {/* Orders Item */}
        <ListItem button component={Link} to="/admin/orders" sx={{ '&:hover': { backgroundColor: '#34495E' } }}>
          <ListItemIcon sx={{ color: 'white' }}><ListAltIcon /></ListItemIcon>
          <ListItemText primary="Orders" sx={{ color: 'white' }} />
        </ListItem>

        {/* Settings Item */}
        <ListItem button component={Link} to="/admin/settings" sx={{ '&:hover': { backgroundColor: '#34495E' } }}>
          <ListItemIcon sx={{ color: 'white' }}><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Settings" sx={{ color: 'white' }} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
