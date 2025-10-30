// src/pages/Login.jsx - Login Page Component
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

function Login({ setCurrentPage, onLogin }) {
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setLoading(true);

    try {
      // Send login request to backend
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });

      alert(response.data.message);
      onLogin(username); // Call parent function to set user
    } catch (err) {
      // Show error message
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>📸 Login to SnapCraft</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>
          
          {/* Password Input */}
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          
          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}
          
          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* Link to Signup Page */}
        <p className="switch-page">
          Don't have an account? 
          <span onClick={() => setCurrentPage('signup')}> Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;