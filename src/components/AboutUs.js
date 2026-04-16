import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <h2>About FundiConnect</h2>
      <p className="intro-text">
        FundiConnect is dedicated to bridging the gap between skilled professionals (Fundis) and clients in need of their services. Our platform simplifies the process of finding reliable, vetted, and experienced workers for various tasks, ensuring quality and convenience for everyone.
      </p>

      <div className="mission-vision">
        <div className="section-card">
          <h3>Our Mission</h3>
          <p>
            To empower skilled Fundis by providing them with a steady stream of work opportunities and to offer clients a trusted, efficient, and transparent way to access professional services.
          </p>
        </div>
        <div className="section-card">
          <h3>Our Vision</h3>
          <p>
            To be the leading platform for connecting talent with demand across Kenya, fostering economic growth and enhancing service delivery standards.
          </p>
        </div>
      </div>

      <div className="values-section">
        <h3>Our Values</h3>
        <ul>
          <li><strong>Trust:</strong> Building strong relationships through transparency and reliability.</li>
          <li><strong>Quality:</strong> Ensuring high standards in every service delivered.</li>
          <li><strong>Empowerment:</strong> Supporting Fundis in growing their businesses and skills.</li>
          <li><strong>Innovation:</strong> Continuously improving our platform to serve our users better.</li>
          <li><strong>Community:</strong> Fostering a supportive network for both clients and Fundis.</li>
        </ul>
      </div>

      <p className="closing-text">
        Join FundiConnect today and experience the future of service delivery!
      </p>
    </div>
  );
}

export default AboutUs;
