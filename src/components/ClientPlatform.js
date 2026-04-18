import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ClientPlatform.css';

function ClientPlatform() {
  const [activeSection, setActiveSection] = useState('find-fundi'); // 'find-fundi', 'request-service', 'job-tracking'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [fundis, setFundis] = useState([]);
  const [filteredFundis, setFilteredFundis] = useState([]);
  const [serviceType, setServiceType] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [budget, setBudget] = useState('');
  const [requestMessage, setRequestMessage] = useState('');
  const [jobs, setJobs] = useState([]);

  const skills = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Welding', 'Gardening'];
  const locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];

  useEffect(() => {
    // Simulate fetching fundis from an API
    const fetchedFundis = [
      { id: 1, name: 'John Doe', skill: 'Plumbing', location: 'Nairobi', rating: 4.5, bio: 'Experienced plumber with 10 years in the field.' },
      { id: 2, name: 'Jane Smith', skill: 'Electrical', location: 'Mombasa', rating: 4.8, bio: 'Certified electrician, reliable and efficient.' },
      { id: 3, name: 'Peter Jones', skill: 'Carpentry', location: 'Nairobi', rating: 4.2, bio: 'Skilled carpenter for all your woodworking needs.' },
      { id: 4, name: 'Mary Wanjiku', skill: 'Painting', location: 'Nakuru', rating: 4.7, bio: 'Professional painter, delivering high-quality finishes.' },
      { id: 5, name: 'David Kimani', skill: 'Plumbing', location: 'Nairobi', rating: 4.0, bio: 'Quick and affordable plumbing services.' },
    ];
    setFundis(fetchedFundis);
    setFilteredFundis(fetchedFundis);

    // Simulate fetching jobs
    const fetchedJobs = [
      { id: 1, service: 'Plumbing', description: 'Leaky faucet repair', fundi: 'John Doe', status: 'In Progress', date: '2023-11-01' },
      { id: 2, service: 'Electrical', description: 'Light fixture installation', fundi: 'Jane Smith', status: 'Pending', date: '2023-11-05' },
      { id: 3, service: 'Painting', description: 'Bedroom repaint', fundi: 'Mary Wanjiku', status: 'Completed', date: '2023-10-28' },
    ];
    setJobs(fetchedJobs);
  }, []);

  useEffect(() => {
    let currentFilteredFundis = fundis;

    if (searchTerm) {
      currentFilteredFundis = currentFilteredFundis.filter(fundi =>
        fundi.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fundi.skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSkill) {
      currentFilteredFundis = currentFilteredFundis.filter(fundi => fundi.skill === selectedSkill);
    }

    if (selectedLocation) {
      currentFilteredFundis = currentFilteredFundis.filter(fundi => fundi.location === selectedLocation);
    }

    setFilteredFundis(currentFilteredFundis);
  }, [searchTerm, selectedSkill, selectedLocation, fundis]);

  const handleServiceRequest = (e) => {
    e.preventDefault();
    // Simulate service request submission
    console.log({
      serviceType,
      jobDescription,
      jobLocation,
      preferredDate,
      budget,
    });
    setRequestMessage('Your service request has been submitted. Fundis will contact you shortly!');
    // Clear form fields
    setServiceType('');
    setJobDescription('');
    setJobLocation('');
    setPreferredDate('');
    setBudget('');
    // Add the new job to the jobs list
    setJobs([...jobs, { id: jobs.length + 1, service: serviceType, description: jobDescription, fundi: 'Awaiting Assignment', status: 'Pending', date: preferredDate }]);
  };

  const handleMarkAsComplete = (id) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: 'Completed' } : job));
    alert(`Job ${id} marked as complete!`);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'find-fundi':
        return (
          <div className="find-fundi-section">
            <h2>Find a Fundi</h2>
            <p>Search for skilled professionals based on your needs.</p>
            <div className="search-filter-bar">
              <input
                type="text"
                placeholder="Search by name or skill..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)}>
                <option value="">All Skills</option>
                {skills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
              </select>
              <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
                <option value="">All Locations</option>
                {locations.map(location => <option key={location} value={location}>{location}</option>)}
              </select>
            </div>
            <div className="fundi-list">
              {filteredFundis.length === 0 ? (
                <p>No fundis found matching your criteria.</p>
              ) : (
                filteredFundis.map(fundi => (
                  <div key={fundi.id} className="fundi-card">
                    <h3>{fundi.name}</h3>
                    <p><strong>Skill:</strong> {fundi.skill}</p>
                    <p><strong>Location:</strong> {fundi.location}</p>
                    <p><strong>Rating:</strong> {fundi.rating} ⭐</p>
                    <p>{fundi.bio}</p>
                    <button className="view-profile-button">View Profile</button>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      case 'request-service':
        return (
          <div className="request-service-section">
            <h2>Request a Service</h2>
            <p>Tell us what you need done, and we'll connect you with the right fundi.</p>
            <form className="service-request-form" onSubmit={handleServiceRequest}>
              <div className="form-group">
                <label htmlFor="serviceType">Service Type</label>
                <select
                  id="serviceType"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  required
                >
                  <option value="">Select a service</option>
                  {skills.map(skill => <option key={skill} value={skill}>{skill}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="jobDescription">Job Description</label>
                <textarea
                  id="jobDescription"
                  rows="5"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Describe the job in detail..."
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="jobLocation">Location</label>
                <select
                  id="jobLocation"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map(location => <option key={location} value={location}>{location}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date</label>
                <input
                  type="date"
                  id="preferredDate"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Budget (Ksh)</label>
                <input
                  type="number"
                  id="budget"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g., 5000"
                />
              </div>
              <button type="submit" className="submit-request-button">Submit Request</button>
            </form>
            {requestMessage && <p className="success-message">{requestMessage}</p>}
          </div>
        );
      case 'job-tracking':
        return (
          <div className="job-tracking-section">
            <h2>Get the Job Done (Job Tracking)</h2>
            <p>Monitor the progress of your jobs and communicate with your fundi.</p>
            {jobs.length === 0 ? (
              <p>You have no active or completed jobs.</p>
            ) : (
              <div className="job-list">
                {jobs.map(job => (
                  <div key={job.id} className="job-card">
                    <h3>{job.service} - {job.description}</h3>
                    <p><strong>Fundi:</strong> {job.fundi}</p>
                    <p><strong>Status:</strong> <span className={`job-status ${job.status.toLowerCase().replace(' ', '-')}`}>{job.status}</span></p>
                    <p><strong>Date:</strong> {job.date}</p>
                    {job.status !== 'Completed' && (
                      <button className="mark-complete-button" onClick={() => handleMarkAsComplete(job.id)}>Mark as Complete</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="client-platform-container">
      <div className="client-platform-sidebar">
        <h2>Client Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                className={activeSection === 'find-fundi' ? 'active' : ''}
                onClick={() => setActiveSection('find-fundi')}
              >
                Find a Fundi
              </button>
            </li>
            <li>
              <button
                className={activeSection === 'request-service' ? 'active' : ''}
                onClick={() => setActiveSection('request-service')}
              >
                Request a Service
              </button>
            </li>
            <li>
              <button
                className={activeSection === 'job-tracking' ? 'active' : ''}
                onClick={() => setActiveSection('job-tracking')}
              >
                Job Tracking
              </button>
            </li>
            <li>
              <Link to="/payments" className="nav-link">
                Payment System
              </Link>
            </li>
            <li>
              <Link to="/messages" className="nav-link">
                Messages
              </Link>
            </li>
            <li>
              <Link to="/bookings" className="nav-link">
                Bookings & Schedule
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="nav-link">
                Reviews & Ratings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="client-platform-content">
        {renderSection()}
      </div>
    </div>
  );
}

export default ClientPlatform;