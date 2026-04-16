import React from 'react';
import { Link } from 'react-router-dom';
import './ForFundis.css';

function ForFundis() {
  return (
    <div className="for-fundis-section">
      <h2>For Fundis</h2>
      <p>Are you a skilled professional looking for more work? Join FundiConnect!</p>
      <div className="fundis-benefits">
        <div className="benefit-card">
          <h3>Expand Your Reach</h3>
          <p>Connect with more clients in your area and grow your business.</p>
        </div>
        <div className="benefit-card">
          <h3>Flexible Work</h3>
          <p>Choose your own hours and take on jobs that fit your schedule.</p>
        </div>
        <div className="benefit-card">
          <h3>Fair Compensation</h3>
          <p>Get paid fairly for your expertise and hard work.</p>
        </div>
      </div>
      <Link to="/join-as-fundi" className="fundi-join-button">Join as a Fundi</Link>
    </div>
  );
}

export default ForFundis;
