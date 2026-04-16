import React from 'react';
import './WhyChooseUs.css';

function WhyChooseUs() {
  const reasons = [
    {
      title: 'Verified Workers',
      description: 'All our fundis are thoroughly vetted and background-checked for your peace of mind.',
      icon: '✅'
    },
    {
      title: 'Secure M-Pesa Payments',
      description: 'Enjoy safe and convenient transactions with our integrated M-Pesa payment system.',
      icon: '💰'
    },
    {
      title: 'Ratings & Reviews',
      description: 'Make informed decisions with transparent ratings and reviews from other users.',
      icon: '⭐'
    },
    {
      title: 'Fast Booking',
      description: 'Easily book services with just a few taps, saving you time and effort.',
      icon: '⚡'
    },
    {
      title: 'Trusted Across Kenya',
      description: 'Our network of skilled professionals is trusted by thousands across the country.',
      icon: '🇰🇪'
    },
  ];

  return (
    <div className="why-choose-us-section">
      <h2>Why Choose Us?</h2>
      <div className="reasons-container">
        {reasons.map((reason, index) => (
          <div className="reason-card" key={index}>
            <span className="reason-icon">{reason.icon}</span>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;
