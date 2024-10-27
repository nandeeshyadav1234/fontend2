
   // src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./HomeCarousel.css"; // Import custom CSS for the component
import HomeSliderAndSearch from './HomeSlider';
import RecommendedProperties from './RecommendedProperties';
import Blog from './Blog';
import Newsletter from './Newsletter';
const Welcome = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = `${apiUrl}auth/signin`;
      // Send email and password to the API
      const response = await axios.post(endpoint, { email, password });
      const { token } = response.data;
      console.log(response);

      // Store the token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to a protected route after successful login
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };
  const properties = [
    {
      image: 'images/properties-1.jpg',
      status: 'Sale',
      title: 'North Parchmore Street',
      type: 'Apartment',
      price: '$20,000',
      description: 'Far far away, behind the word mountains, far from the countries.',
      sqft: '250sqft',
      bathrooms: 3,
      bedrooms: 4,
    },
    {
      image: 'images/properties-2.jpg',
      status: 'Sale',
      title: 'North Parchmore Street',
      type: 'Apartment',
      price: '$20,000',
      description: 'Far far away, behind the word mountains, far from the countries.',
      sqft: '250sqft',
      bathrooms: 3,
      bedrooms: 4,
    },
    {
      image: 'images/properties-3.jpg',
      status: 'Rent',
      title: 'North Parchmore Street',
      type: 'Apartment',
      price: '$800 <small>/ month</small>',
      description: 'Far far away, behind the word mountains, far from the countries.',
      sqft: '250sqft',
      bathrooms: 3,
      bedrooms: 4,
    },
    {
      image: 'images/properties-4.jpg',
      status: 'Sale',
      title: 'North Parchmore Street',
      type: 'Apartment',
      price: '$20,000',
      description: 'Far far away, behind the word mountains, far from the countries.',
      sqft: '250sqft',
      bathrooms: 3,
      bedrooms: 4,
    },
  ];
  return (
    <>
    <HomeSliderAndSearch />
    <RecommendedProperties properties={properties} />
    <Blog /> 
    </>
  );
};

export default Welcome;