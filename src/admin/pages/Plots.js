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
import ImageUpload from '../../admin/components/imageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, addProperty, updateProperty, deleteProperty } from '../../features/properties/propertiesSlice';

const apiUrl = process.env.REACT_APP_API_URL;

const PropertiesTable = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.items);
  const propertiesStatus = useSelector((state) => state.properties.status);
  const [open, setOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);

  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    latitude: '',
    landDetails: {
      nearestSchool: '',
      nearestBusStop: '',
      nearestRailway: '',
      nearestHospital: '',
    },
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

  const handleEditorChange = (content) => {
    setFormData((prevData) => ({
      ...prevData,
      description: content,
    }));
  };
  useEffect(() => {
    if (propertiesStatus === 'idle') {
      dispatch(fetchProperties());
    }
  }, [propertiesStatus, dispatch]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = async () => {
    if (currentProperty) {
      dispatch(updateProperty({ id: currentProperty.id, updatedData: formData }));
    } else {
      dispatch(addProperty(formData));
    }
    setOpen(false);
  };

  const handleOpen = (property = null) => {
    setCurrentProperty(property);
    setFormData(property || {
      user_id: '',
      name: '',
      latitude: '',
      longitude: '',
      landDetails: {
        nearestSchool: '',
      },
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
  const handleDelete = (property) => {
    dispatch(deleteProperty(property.id));
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
{console.log(formData)}
        {/* Two-column layout */}
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
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
            <TextField label="Nearest School" name="nearestSchool" value={formData.landDetails.nearestSchool} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Nearest Bus Station" name="nearestBus" value={formData.landDetails.nearestBusStop} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Nearest Railway Station" name="nearestRailway" value={formData.landDetails.nearestRailway} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Electricity</InputLabel>
              <Select name="electricity" value={formData.landDetails.electricity} onChange={handleChange}>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="2 Phase">2 Phase</MenuItem>
                <MenuItem value="3 Phase">3 Phase</MenuItem>
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
                <MenuItem value="Available">Yes</MenuItem>
                <MenuItem value="Not Available">No</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Size" name="size" value={formData.landDetails.size} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />
            <TextField label="Nearest Hospital" name="nearestHospital" value={formData.landDetails.nearestHospital} onChange={handleChange} fullWidth sx={{ marginBottom: 2 }} />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Tap Water</InputLabel>
              <Select name="tapWater" value={formData.landDetails.tapwater} onChange={handleChange}>
                <MenuItem value="Available">Yes</MenuItem>
                <MenuItem value="Not Available">No</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Negotiable</InputLabel>
            <Select name="negotiable" value={formData.landDetails.negotiable} onChange={handleChange}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
            </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <ImageUpload formData={formData} />
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
