import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ userType = 'client' }) { // userType can be 'client' or 'fundi'
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: userType === 'fundi' ? 'Jane Fundi' : 'John Doe',
    email: userType === 'fundi' ? 'jane.fundi@example.com' : 'john.doe@example.com',
    phoneNumber: '+254 712 345678',
    location: 'Nairobi, Kenya',
    bio: userType === 'fundi' ? 'Experienced professional with a passion for quality work.' : 'Looking for reliable skilled workers.',
    profilePicture: null,
    ...(userType === 'fundi' && {
      primarySkill: 'Plumbing',
      experience: '5',
      rating: 4.5,
      completedJobs: 25,
    }),
    ...(userType === 'client' && {
      preferredServices: ['Plumbing', 'Electrical'],
      totalProjects: 10,
    }),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ ...profileData, profilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile Updated:', profileData);
    alert('Profile updated successfully!');
    setIsEditing(false);
  };

  return (
    <div className="user-profile-container">
      <h1>{userType === 'fundi' ? 'Fundi Profile' : 'Client Profile'}</h1>
      <div className="profile-header">
        <div className="profile-picture-section">
          {profileData.profilePicture ? (
            <img src={profileData.profilePicture} alt="Profile" className="profile-picture" />
          ) : (
            <div className="profile-picture-placeholder">
              <i className="fas fa-user"></i>
            </div>
          )}
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
          )}
        </div>
        <div className="profile-info">
          <h2>{profileData.fullName}</h2>
          <p className="location"><i className="fas fa-map-marker-alt"></i> {profileData.location}</p>
          {userType === 'fundi' && (
            <div className="fundi-stats">
              <span className="rating"><i className="fas fa-star"></i> {profileData.rating}</span>
              <span className="jobs">Jobs: {profileData.completedJobs}</span>
            </div>
          )}
        </div>
      </div>

      <div className="profile-content">
        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Phone:</strong> {profileData.phoneNumber}</p>
              <p><strong>Location:</strong> {profileData.location}</p>
            </div>

            <div className="profile-section">
              <h3>About</h3>
              <p>{profileData.bio}</p>
            </div>

            {userType === 'fundi' && (
              <div className="profile-section">
                <h3>Professional Information</h3>
                <p><strong>Primary Skill:</strong> {profileData.primarySkill}</p>
                <p><strong>Years of Experience:</strong> {profileData.experience}</p>
              </div>
            )}

            {userType === 'client' && (
              <div className="profile-section">
                <h3>Preferences</h3>
                <p><strong>Preferred Services:</strong> {profileData.preferredServices.join(', ')}</p>
                <p><strong>Total Projects:</strong> {profileData.totalProjects}</p>
              </div>
            )}

            <button onClick={() => setIsEditing(true)} className="edit-button">
              <i className="fas fa-edit"></i> Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={profileData.fullName}
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
                  value={profileData.email}
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
                  value={profileData.phoneNumber}
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
                  value={profileData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio:</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            {userType === 'fundi' && (
              <div className="form-section">
                <h3>Professional Information</h3>
                <div className="form-group">
                  <label htmlFor="primarySkill">Primary Skill:</label>
                  <select
                    id="primarySkill"
                    name="primarySkill"
                    value={profileData.primarySkill}
                    onChange={handleChange}
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="Welding">Welding</option>
                    <option value="Gardening">Gardening</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="experience">Years of Experience:</label>
                  <input
                    type="number"
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
              </div>
            )}

            {userType === 'client' && (
              <div className="form-section">
                <h3>Preferences</h3>
                <div className="form-group">
                  <label htmlFor="preferredServices">Preferred Services:</label>
                  <select
                    id="preferredServices"
                    name="preferredServices"
                    value={profileData.preferredServices}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      preferredServices: Array.from(e.target.selectedOptions, option => option.value)
                    })}
                    multiple
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="Welding">Welding</option>
                    <option value="Gardening">Gardening</option>
                  </select>
                </div>
              </div>
            )}

            <div className="form-actions">
              <button type="submit" className="save-button">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;