// src/components/ProductCarousel.js
import React from 'react';
import Slider from 'react-slick';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Product 1',
    image: '/images/properties-1.jpg',
    price: '$20.00',
    description: 'This is a longer description for Product 1 that will be trimmed.',
    status: 'Sale', // Added status
  },
  {
    id: 2,
    name: 'Product 2',
    image: '/images/properties-2.jpg',
    price: '$30.00',
    description: 'Short description for Product 2.',
    status: 'Sale', // No status
  },
  {
    id: 3,
    name: 'Product 3',
    image: '/images/properties-3.jpg',
    price: '$25.00',
    description: 'Another longer description for Product 3 that will also be trimmed.',
    status: 'Sale', // Added status
  },
  {
    id: 4,
    name: 'Product 4',
    image: '/images/properties-4.jpg',
    price: '$40.00',
    description: 'This is a description for Product 4.',
    status: 'Sale', // No status
  },
];

// Truncate function to limit description length
const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + '...'; // Add ellipsis if truncated
  }
  return description;
};

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,  // Number of items to show at once
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="product-carousel">
      <h2 className="text-center">Featured Products</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <div className="status-box">
              {product.status && <span className="status">{product.status}</span>} {/* Sale status */}
            </div>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Maintain aspect ratio
            />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="price">{product.price}</p>
            </div>
            <p className="description">{truncateDescription(product.description, 50)}</p> {/* Trimmed description */}
            <button className="details-button">View Details</button> {/* Details button */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
