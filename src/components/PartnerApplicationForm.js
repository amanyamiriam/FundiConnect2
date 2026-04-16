import React, { useState } from 'react';

function PartnerApplicationForm() {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [partnershipType, setPartnershipType] = useState('');
  const [message, setMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const partnershipOptions = ['Corporate Partnership', 'Property Management', 'Enterprise Service Contract', 'Other'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log({
      companyName,
      contactPerson,
      email,
      phoneNumber,
      partnershipType,
      message,
    });
    setSubmissionMessage('Your partnership application has been submitted. We will review it and get back to you shortly!');
    // Clear form fields
    setCompanyName('');
    setContactPerson('');
    setEmail('');
    setPhoneNumber('');
    setPartnershipType('');
    setMessage('');
  };

  return (
    <div className="registration-form-wrapper">
      <h3>Partner Application</h3>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="partnerEmail">Email</label>
          <input
            type="email"
            id="partnerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="partnerPhoneNumber">Phone Number</label>
          <input
            type="tel"
            id="partnerPhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="partnershipType">Type of Partnership</label>
          <select
            id="partnershipType"
            value={partnershipType}
            onChange={(e) => setPartnershipType(e.target.value)}
            required
          >
            <option value="">Select type</option>
            {partnershipOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="partnerMessage">Message (Optional)</label>
          <textarea
            id="partnerMessage"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us more about your interest in partnering with FundiHub..."
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Application</button>
      </form>
      {submissionMessage && <p className="success-message">{submissionMessage}</p>}
    </div>
  );
}

export default PartnerApplicationForm;