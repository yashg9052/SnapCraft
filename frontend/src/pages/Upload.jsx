// src/pages/Upload.jsx - Upload Photo Page Component
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Upload.css';

function Upload({ user, setCurrentPage }) {
  // Form state
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!image) {
      setError('Please select an image');
      return;
    }

    setLoading(true);

    // Create FormData to send file
    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('caption', caption);
    formData.append('username', user);
    formData.append('filter', filter);

    try {
      // Send upload request
      const response = await axios.post('http://localhost:5000/api/photos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      alert(response.data.message);
      
      // Reset form
      setTitle('');
      setCaption('');
      setImage(null);
      setPreview(null);
      setFilter('none');
      
      // Redirect to My Uploads page
      setCurrentPage('myuploads');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  // Get CSS filter style based on selected filter
  const getFilterStyle = () => {
    switch(filter) {
      case 'grayscale':
        return { filter: 'grayscale(100%)' };
      case 'brightness':
        return { filter: 'brightness(1.3)' };
      case 'blur':
        return { filter: 'blur(2px)' };
      default:
        return {};
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-box">
        <h2>📤 Upload Your Photo</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="form-group">
            <label>Photo Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Give your photo a title"
            />
          </div>

          {/* Caption Input */}
          <div className="form-group">
            <label>Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              required
              placeholder="Write a caption for your photo"
              rows="3"
            />
          </div>

          {/* File Input */}
          <div className="form-group">
            <label>Choose Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          {/* Image Preview with Filter */}
          {preview && (
            <div className="preview-section">
              <h3>Preview with Filter:</h3>
              <img src={preview} alt="Preview" style={getFilterStyle()} />
            </div>
          )}

          {/* Filter Selection */}
          <div className="form-group">
            <label>Apply Filter</label>
            <div className="filter-buttons">
              <button 
                type="button"
                className={filter === 'none' ? 'active' : ''}
                onClick={() => setFilter('none')}
              >
                None
              </button>
              <button 
                type="button"
                className={filter === 'grayscale' ? 'active' : ''}
                onClick={() => setFilter('grayscale')}
              >
                Grayscale
              </button>
              <button 
                type="button"
                className={filter === 'brightness' ? 'active' : ''}
                onClick={() => setFilter('brightness')}
              >
                Brightness
              </button>
              <button 
                type="button"
                className={filter === 'blur' ? 'active' : ''}
                onClick={() => setFilter('blur')}
              >
                Blur
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Photo'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;