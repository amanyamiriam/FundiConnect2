import React, { useState } from 'react';

function FundiRegistrationForm() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [primarySkill, setPrimarySkill] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const [locationCounty, setLocationCounty] = useState('');
  const [locationArea, setLocationArea] = useState('');
  const [password, setPassword] = useState('');
  const [idPhoto, setIdPhoto] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const skills = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Welding', 'Gardening'];
  const counties = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']; // Example counties

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log({
      fullName,
      phoneNumber,
      email,
      nationalId,
      primarySkill,
      yearsOfExperience,
      locationCounty,
      locationArea,
      password,
      idPhoto,
    });
    setSubmissionMessage('Your application is under review. Our team will contact you within 24 hours.');
    // Clear form fields after submission
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setNationalId('');
    setPrimarySkill('');
    setYearsOfExperience('');
    setLocationCounty('');
    setLocationArea('');
    setPassword('');
    setIdPhoto(null);
  };

  return (
    <div className="registration-form-wrapper">
      <h3>Fundi Registration</h3>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="nationalId">National ID</label>
          <input
            type="text"
            id="nationalId"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="primarySkill">Primary Skill</label>
          <select
            id="primarySkill"
            value={primarySkill}
            onChange={(e) => setPrimarySkill(e.target.value)}
            required
          >
            <option value="">Select a skill</option>
            {skills.map((skill) => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="yearsOfExperience">Years of Experience</label>
          <input
            type="number"
            id="yearsOfExperience"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="locationCounty">Location (County)</label>
          <select
            id="locationCounty"
            value={locationCounty}
            onChange={(e) => setLocationCounty(e.target.value)}
            required
          >
            <option value="">Select County</option>
            {counties.map((county) => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="locationArea">Location (Area)</label>
          <input
            type="text"
            id="locationArea"
            value={locationArea}
            onChange={(e) => setLocationArea(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="idPhoto">Upload ID Photo (optional)</label>
          <input
            type="file"
            id="idPhoto"
            onChange={(e) => setIdPhoto(e.target.files[0])}
          />
        </div>
        <button type="submit" className="submit-button">Submit Application</button>
      </form>
      {submissionMessage && <p className="success-message">{submissionMessage}</p>}
    </div>
  );
}

export default FundiRegistrationForm;