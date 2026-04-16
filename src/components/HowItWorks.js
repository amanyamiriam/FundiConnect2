import React from 'react';
import './HowItWorks.css';

function HowItWorks() {
  return (
    <div className="how-it-works-section">
      <h2>How It Works</h2>
      <div className="steps-container">
        <div className="step">
          <h3>1. Find a Fundi</h3>
          <p>Browse through our extensive list of skilled professionals in various fields.</p>
        </div>
        <div className="step">
          <h3>2. Request a Service</h3>
          <p>Easily request a service from your chosen fundi with detailed requirements.</p>
        </div>
        <div className="step">
          <h3>3. Get the Job Done</h3>
          <p>Our fundis will deliver quality work efficiently and professionally.</p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
