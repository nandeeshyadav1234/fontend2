import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Chip, Button } from '@mui/material';

const products = [
  {
    id: 1,
    name: 'Product 1',
    image: '/images/properties-1.jpg',
    price: '$20.00',
    description: 'This is a longer description for Product 1 that will be trimmed.',
    status: 'Sale', 
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/images/properties-2.jpg',
    price: '$30.00',
    description: 'Short description for Product 2.',
    status: '',
  },
  {
    id: 3,
    name: 'Product 3',
    image: '/images/properties-3.jpg',
    price: '$25.00',
    description: 'Another longer description for Product 3 that will also be trimmed.',
    status: 'Sale',
  },
  {
    id: 4,
    name: 'Product 4',
    image: '/images/properties-4.jpg',
    price: '$40.00',
    description: 'This is a description for Product 4.',
    status: '',
  },
  {
    id: 1,
    name: 'Product 1',
    image: '/images/properties-1.jpg',
    price: '$20.00',
    description: 'This is a longer description for Product 1 that will be trimmed.',
    status: 'Sale', 
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/images/properties-2.jpg',
    price: '$30.00',
    description: 'Short description for Product 2.',
    status: '',
  },
  {
    id: 3,
    name: 'Product 3',
    image: '/images/properties-3.jpg',
    price: '$25.00',
    description: 'Another longer description for Product 3 that will also be trimmed.',
    status: 'Sale',
  },
  {
    id: 4,
    name: 'Product 4',
    image: '/images/properties-4.jpg',
    price: '$40.00',
    description: 'This is a description for Product 4.',
    status: '',
  },
  {
    id: 1,
    name: 'Product 1',
    image: '/images/properties-1.jpg',
    price: '$20.00',
    description: 'This is a longer description for Product 1 that will be trimmed.',
    status: 'Sale', 
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/images/properties-2.jpg',
    price: '$30.00',
    description: 'Short description for Product 2.',
    status: '',
  },
  {
    id: 3,
    name: 'Product 3',
    image: '/images/properties-3.jpg',
    price: '$25.00',
    description: 'Another longer description for Product 3 that will also be trimmed.',
    status: 'Sale',
  },
  {
    id: 4,
    name: 'Product 4',
    image: '/images/properties-4.jpg',
    price: '$40.00',
    description: 'This is a description for Product 4.',
    status: '',
  },
];

const ProductGrid = () => (
  <Grid container spacing={2}>
    {products.map((product) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
        <Card style={{ minHeight: '320px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {product.status && (
            <Chip
              label={product.status}
              color="secondary"
              style={{
                position: 'absolute',
                top: 10,  // Position it at the bottom
                left: 10,    // Position it on the left
                zIndex: 1,
              }}
            />
          )}
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt={product.name}
          />
          <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h6" component="div" style={{ color: '#26baee' }}>
                  {product.name}
                </Typography>
                <Typography variant="subtitle1" style={{ color: '#f05d23' }}>
                  {product.price}
                </Typography>
              </Grid>
              <Typography variant="body2" color="text.secondary" style={{ marginTop: '5px' }}>
                {product.description.length > 60
                  ? `${product.description.substring(0, 60)}...`
                  : product.description}
              </Typography>
            </div>
            <Button
              variant="contained"
              style={{ backgroundColor: '#26baee', color: '#fff', marginTop: '10px' }}
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

export default ProductGrid;
