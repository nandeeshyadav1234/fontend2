import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../admin/components/uploadImage.css';

const apiUrl = process.env.REACT_APP_API_URL;

const ImageUpload = ({ formData }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load initial images from formData if available
    const initialImages = Array.isArray(formData.images) ? formData.images : JSON.parse(formData.images || "[]");
    setPreviewUrls(initialImages);
  }, [formData.images]);

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Preview URLs for new files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prev) => [...prev, ...newPreviews]);

    await uploadImages(files); // Automatically upload new images
  };

  const uploadImages = async (images) => {
    if (images.length === 0) return;

    const uploadData = new FormData();
    images.forEach((image) => {
      if (image instanceof File) {
        uploadData.append('images', image);
      }
    });

    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}products/upload`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Append the newly uploaded image URLs to formData.images
      const uploadedImageUrls = response.data.imageUrls || [];
      formData.images = [...(formData.images || []), ...uploadedImageUrls];

      // Update preview URLs and reset selected files
      setPreviewUrls((prev) => [...prev, ...uploadedImageUrls]);
      setSelectedFiles([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = async (index) => {
    // Remove the image from previewUrls
    const updatedPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(updatedPreviews);

    // Update the images array in formData and backend
    formData.images = updatedPreviews;
    await updateBackendImages(updatedPreviews);
  };

  const updateBackendImages = async (currentImages) => {
    setIsLoading(true);
    try {
      await axios.post(`${apiUrl}products/updateImages`, { images: currentImages }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error updating images on backend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
        multiple
        className="file-input"
      />
      <div className="image-preview-container">
        {previewUrls.map((url, index) => (
          <div key={index} className="image-preview">
            <img src={url} alt={`Preview ${index}`} className="preview-image" />
            <button className="remove-btn" onClick={() => handleRemoveImage(index)}>
              X {/* Replace with an icon if desired */}
            </button>
          </div>
        ))}
      </div>
      {isLoading && <p>Uploading...</p>}
    </div>
  );
};

export default ImageUpload;
