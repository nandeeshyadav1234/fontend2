import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Chip, Button } from '@mui/material';
import axios from 'axios';

const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + '...'; // Add ellipsis if truncated
  }
  return description;
};
const removeHtmlTags = (htmlString) => {
    return htmlString.replace(/<[^>]*>/g, ''); // Remove all HTML tags
  };
const ProductGrid = () => {
  const [properties, setProperties] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const imageURL = process.env.REACT_APP_IMAGE_PROPERTY_URL;


  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${apiUrl}products`);
        console.log(response.data);
        setProperties(response.data); // Assuming the API response has the properties array
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [apiUrl]); // Dependency array includes apiUrl

  return (
    <Grid container spacing={2}>
      {properties.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <Card style={{ minHeight: '320px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {(
              <Chip
                label={product.status??'Sale'}
                color="secondary"
                style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  zIndex: 1,
                }}
              />
            )}
            <CardMedia
              component="img"
              height="140"
              image={product.images && imageURL+ JSON.parse(product.images)[0]}
              alt={product.name}
            />
            <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant="h6" component="div" style={{ color: '#26baee' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: '#f05d23' }}>
                  Rs.{product.amount} /Sq.ft
                  </Typography>
                </Grid>
                <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                {removeHtmlTags(truncateDescription(removeHtmlTags(product.description), 100))}
                </Typography>
              </div>
              <Button
                variant="contained"
                style={{ backgroundColor: '#ff8f56', color: '#fff', marginTop: '10px' }}
                onClick={() => alert(`More details about ${product.name}`)}
              >
                Details
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
