// src/App.jsx - Main Application Component
import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Upload from './pages/Upload';
import MyUploads from './pages/MyUploads';
import Gallery from './pages/Gallery';
import Navbar from './components/Navbar';
import './styles/App.css';

function App() {
  // State to track which page to show
  const [currentPage, setCurrentPage] = useState('login');
  // State to track logged-in user
  const [user, setUser] = useState(null);

  // Check if user is already logged in (when app loads)
  useEffect(() => {
    const loggedUser = localStorage.getItem('snapcraft_user');
    if (loggedUser) {
      setUser(loggedUser);
      setCurrentPage('dashboard');
    }
  }, []);

  // Handle successful login
  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('snapcraft_user', username); // Remember user
    setCurrentPage('dashboard');
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('snapcraft_user'); // Forget user
    setCurrentPage('login');
  };

  return (
    <div className="App">
      {/* Show navbar only when user is logged in */}
      {user && (
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          onLogout={handleLogout} 
          user={user} 
        />
      )}
      
      {/* Show different pages based on currentPage state */}
      {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} onLogin={handleLogin} />}
      {currentPage === 'signup' && <Signup setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} user={user} />}
      {currentPage === 'upload' && <Upload user={user} setCurrentPage={setCurrentPage} />}
      {currentPage === 'myuploads' && <MyUploads user={user} />}
      {currentPage === 'gallery' && <Gallery user={user} />}
    </div>
  );
}

export default App;