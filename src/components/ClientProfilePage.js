import React, { useState } from 'react';
import './ClientProfilePage.css';

function ClientProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [clientData, setClientData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+254 712 345678',
    location: 'Nairobi, Kenya',
    // Add more client-specific fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to a backend API
    console.log('Client Profile Updated:', clientData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="client-profile-container">
      <h1>Client Profile</h1>
      <div className="profile-card">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name:</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={clientData.fullName}
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
                value={clientData.email}
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
                value={clientData.phoneNumber}
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
                value={clientData.location}
                onChange={handleChange}
                required
              />
            </div>
            {/* Add more editable fields here */}
            <button type="submit" className="save-button">Save Changes</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="profile-details">
            <p><strong>Full Name:</strong> {clientData.fullName}</p>
            <p><strong>Email:</strong> {clientData.email}</p>
            <p><strong>Phone Number:</strong> {clientData.phoneNumber}</p>
            <p><strong>Location:</strong> {clientData.location}</p>
            {/* Display more fields here */}
            <button type="button" className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientProfilePage;