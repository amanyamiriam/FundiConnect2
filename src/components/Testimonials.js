import React from 'react';
import './Testimonials.css';

function Testimonials() {
  const testimonialsList = [
    {
      quote: "FundiConnect made it so easy to find a reliable plumber. The service was quick and professional!",
      author: "Sarah M."
    },
    {
      quote: "I've been using FundiConnect for my electrical work for months now. Always satisfied with the quality and efficiency.",
      author: "John D."
    },
    {
      quote: "As a carpenter, FundiConnect has helped me connect with so many new clients. It's a great platform!",
      author: "David K."
    },
  ];

  return (
    <div className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonialsList.map((testimonial, index) => (
          <div className="testimonial-card" key={index}>
            <p className="quote">"{testimonial.quote}"</p>
            <p className="author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Testimonials;
