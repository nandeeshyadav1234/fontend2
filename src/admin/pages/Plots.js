import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Button, Modal, TextField, Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid component
import 'cropperjs/dist/cropper.css';
import { Editor } from '@tinymce/tinymce-react';
import FileUpload from '../../admin/components/imageUpload';

const apiUrl = process.env.REACT_APP_API_URL;

const PropertiesTable = () => {
  const [properties, setProperties] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    latitude: '',
    longitude: '',
    type: '',
    amount: '',
    city: '',
    postalCode: '',
    province: '',
    description: '',
    images: [],
    availability: '',
    contactNo: '',
    contactEmail: '',
    created_at: '',
    updated_at: '',
    nearestSchool: '',
    nearestRailway: '',
    nearestBusStop: '',
    size: '',
    tapWater: '',
    electricity: ''
  });

  const [images, setImages] = useState([]);
  const cropperRefs = useRef([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get(`${apiUrl}products`);
      console.log(response.data);
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const newImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push({
          src: reader.result,
          file: file,
        });
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (currentProperty) {
        await axios.put(`${apiUrl}properties/${currentProperty.id}`, formData, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setProperties((prevProperties) =>
          prevProperties.map((property) =>
            property.id === currentProperty.id ? { ...property, ...formData } : property
          )
        );
      } else {
        const response = await axios.post(`${apiUrl}properties`, formData, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        setProperties((prevProperties) => [...prevProperties, response.data]);
      }
      setOpen(false);
    } catch (error) {
      console.error("Error saving property", error);
    }
  };

  const handleOpen = (property = null) => {
    setCurrentProperty(property);
    setFormData(property || {
      user_id: '',
      name: '',
      latitude: '',
      longitude: '',
      type: '',
      amount: '',
      city: '',
      postalCode: '',
      province: '',
      description: '',
      images: [],
      availability: '',
      contactNo: '',
      contactEmail: '',
      created_at: '',
      updated_at: '',
      nearestSchool: '',
      nearestRailway: '',
      nearestBusStop: '',
      size: '',
      tapWater: '',
      electricity: ''
    });
    setImages([]);
    setOpen(true);
  };
  const handleView = (property) => {
    // Implement your view logic here, for example, open a modal or navigate to a different page
    console.log('Viewing property:', property);
  };
  const handleDelete = async (property) => {
    try {
      const userToken = localStorage.getItem('userToken');
      // Make an API call to delete the property
      await axios.delete(`${apiUrl}properties/${property.id}`, {
        headers: { Authorization: `Bearer ${userToken}` }
      });
      // After successful deletion, remove the property from the state
      setProperties((prevProperties) => prevProperties.filter(p => p.id !== property.id));
      console.log('Property deleted:', property);
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };
    
  const handleClose = () => {
    setOpen(false);
    setCurrentProperty(null);
    setImages([]);
  };

  // Columns for DataGrid
  const columns = [
    {
      field: 'fullname', 
      headerName: 'User Name', 
      width: 150,
      renderCell: (params) => {
        return params.row.userDetails ? params.row.userDetails.fullname : 'N/A';
      },
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'type', headerName: 'Type', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'postalCode', headerName: 'Postal Code', width: 150 },
    { field: 'description', headerName: 'Description', width: 150 },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      width: 150, 
      renderCell: (params) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton onClick={() => handleOpen(params.row)} color="primary" title="Edit">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleView(params.row)} color="default" title="View">
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)} color="secondary" title="Delete">
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];
  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Properties Table</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Add New Property
      </Button>

      {/* DataGrid for displaying properties */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={properties}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>

      {/* Add/Edit Property Modal */}
      <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 1000, // Increased modal width
          margin: 'auto',
          marginTop: '5%', // Reduced top margin
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6">{currentProperty ? 'Edit Property' : 'Add New Property'}</Typography>

        {/* Two-column layout */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Area Size" name="size" value={formData.size} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Type</InputLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <MenuItem value="plot">Plot</MenuItem>
                <MenuItem value="Land">Land</MenuItem>
                <MenuItem value="House">House</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Amount" name="amount" value={formData.amount} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="City" name="city" value={formData.city} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Nearest School" name="nearestSchool" value={formData.nearestSchool} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Nearest Bus Station" name="nearestBus" value={formData.nearestBus} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Electricity</InputLabel>
              <Select name="electricity" value={formData.electricity} onChange={handleChange}>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="2Phase">2 Phase</MenuItem>
                <MenuItem value="3Phase">3 Phase</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} sm={6}>
          <Editor
            apiKey="y9elyi0imttkilri2ygmcjsrrzjeck4fm3f10bds3qmynj04" // Replace with your actual API key
            value={formData.description}
            name="description"
            sx={{ marginBottom: 2 }}
            init={{
              height: 289,
              menubar: false,
              plugins: ['link', 'image', 'lists', 'code'],
              toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright | code',
            }}
            onEditorChange={handleEditorChange}
          />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Availability</InputLabel>
              <Select name="availability" value={formData.availability} onChange={handleChange}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Size" name="size" value={formData.size} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Nearest Hospital" name="nearestHospital" value={formData.nearestHospital} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Tap Water</InputLabel>
              <Select name="tapWater" value={formData.tapWater} onChange={handleChange}>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Negotiable</InputLabel>
            <Select name="negotiable" value={formData.negotiable} onChange={handleChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FileUpload
            onUpload={handleImageUpload}  // Handle multiple image uploads
            images={images}  // Pass images to the component for preview
          />
        </Grid>
        
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
          {currentProperty ? 'Update Property' : 'Add Property'}
        </Button>
      </Box>
    </Modal>
    </Box>
  );
};

export default PropertiesTable;
