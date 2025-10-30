// src/pages/MyUploads.jsx - My Uploads Page Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Gallery.css';

function MyUploads({ user }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's photos when component loads
  useEffect(() => {
    fetchMyPhotos();
  }, []);

  // Get photos uploaded by current user
  const fetchMyPhotos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/photos/user/${user}`);
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply CSS filter based on photo's filter type
  const getFilterStyle = (filterType) => {
    switch(filterType) {
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

  // Show loading message
  if (loading) {
    return <div className="loading">Loading your photos...</div>;
  }

  return (
    <div className="gallery-container">
      <h2>📁 My Uploads</h2>
      
      {/* Show message if no photos */}
      {photos.length === 0 ? (
        <div className="no-photos">
          <p>You haven't uploaded any photos yet!</p>
        </div>
      ) : (
        <div className="photos-grid">
          {/* Display each photo */}
          {photos.map((photo) => (
            <div key={photo._id} className="photo-card">
              <img 
                src={`http://localhost:5000/uploads/${photo.imageUrl}`} 
                alt={photo.title}
                style={getFilterStyle(photo.filter)}
              />
              <div className="photo-info">
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
                <div className="photo-stats">
                  <span>❤️ {photo.likes} likes</span>
                  <span>💬 {photo.comments.length} comments</span>
                </div>
                <small>Uploaded on {new Date(photo.createdAt).toLocaleDateString()}</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyUploads;