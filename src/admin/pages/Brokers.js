// src/admin/pages/Brokers.js
import React, { useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
} from '@mui/material';

const initialBrokers = [
  { id: 1, name: 'Broker A', email: 'brokera@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Broker B', email: 'brokerb@example.com', phone: '987-654-3210' },
];

const Brokers = () => {
  const [brokers, setBrokers] = useState(initialBrokers);
  const [open, setOpen] = useState(false);
  const [editBroker, setEditBroker] = useState(null);
  const [newBroker, setNewBroker] = useState({ name: '', email: '', phone: '' });

  const handleOpen = (broker) => {
    if (broker) {
      setEditBroker(broker);
      setNewBroker(broker);
    } else {
      setEditBroker(null);
      setNewBroker({ name: '', email: '', phone: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBroker((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (editBroker) {
      // Update existing broker
      setBrokers((prev) =>
        prev.map((broker) => (broker.id === editBroker.id ? { ...newBroker, id: broker.id } : broker))
      );
    } else {
      // Create new broker
      setBrokers((prev) => [...prev, { ...newBroker, id: prev.length + 1 }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setBrokers((prev) => prev.filter((broker) => broker.id !== id));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Brokers Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add New Broker
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brokers.map((broker) => (
              <TableRow key={broker.id}>
                <TableCell>{broker.id}</TableCell>
                <TableCell>{broker.name}</TableCell>
                <TableCell>{broker.email}</TableCell>
                <TableCell>{broker.phone}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleOpen(broker)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(broker.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Adding/Editing Broker */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editBroker ? 'Edit Broker' : 'Add New Broker'}
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={newBroker.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={newBroker.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={newBroker.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleSubmit}>
            {editBroker ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Brokers;
