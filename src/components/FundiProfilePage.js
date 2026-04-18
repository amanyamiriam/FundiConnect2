import React, { useState } from 'react';
import './FundiProfilePage.css';

function FundiProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [fundiData, setFundiData] = useState({
    fullName: 'Jane Fundi',
    email: 'jane.fundi@example.com',
    phoneNumber: '+254 712 345678',
    location: 'Nairobi, Kenya',
    primarySkill: 'Plumbing',
    experience: '5',
    bio: 'Experienced plumber with a passion for fixing leaks and installing new fixtures.',
    // Add more fundi-specific fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFundiData({ ...fundiData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log('Fundi Profile Updated:', fundiData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="fundi-profile-container">
      <h1>Fundi Profile</h1>
      <div className="profile-card">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={fundiData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={fundiData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={fundiData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={fundiData.location}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="primarySkill">Primary Skill:</label>
              <input
                type="text"
                id="primarySkill"
                name="primarySkill"
                value={fundiData.primarySkill}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="experience">Years of Experience:</label>
              <input
                type="number"
                id="experience"
                name="experience"
                value={fundiData.experience}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={fundiData.bio}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>
            {/* Add more editable fields here */}
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Full Name:</strong> {fundiData.fullName}</p>
            <p><strong>Email:</strong> {fundiData.email}</p>
            <p><strong>Phone Number:</strong> {fundiData.phoneNumber}</p>
            <p><strong>Location:</strong> {fundiData.location}</p>
            <p><strong>Primary Skill:</strong> {fundiData.primarySkill}</p>
            <p><strong>Experience:</strong> {fundiData.experience} years</p>
            <p><strong>Bio:</strong> {fundiData.bio}</p>
            {/* Display more fields here */}
            <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FundiProfilePage;