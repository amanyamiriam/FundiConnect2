import React, { useState } from 'react';
import './ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Data:', formData);
    alert("Thank you for your message! We'll get back to you shortly (simulated).");
    // In a real application, this would send the data to a backend service
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p className="contact-intro">
        Have questions, feedback, or need support? Reach out to us using the form below or through our contact details.
      </p>

      <div className="contact-content">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              required
            ></textarea>
          </div>
          <button type="submit" className="contact-submit-button">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Our Details</h3>
          <p><strong>Email:</strong> info@fundiconnect.com</p>
          <p><strong>Phone:</strong> +254 721 383533</p>
          <p><strong>Address:</strong> Suna Estate, Nairobi, Kenya</p>
          <div className="social-media">
            <a href="#facebook" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#twitter" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
