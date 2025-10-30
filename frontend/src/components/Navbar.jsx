// src/components/Navbar.jsx - Navigation Bar Component
import React from 'react';
import '../styles/Navbar.css';

function Navbar({ currentPage, setCurrentPage, onLogout, user }) {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-brand">
        <h1>📸 SnapCraft</h1>
      </div>
      
      {/* Navigation Menu */}
      <div className="navbar-menu">
        <button 
          className={currentPage === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentPage('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={currentPage === 'upload' ? 'active' : ''}
          onClick={() => setCurrentPage('upload')}
        >
          Upload
        </button>
        <button 
          className={currentPage === 'myuploads' ? 'active' : ''}
          onClick={() => setCurrentPage('myuploads')}
        >
          My Uploads
        </button>
        <button 
          className={currentPage === 'gallery' ? 'active' : ''}
          onClick={() => setCurrentPage('gallery')}
        >
          Gallery
        </button>
      </div>
      
      {/* User Info Section */}
      <div className="navbar-user">
        <span>Welcome, {user}!</span>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;