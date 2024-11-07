import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import withTable from '../../hoc/withTable';
import BrokerRows from '../components/BrokerRows';

const apiUrl = process.env.REACT_APP_API_URL;

const Brokers = () => {
  const [brokers, setBrokers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'fullname', direction: 'asc' });
  const [open, setOpen] = useState(false);
  const [editBroker, setEditBroker] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, brokerId: null });
  const userType = 'Admin';
  const [newBroker, setNewBroker] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    avatar: 'user.jpg',
    description: '',
    address: '',
    city: '',
    role: userType,
    gender: '',
    birthday: '',
  });

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        const response = await axios.get(`${apiUrl}users/getUsers`);
        const filteredBrokers = response.data.filter((broker) => broker.role_id == 1); 
        setBrokers(filteredBrokers);
      } catch (error) {
        console.error('Error fetching brokers:', error);
      }
    };
    fetchBrokers();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBrokers = [...brokers].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleOpen = (broker = null) => {
    setEditBroker(broker);
    setNewBroker(broker || {
      fullname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      avatar: 'user.jpg',
      description: '',
      address: '',
      city: '',
      role: userType,
      gender: '',
      birthday: '',
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBroker((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const isFormValid =
      newBroker.fullname &&
      newBroker.email &&
      newBroker.phone &&
      newBroker.password &&
      newBroker.confirmPassword &&
      newBroker.birthday &&
      newBroker.gender &&
      newBroker.password === newBroker.confirmPassword;

      if (!isFormValid) {
      alert('Please fill in all required fields and ensure passwords match.');
      return;
    }

    const brokerData = { ...newBroker };

    try {
      const userToken = localStorage.getItem('userToken');
      if (editBroker) {
        await axios.put(`${apiUrl}users/updateUser/${editBroker.id}`, brokerData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        });
        setBrokers((prev) => prev.map((broker) => (broker.id === editBroker.id ? brokerData : broker)));
      } else {
        const response = await axios.post(`${apiUrl}users/addUser`, brokerData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        });
        setBrokers((prev) => [...prev, response.data.vendor]);
      }
      handleClose();
    } catch (error) {
      console.error('Error adding/updating broker:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (brokerId) => {
    try {
      const userToken = localStorage.getItem('userToken');
      await axios.delete(`${apiUrl}users/deleteUser/${brokerId}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
      });
      setBrokers((prev) => prev.filter((broker) => broker.id !== brokerId));
      setConfirmDelete({ open: false, brokerId: null });
    } catch (error) {
      console.error('Error deleting broker:', error.response ? error.response.data : error.message);
    }
  };

  const columns = [
    { key: 'fullname', label: 'Full Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: true },
    { key: 'avatar', label: 'Avatar', sortable: false },
    { key: 'description', label: 'Description', sortable: false },
    { key: 'address', label: 'Address', sortable: false },
    { key: 'city', label: 'City', sortable: true },
    { key: 'gender', label: 'Gender', sortable: true },
    { key: 'DOB', label: 'Date of Birth', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Admins Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>Add New Admin</Button>

      <TableWithBrokers
        rows={sortedBrokers}
        columns={columns}
        sortConfig={sortConfig}
        onSort={handleSort}
        onEdit={handleOpen}
        onDelete={(brokerId) => setConfirmDelete({ open: true, brokerId })}
      />

      {/* Add/Edit Broker Modal */}
      <Modal open={open} onClose={handleClose}>
  <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2, 
      padding: 3, 
      maxWidth: 400, 
      height: 500,
      overflowY: 'auto',
      margin: 'auto', 
      bgcolor: 'background.paper', 
      borderRadius: 2, 
      boxShadow: 24 
    }}
  >
    <Typography variant="h6" component="h2" textAlign="center">
      {editBroker ? 'Edit Broker' : 'Add New Broker'}
    </Typography>
    
    <TextField
      label="Full Name"
      name="fullname"
      value={newBroker.fullname}
      onChange={handleChange}
      fullWidth
      required
    />
    <TextField
      label="Email"
      name="email"
      value={newBroker.email}
      onChange={handleChange}
      fullWidth
      required
      type="email"
    />
    <TextField
      label="Phone"
      name="phone"
      value={newBroker.phone}
      onChange={handleChange}
      fullWidth
      required
      type="tel"
    />
    <TextField
      label="Password"
      name="password"
      value={newBroker.password}
      onChange={handleChange}
      fullWidth
      required
      type="password"
    />
    <TextField
      label="Confirm Password"
      name="confirmPassword"
      value={newBroker.confirmPassword}
      onChange={handleChange}
      fullWidth
      required
      type="password"
    />
    <FormControl fullWidth required>
      <InputLabel>Gender</InputLabel>
      <Select
        name="gender"
        value={newBroker.gender}
        onChange={handleChange}
        label="Gender"
      >
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
        <MenuItem value="Other">Other</MenuItem>
      </Select>
    </FormControl>
    <TextField
      label="Date of Birth"
      name="birthday"
      value={newBroker.birthday}
      onChange={handleChange}
      fullWidth
      required
      type="date"
      InputLabelProps={{ shrink: true }}
    />
    <TextField
      label="Description"
      name="description"
      value={newBroker.description}
      onChange={handleChange}
      fullWidth
      multiline
      rows={3}
    />
    <TextField
      label="Address"
      name="address"
      value={newBroker.address}
      onChange={handleChange}
      fullWidth
      required
    />
    <TextField
      label="City"
      name="city"
      value={newBroker.city}
      onChange={handleChange}
      fullWidth
      required
    />

    <Button
      variant="contained"
      color="primary"
      onClick={handleSubmit}
      fullWidth
      sx={{ mt: 2 }}
    >
      {editBroker ? 'Update' : 'Add'}
    </Button>
  </Box>
</Modal>


      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, brokerId: null })}>
        <DialogTitle>Delete Broker</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this broker?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, brokerId: null })}>Cancel</Button>
          <Button color="error" onClick={() => handleDelete(confirmDelete.brokerId)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const TableWithBrokers = withTable(BrokerRows);

export default Brokers;
