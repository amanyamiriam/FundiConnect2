import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './JobMarket.css';

const JOB_STORAGE_KEY = 'fundiConnectJobMarket';

const initialJobs = [
  {
    id: 1,
    title: 'Fix Leaky Roof',
    category: 'Carpentry',
    description: 'Repair roof leaks and replace damaged roofing boards.',
    location: 'Nairobi',
    budget: '18000',
    preferredDate: '2026-05-03',
    postedAt: '2026-04-15',
    status: 'Open',
    postedBy: 'Client User',
    applicants: [],
    assignedFundi: null,
  },
  {
    id: 2,
    title: 'Install New Light Fixtures',
    category: 'Electrical',
    description: 'Install ceiling lights and update wiring in the living room.',
    location: 'Mombasa',
    budget: '8500',
    preferredDate: '2026-05-10',
    postedAt: '2026-04-16',
    status: 'Open',
    postedBy: 'Client User',
    applicants: [],
    assignedFundi: null,
  },
];

function JobMarket() {
  const [jobs, setJobs] = useState([]);
  const [userRole, setUserRole] = useState('client');
  const [userName, setUserName] = useState('Client User');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [applicantName, setApplicantName] = useState('Fundi User');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedJobForPayment, setSelectedJobForPayment] = useState(null);

  const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Welding', 'Gardening'];
  const locations = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];

  useEffect(() => {
    const storedJobs = localStorage.getItem(JOB_STORAGE_KEY);
    if (storedJobs) {
      setJobs(JSON.parse(storedJobs));
    } else {
      setJobs(initialJobs);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(JOB_STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const parseStorage = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.warn(`Failed to parse storage for ${key}:`, error);
      return fallback;
    }
  };

  // Get fundi rating from review system
  const getFundiRating = (fundiName) => {
    const reviews = parseStorage('fundiConnectReviews', []);
    const fundiReviews = reviews.filter(r => r.fundiName === fundiName);
    if (fundiReviews.length === 0) return null;
    const average = fundiReviews.reduce((sum, r) => sum + r.rating, 0) / fundiReviews.length;
    return {
      rating: average.toFixed(1),
      count: fundiReviews.length,
    };
  };

  const renderFundiRating = (fundiName) => {
    const ratingData = getFundiRating(fundiName);
    if (!ratingData) return <span className="no-rating">No reviews yet</span>;
    
    return (
      <span className="fundi-rating">
        ⭐ {ratingData.rating} ({ratingData.count} reviews)
      </span>
    );
  };

  const handlePostJob = (e) => {
    e.preventDefault();

    const newJob = {
      id: jobs.length ? Math.max(...jobs.map((job) => job.id)) + 1 : 1,
      title,
      category,
      description,
      location,
      budget,
      preferredDate,
      postedAt: new Date().toISOString().split('T')[0],
      status: 'Open',
      postedBy: userName || 'Client User',
      applicants: [],
      assignedFundi: null,
    };

    setJobs([newJob, ...jobs]);
    setTitle('');
    setCategory('');
    setDescription('');
    setLocation('');
    setBudget('');
    setPreferredDate('');
    setSuccessMessage('Job posted successfully! Clients and fundis can now see it in the marketplace.');

    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleApply = (jobId) => {
    if (!applicantName.trim()) {
      alert('Please enter your name before applying.');
      return;
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const hasAlreadyApplied = job.applicants.some((application) => application.name === applicantName.trim());
    if (hasAlreadyApplied) {
      alert('You have already applied to this job.');
      return;
    }

    // Start a conversation with the job poster
    startConversation(jobId, job.title, job.postedBy);

    setJobs((currentJobs) =>
      currentJobs.map((job) => {
        if (job.id !== jobId) {
          return job;
        }

        return {
          ...job,
          applicants: [
            ...job.applicants,
            {
              name: applicantName.trim(),
              appliedAt: new Date().toISOString().split('T')[0],
            },
          ],
        };
      })
    );

    setSuccessMessage(`Application sent for ${applicantName.trim()}! A conversation has been started with the client.`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const startConversation = (jobId, jobTitle, otherParticipant) => {
    const MESSAGES_STORAGE_KEY = 'fundiConnectMessages';
    const existingMessages = JSON.parse(localStorage.getItem(MESSAGES_STORAGE_KEY) || '[]');

    // Check if conversation already exists
    const existingConversation = existingMessages.find(
      conv => conv.jobId === jobId && conv.participants.includes(otherParticipant)
    );

    if (!existingConversation) {
      const newConversation = {
        id: existingMessages.length ? Math.max(...existingMessages.map(c => c.id)) + 1 : 1,
        jobId,
        jobTitle,
        participants: [applicantName, otherParticipant],
        messages: [
          {
            id: 1,
            sender: applicantName,
            content: `Hi! I'm interested in your job "${jobTitle}". I'd like to discuss the details and potentially work on this project.`,
            timestamp: new Date().toISOString(),
            read: false,
          }
        ],
        lastMessage: new Date().toISOString(),
        unreadCount: 1,
      };

      existingMessages.push(newConversation);
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(existingMessages));
    }
  };

  const handleAssignFundi = (jobId, fundiName) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === jobId
          ? { ...job, assignedFundi: fundiName, status: 'In Progress' }
          : job
      )
    );
    setSuccessMessage(`Fundi ${fundiName} assigned to the job.`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleMarkCompleted = (jobId) => {
    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === jobId ? { ...job, status: 'Completed' } : job
      )
    );
    setSuccessMessage('Job marked as completed. Great work!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleInitiatePayment = (job) => {
    setSelectedJobForPayment(job);
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    // In a real app, this would integrate with the payment system
    setSuccessMessage('Payment initiated! Funds will be held in escrow until job completion.');
    setShowPaymentModal(false);
    setSelectedJobForPayment(null);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? job.category === filterCategory : true;
    const matchesLocation = filterLocation ? job.location === filterLocation : true;
    return matchesSearch && matchesCategory && matchesLocation && job.status === 'Open';
  });

  const myPostedJobs = jobs.filter((job) => job.postedBy.toLowerCase() === userName.toLowerCase());
  const myApplications = jobs.filter((job) => job.applicants.some((application) => application.name.toLowerCase() === applicantName.trim().toLowerCase()));

  return (
    <div className="job-market-container">
      <div className="job-market-header">
        <div>
          <h1>Job Market</h1>
          <p>Post jobs, browse open work, apply as a fundi, and track your marketplace activity.</p>
        </div>
        <div className="role-selector">
          <label>User role</label>
          <div className="role-buttons">
            <button
              className={userRole === 'client' ? 'active' : ''}
              onClick={() => setUserRole('client')}
            >
              Client
            </button>
            <button
              className={userRole === 'fundi' ? 'active' : ''}
              onClick={() => setUserRole('fundi')}
            >
              Fundi
            </button>
          </div>
          <div className="profile-name-field">
            <label>{userRole === 'client' ? 'Client name' : 'Fundi name'}</label>
            <input
              type="text"
              value={userRole === 'client' ? userName : applicantName}
              onChange={(e) =>
                userRole === 'client'
                  ? setUserName(e.target.value)
                  : setApplicantName(e.target.value)
              }
              placeholder={userRole === 'client' ? 'Enter client name' : 'Enter your fundi name'}
            />
          </div>
        </div>
      </div>

      {successMessage && <div className="job-market-success">{successMessage}</div>}

      <div className="job-market-grid">
        {userRole === 'client' && (
          <section className="job-posting-panel">
            <h2>Post a Job</h2>
            <form className="job-form" onSubmit={handlePostJob}>
              <div className="form-group">
                <label htmlFor="jobTitle">Job Title</label>
                <input
                  id="jobTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g. Fix leaking bathroom sink"
                />
              </div>
              <div className="form-group">
                <label htmlFor="jobCategory">Category</label>
                <select
                  id="jobCategory"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="jobDescription">Description</label>
                <textarea
                  id="jobDescription"
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group half-width">
                  <label htmlFor="jobLocation">Location</label>
                  <select
                    id="jobLocation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  >
                    <option value="">Select location</option>
                    {locations.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group half-width">
                  <label htmlFor="budget">Budget (Ksh)</label>
                  <input
                    id="budget"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                    placeholder="e.g. 12000"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="preferredDate">Preferred Date</label>
                <input
                  id="preferredDate"
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
              <button type="submit" className="primary-button">Post Job</button>
            </form>
          </section>
        )}

        <section className="job-listing-panel">
          <div className="job-listing-header">
            <h2>{userRole === 'client' ? 'Open Job Listings' : 'Browse Available Jobs'}</h2>
            <div className="job-filters">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jobs by title or category"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">All locations</option>
                {locations.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <p className="empty-state">No open jobs match your search or filters.</p>
          ) : (
            <div className="job-cards">
              {filteredJobs.map((job) => {
                const hasApplied = job.applicants.some(
                  (application) => application.name.toLowerCase() === applicantName.trim().toLowerCase()
                );
                return (
                  <div key={job.id} className="job-card">
                    <div className="job-card-top">
                      <div>
                        <h3>{job.title}</h3>
                        <p className="job-meta">{job.category} • {job.location}</p>
                      </div>
                      <span className={`job-status ${job.status.toLowerCase().replace(' ', '-')}`}>{job.status}</span>
                    </div>
                    <p className="job-description">{job.description}</p>
                    <div className="job-card-footer">
                      <div>
                        <p><strong>Budget:</strong> Ksh {job.budget}</p>
                        <p><strong>Preferred:</strong> {job.preferredDate || 'Flexible'}</p>
                      </div>
                      {userRole === 'fundi' ? (
                        <button
                          className="secondary-button"
                          onClick={() => handleApply(job.id)}
                          disabled={hasApplied}
                        >
                          {hasApplied ? 'Applied' : 'Apply as Fundi'}
                        </button>
                      ) : (
                        <span className="posted-by">Posted by {job.postedBy}</span>
                      )}
                    </div>
                    {userRole === 'client' && job.postedBy.toLowerCase() === userName.toLowerCase() && job.applicants.length > 0 && (
                      <div className="applicant-section">
                        <h4>Applicants</h4>
                        {job.applicants.map((application) => (
                          <div key={application.name} className="applicant-row">
                            <div className="applicant-info">
                              <span className="applicant-name">{application.name}</span>
                              <div className="applicant-rating">{renderFundiRating(application.name)}</div>
                            </div>
                            <button
                              className="assign-button"
                              onClick={() => handleAssignFundi(job.id, application.name)}
                              disabled={job.status !== 'Open'}
                            >
                              Assign
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {job.assignedFundi && (
                      <div className="assigned-line">
                        <strong>Assigned Fundi:</strong> {job.assignedFundi}
                        {userRole === 'client' && job.status === 'In Progress' && (
                          <button className="mark-complete-button" onClick={() => handleMarkCompleted(job.id)}>
                            Mark Completed
                          </button>
                        )}
                        {userRole === 'client' && job.status === 'Completed' && !job.paymentInitiated && (
                          <button className="payment-button" onClick={() => handleInitiatePayment(job)}>
                            Initiate Payment
                          </button>
                        )}
                        {userRole === 'client' && job.paymentInitiated && (
                          <span className="payment-status">Payment in escrow</span>
                        )}
                        {(userRole === 'client' && job.assignedFundi) || (userRole === 'fundi' && job.applicants.some(app => app.name === userName)) ? (
                          <Link to="/messages" className="message-button-link">
                            <button className="message-button">
                              💬 Message
                            </button>
                          </Link>
                        ) : null}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {userRole === 'client' && (
        <section className="summary-panel">
          <h2>My Posted Jobs</h2>
          {myPostedJobs.length === 0 ? (
            <p>You have not posted any jobs yet. Use the form above to add your first request.</p>
          ) : (
            <div className="job-cards">
              {myPostedJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p className="job-meta">{job.category} • {job.location}</p>
                  <p>{job.description}</p>
                  <p><strong>Status:</strong> {job.status}</p>
                  <p><strong>Applicants:</strong> {job.applicants.length}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {userRole === 'fundi' && (
        <section className="summary-panel">
          <h2>My Applications</h2>
          {myApplications.length === 0 ? (
            <p>You have not applied to any jobs yet. Browse available jobs above and apply.</p>
          ) : (
            <div className="job-cards">
              {myApplications.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.title}</h3>
                  <p className="job-meta">{job.category} • {job.location}</p>
                  <p>{job.description}</p>
                  <p><strong>Status:</strong> {job.status}</p>
                  <p><strong>Assigned Fundi:</strong> {job.assignedFundi || 'Not assigned yet'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {showPaymentModal && selectedJobForPayment && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <h3>Initiate Payment</h3>
            <div className="payment-job-details">
              <h4>{selectedJobForPayment.title}</h4>
              <p><strong>Fundi:</strong> {selectedJobForPayment.assignedFundi}</p>
              <p><strong>Amount:</strong> Ksh {selectedJobForPayment.budget}</p>
              <p><strong>Category:</strong> {selectedJobForPayment.category}</p>
            </div>

            <div className="payment-notice">
              <p><strong>Secure Payment Process:</strong></p>
              <ul>
                <li>Funds will be held in escrow until job completion</li>
                <li>You can release payment once satisfied with the work</li>
                <li>Fundi receives payment only after your approval</li>
                <li>All transactions are protected and traceable</li>
              </ul>
            </div>

            <div className="modal-actions">
              <button className="primary-button" onClick={handlePaymentComplete}>
                Proceed to Payment
              </button>
              <button
                className="cancel-button"
                onClick={() => {
                  setShowPaymentModal(false);
                  setSelectedJobForPayment(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobMarket;
