import React from 'react';
import './Services.css';

function Services() {
  const serviceList = [
    {
      title: 'Plumbing',
      description: 'Expert plumbing services for your home or business.',
      icon: '🔧'
    },
    {
      title: 'Electrical',
      description: 'Certified electricians for all your electrical needs.',
      icon: '⚡'
    },
    {
      title: 'Carpentry',
      description: 'Skilled carpenters for custom furniture and repairs.',
      icon: '🔨'
    },
    {
      title: 'Painting',
      description: 'Professional painting services to refresh your space.',
      icon: '🎨'
    },
    {
      title: 'Gardening',
      description: 'Experienced gardeners for beautiful landscapes.',
      icon: '🌳'
    },
    {
      title: 'Cleaning',
      description: 'Thorough cleaning services for a spotless environment.',
      icon: '🧼'
    },
  ];

  return (
    <div className="services-section">
      <h2>Our Services</h2>
      <div className="services-container">
        {serviceList.map((service, index) => (
          <div className="service-card" key={index}>
            <span className="service-icon">{service.icon}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
