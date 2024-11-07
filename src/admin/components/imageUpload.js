import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';

const ImageUpload = () => {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to array
    const resizedImages = [];

    files.forEach((file) => {
      Resizer.imageFileResizer(
        file,
        600,  // New width
        600,  // New height
        'JPEG', // Output format
        100,    // Quality (0-100)
        0,     // Rotation (optional)
        (uri) => {
          resizedImages.push(uri); // Add resized image to array
          if (resizedImages.length === files.length) {
            setImages(resizedImages); // Set all resized images once done
          }
        },
        'base64' // Output type (you can use 'base64', 'blob', or 'file')
      );
    });
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Resized Image ${index + 1}`} style={{ width: '100px', height: 'auto', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
