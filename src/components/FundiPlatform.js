import React from 'react';
import { Link } from 'react-router-dom';
import './FundiPlatform.css'; // Assuming you'll create a CSS file for this

function FundiPlatform() {
  return (
    <div className="fundi-platform-container">
      <h1>Welcome to the Fundi Platform!</h1>
      <p>This is your dashboard where you can manage your profile, view job requests, and track your earnings.</p>
      <p>Explore the marketplace to apply for jobs posted by clients.</p>
      <div className="platform-links">
        <Link to="/job-market" className="job-market-link">Go to Job Market</Link>
        <Link to="/payments" className="payments-link">View Payments</Link>
        <Link to="/messages" className="messages-link">View Messages</Link>
        <Link to="/bookings" className="bookings-link">Manage Bookings</Link>
        <Link to="/reviews" className="reviews-link">View My Reviews</Link>
      </div>
    </div>
  );
}

export default FundiPlatform;