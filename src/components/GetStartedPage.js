

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetStartedPage.css';
import logo from '../logo.svg';

function GetStartedPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Client Registration Form Data:', {
      fullName,
      phoneNumber,
      location,
      password,
    });
    // Simulate successful registration
    alert('Registration successful! Redirecting to Client Platform.');
    navigate('/client-platform');
  };

  return (
    <div className="get-started-page-container">
      <div className="registration-card">
        <img src={logo} alt="FundiHub Logo" className="logo" />
        <h1>Get Started</h1>
        <p className="subtitle">Sign up to find trusted skilled workers near you.</p>

        <div className="illustration-placeholder">
          {/* Worker illustration will go here */}
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">
              <i className="fas fa-user"></i> Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group phone-input-group">
            <label htmlFor="phoneNumber">
              <i className="fas fa-phone"></i> Phone Number
            </label>
            <div className="phone-input-wrapper">
              <span className="country-code">+254</span>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="712 345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              <i className="fas fa-map-marker-alt"></i> Location
            </label>
            <input
              type="text"
              id="location"
              placeholder="Choose your area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <i className="fas fa-chevron-right location-arrow"></i>
          </div>

          <div className="form-group password-input-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i> Create Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <button type="submit" className="sign-up-button">Sign Up</button>
        </form>

        <p className="terms-text">
          By signing up, you agree to our <a href="/terms">Terms & Conditions</a>.
        </p>

        <p className="sign-in-text">
          Already have an account? <a href="/auth">Sign In</a>
        </p>
      </div>
    </div>
  );
}

export default GetStartedPage;