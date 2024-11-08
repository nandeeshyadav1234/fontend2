// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import propertiesReducer from '../src/features/properties/propertiesSlice';

export const store = configureStore({
  reducer: {
    properties: propertiesReducer,
  },
});

export default store;
