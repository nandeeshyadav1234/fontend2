// src/components/ProductCarousel.js
import React from 'react';
import Slider from 'react-slick';

// Truncate function to limit description length
const truncateDescription = (description, maxLength) => {
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + '...'; // Add ellipsis if truncated
  }
  return description;
};
const removeHtmlTags = (htmlString) => {
    return htmlString.replace(/<[^>]*>/g, ''); // Remove all HTML tags
  };
const imageURL = process.env.REACT_APP_IMAGE_PROPERTY_URL;
const ProductCarousel = ({ products }) => { // Destructure products from props
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
              {<span className="status">Sale</span>} {/* Sale status */}
            </div>
            <img
              src={product.images && imageURL+ JSON.parse(product.images)[0]}
              alt={product.name}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} // Maintain aspect ratio
            />
            <div className="product-info">
              <h3 className="product-name">{truncateDescription(product.name, 25)}</h3>
              <p className="price">Rs.{product.amount} /Sq.ft</p>
            </div>
            <p className="description">{removeHtmlTags(truncateDescription(removeHtmlTags(product.description), 50))}</p> {/* Trimmed description */}
            <button className="details-button">View Details</button> {/* Details button */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
