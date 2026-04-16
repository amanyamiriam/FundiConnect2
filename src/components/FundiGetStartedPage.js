import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FundiGetStartedPage.css';
import logo from '../logo.svg'; // Assuming you have a logo in src

function FundiGetStartedPage() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [idPhoto, setIdPhoto] = useState(null); // For file upload
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const availableSkills = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Welding', 'Gardening', 'Masonry', 'Tiling'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Fundi Registration Form Data:', {
      fullName,
      phoneNumber,
      email,
      primarySkill,
      experience,
      location,
      idPhoto: idPhoto ? idPhoto.name : 'No file uploaded',
      password,
    });
    // Simulate successful registration
    alert('Fundi registration successful! Redirecting to Fundi Platform.');
    navigate('/fundi-platform');
  };

  return (
    <div className="fundi-get-started-page-container">
      <div className="fundi-registration-layout">
        <div className="registration-form-section">
          <img src={logo} alt="FundiHub Logo" className="logo" />
          <h1>Join FundiHub as a Fundi</h1>
          <p className="subtitle">Register as a skilled worker and start receiving jobs near you.</p>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <i className="fas fa-user"></i>
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
              <label htmlFor="phoneNumber">Phone Number</label>
              <i className="fas fa-phone"></i>
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
              <label htmlFor="email">Email</label>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="National ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="primarySkill">Primary Skill</label>
              <i className="fas fa-wrench"></i>
              <select
                id="primarySkill"
                value={primarySkill}
                onChange={(e) => setPrimarySkill(e.target.value)}
                required
              >
                <option value="">Select Primary Skill</option>
                {availableSkills.map((skill) => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="experience">Years of Experience</label>
              <i className="fas fa-briefcase"></i>
              <input
                type="number"
                id="experience"
                placeholder="e.g., 5"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <i className="fas fa-map-marker-alt"></i>
              <input
                type="text"
                id="location"
                placeholder="County + Area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <i className="fas fa-chevron-right location-arrow"></i>
            </div>

            <div className="form-group file-upload-group">
              <label htmlFor="idPhoto">Upload ID Photo (optional)</label>
              <i className="fas fa-camera"></i>
              <input
                type="file"
                id="idPhoto"
                onChange={(e) => setIdPhoto(e.target.files[0])}
              />
              <span className="file-name">{idPhoto ? idPhoto.name : 'No file chosen'}</span>
            </div>

            <div className="form-group password-input-group">
              <label htmlFor="password">Create Password</label>
              <i className="fas fa-lock"></i>
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

            <button type="submit" className="submit-application-button">Submit Application</button>
          </form>

          <p className="application-review-text">
            We will review your application and contact you within 24 hours.
          </p>

          <p className="sign-in-text">
            Already registered? <a href="/auth">Sign In</a>
          </p>
        </div>

        <div className="benefits-section">
          <div className="benefits-list">
            <p><i className="fas fa-check-circle"></i> Create Your Profile</p>
            <p><i className="fas fa-check-circle"></i> Receive Job Requests</p>
            <p><i className="fas fa-check-circle"></i> Get Paid via M-PESA</p>
          </div>
          <div className="illustration-placeholder">
            {/* Fundi illustration will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundiGetStartedPage;