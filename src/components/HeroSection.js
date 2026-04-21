import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-section">
      <h1>Welcome to FundiConnect</h1>
      <p>Connecting you with skilled fundis for all your needs.</p>
      <div className="hero-cta-buttons">
        <Link to="/request-service" className="hero-button primary">Post a Job</Link>
        <Link to="/job-market" className="hero-button secondary">Browse Jobs</Link>
      </div>
    </div>
  );
}

export default HeroSection;
