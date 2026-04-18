import React, { useState } from 'react';
import './InvestorContactForm.css';

function InvestorContactForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [interest, setInterest] = useState('');
  const [message, setMessage] = useState('');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const interestOptions = ['Request Pitch Deck', 'View Business Model', 'General Inquiry'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log({
      fullName,
      email,
      companyName,
      interest,
      message,
    });
    setSubmissionMessage('Your inquiry has been submitted. Our investor relations team will contact you shortly!');
    // Clear form fields
    setFullName('');
    setEmail('');
    setCompanyName('');
    setInterest('');
    setMessage('');
  };

  return (
    <div className="investor-form-wrapper registration-form-wrapper">
      <h3>Investor Relations Contact</h3>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="investorFullName">Full Name</label>
          <input
            type="text"
            id="investorFullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="investorEmail">Email</label>
          <input
            type="email"
            id="investorEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="investorCompanyName">Company Name (Optional)</label>
          <input
            type="text"
            id="investorCompanyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="investorInterest">Area of Interest</label>
          <select
            id="investorInterest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="investorMessage">Message (Optional)</label>
          <textarea
            id="investorMessage"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Provide more details about your inquiry..."
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit Inquiry</button>
      </form>
      {submissionMessage && <p className="success-message">{submissionMessage}</p>}
    </div>
  );
}

export default InvestorContactForm;