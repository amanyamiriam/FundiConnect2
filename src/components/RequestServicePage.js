import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestServicePage.css';

const JOB_STORAGE_KEY = 'fundiConnectJobMarket';

function RequestServicePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Welding', 'Gardening', 'Masonry', 'Cleaning'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !category || !description || !location || !budget || !contactName || !contactEmail) {
      setSuccessMessage('Please complete all required fields before posting your job.');
      return;
    }

    const storedJobs = JSON.parse(localStorage.getItem(JOB_STORAGE_KEY) || '[]');
    const newJob = {
      id: storedJobs.length ? Math.max(...storedJobs.map((job) => job.id)) + 1 : 1,
      title,
      category,
      description,
      location,
      budget,
      preferredDate,
      postedAt: new Date().toISOString().split('T')[0],
      status: 'Open',
      postedBy: contactName,
      contactEmail,
      contactPhone,
      applicants: [],
      assignedFundi: null,
    };

    const updatedJobs = [newJob, ...storedJobs];
    localStorage.setItem(JOB_STORAGE_KEY, JSON.stringify(updatedJobs));
    setSuccessMessage('Your job has been posted! Redirecting to the marketplace...');

    setTimeout(() => {
      navigate('/job-market');
    }, 1400);
  };

  return (
    <div className="request-service-page">
      <div className="request-service-hero">
        <div className="request-service-copy">
          <h1>Post a job request in minutes</h1>
          <p>
            Tell us the work that needs to be done, share your budget and location, and we’ll connect you with qualified fundis.
            This page is your direct path from interest to real job posting.
          </p>
          <ul>
            <li>Fast job posting for clients</li>
            <li>Visible to skilled fundis across Kenya</li>
            <li>Integrated with the marketplace and messaging system</li>
          </ul>
        </div>
      </div>

      <div className="request-service-form-card">
        <h2>Post a Job</h2>
        <p>Complete the details below and submit your request to start receiving applications.</p>
        <form onSubmit={handleSubmit} className="request-service-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Fix leaking bathroom sink"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job in detail, including what you need done."
              rows="5"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nairobi, Karen"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget">Budget (Ksh)</label>
              <input
                id="budget"
                name="budget"
                type="number"
                min="0"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g. 8000"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Date</label>
              <input
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="contactName">Your Name</label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email</label>
              <input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="contactPhone">Phone Number</label>
            <input
              id="contactPhone"
              name="contactPhone"
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Optional"
            />
          </div>

          <button type="submit" className="submit-job-button">Post Job</button>
          {successMessage && <p className="success-text">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default RequestServicePage;
