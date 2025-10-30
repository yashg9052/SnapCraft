// src/pages/Dashboard.jsx - Dashboard Page Component
import React from 'react';
import '../styles/Dashboard.css';

function Dashboard({ setCurrentPage, user }) {
  return (
    <div className="dashboard-container">
      {/* Welcome Header */}
      <div className="dashboard-header">
        <h1>Welcome to SnapCraft, {user}! 🎉</h1>
        <p>Your personal photo sharing and editing platform</p>
      </div>

      {/* Quick Action Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => setCurrentPage('upload')}>
          <div className="card-icon">📤</div>
          <h3>Upload Photo</h3>
          <p>Share your moments with the world</p>
        </div>

        <div className="dashboard-card" onClick={() => setCurrentPage('myuploads')}>
          <div className="card-icon">📁</div>
          <h3>My Uploads</h3>
          <p>View all your uploaded photos</p>
        </div>

        <div className="dashboard-card" onClick={() => setCurrentPage('gallery')}>
          <div className="card-icon">🖼️</div>
          <h3>Public Gallery</h3>
          <p>Explore photos from everyone</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="dashboard-features">
        <h2>✨ Features</h2>
        <div className="features-grid">
          <div className="feature">
            <span>🎨</span>
            <p>Apply Filters</p>
          </div>
          <div className="feature">
            <span>❤️</span>
            <p>Like Photos</p>
          </div>
          <div className="feature">
            <span>💬</span>
            <p>Add Comments</p>
          </div>
          <div className="feature">
            <span>🌐</span>
            <p>Share Globally</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;