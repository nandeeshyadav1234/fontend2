// src/pages/Welcome.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HomeSliderAndSearch from './HomeSlider';
import ProductCarousel from './RecommendedProperties';
import Blog from './Blog';
import Newsletter from './Newsletter';
import "./HomeCarousel.css"; // Import custom CSS for the component
const Welcome = () => {
  const [properties, setProperties] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(apiUrl+'products');
        console.log(response.data);
        setProperties(response.data); // Assuming the API response has the properties array
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <HomeSliderAndSearch />
      <ProductCarousel products={properties} />
      <Blog />
      <Newsletter />
    </>
  );
};

export default Welcome;
