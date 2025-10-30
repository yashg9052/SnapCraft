// src/pages/Signup.jsx - Signup Page Component
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

function Signup({ setCurrentPage }) {
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      // Send signup request to backend
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        password
      });

      alert(response.data.message);
      setCurrentPage('login'); // Redirect to login page
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>📸 Sign Up for SnapCraft</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Choose a username"
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
              placeholder="Choose a password"
            />
          </div>
          
          {/* Confirm Password Input */}
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm your password"
            />
          </div>
          
          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}
          
          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        {/* Link to Login Page */}
        <p className="switch-page">
          Already have an account? 
          <span onClick={() => setCurrentPage('login')}> Login</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;