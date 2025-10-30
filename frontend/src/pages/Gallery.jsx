// src/pages/Gallery.jsx - Public Gallery Page Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Gallery.css';

function Gallery({ user }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState({}); // Store comment text for each photo

  // Fetch all photos when component loads
  useEffect(() => {
    fetchAllPhotos();
  }, []);

  // Get all photos from database
  const fetchAllPhotos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/photos/all');
      setPhotos(response.data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle like/unlike button click
  const handleLike = async (photoId) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/photos/like/${photoId}`, {
        username: user
      });

      // Update local state with new likes
      setPhotos(photos.map(photo => 
        photo._id === photoId 
          ? { ...photo, likes: response.data.likes, likedBy: response.data.likedBy }
          : photo
      ));
    } catch (error) {
      console.error('Error liking photo:', error);
    }
  };

  // Handle comment submission
  const handleComment = async (photoId) => {
    const text = commentText[photoId];
    if (!text || text.trim() === '') return;

    try {
      const response = await axios.post(`http://localhost:5000/api/photos/comment/${photoId}`, {
        username: user,
        text: text
      });

      // Update local state with new comments
      setPhotos(photos.map(photo => 
        photo._id === photoId 
          ? { ...photo, comments: response.data.comments }
          : photo
      ));

      // Clear comment input
      setCommentText({ ...commentText, [photoId]: '' });
    } catch (error) {
      console.error('Error adding comment:', error);
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

  // Check if current user has liked this photo
  const isLikedByUser = (photo) => {
    return photo.likedBy && photo.likedBy.includes(user);
  };

  // Show loading message
  if (loading) {
    return <div className="loading">Loading gallery...</div>;
  }

  return (
    <div className="gallery-container">
      <h2>🖼️ Public Gallery</h2>
      
      {/* Show message if no photos */}
      {photos.length === 0 ? (
        <div className="no-photos">
          <p>No photos uploaded yet. Be the first to share!</p>
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
                <small className="photo-author">By: {photo.username}</small>
                
                {/* Like Button */}
                <div className="photo-actions">
                  <button 
                    className={`like-btn ${isLikedByUser(photo) ? 'liked' : ''}`}
                    onClick={() => handleLike(photo._id)}
                  >
                    {isLikedByUser(photo) ? '❤️' : '🤍'} {photo.likes}
                  </button>
                </div>

                {/* Comments Section */}
                <div className="comments-section">
                  <h4>💬 Comments ({photo.comments.length})</h4>
                  
                  {/* Display existing comments */}
                  <div className="comments-list">
                    {photo.comments.map((comment, index) => (
                      <div key={index} className="comment">
                        <strong>{comment.username}:</strong> {comment.text}
                      </div>
                    ))}
                  </div>
                  
                  {/* Add new comment */}
                  <div className="add-comment">
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={commentText[photo._id] || ''}
                      onChange={(e) => setCommentText({ 
                        ...commentText, 
                        [photo._id]: e.target.value 
                      })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleComment(photo._id);
                        }
                      }}
                    />
                    <button onClick={() => handleComment(photo._id)}>Post</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;