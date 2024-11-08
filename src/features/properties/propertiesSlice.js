// src/features/properties/propertiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

// Fetch all properties
export const fetchProperties = createAsyncThunk('properties/fetchProperties', async () => {
  const response = await axios.get(`${apiUrl}products`);
  return response.data;
});

// Add a new property
export const addProperty = createAsyncThunk('properties/addProperty', async (propertyData, { getState }) => {
  const userToken = localStorage.getItem('token');
  const userDetails = localStorage.getItem('user');
  console.log(JSON.parse(userDetails));
  const response = await axios.post(`${apiUrl}products`, propertyData, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  return response.data;
});

// Update a property
export const updateProperty = createAsyncThunk('properties/updateProperty', async ({ id, updatedData }) => {
  const userToken = localStorage.getItem('userToken');
  const response = await axios.put(`${apiUrl}products/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  return response.data;
});

// Delete a property
export const deleteProperty = createAsyncThunk('properties/deleteProperty', async (id) => {
  const userToken = localStorage.getItem('userToken');
  await axios.delete(`${apiUrl}products/${id}`, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  return id;
});

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        const index = state.items.findIndex((property) => property.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.items = state.items.filter((property) => property.id !== action.payload);
      });
  },
});

export default propertiesSlice.reducer;
