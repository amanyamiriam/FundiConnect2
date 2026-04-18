import React from 'react';
import './PrivacyPolicy.css';

function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <section className="privacy-hero">
        <h1>Privacy Policy</h1>
        <p>We are committed to protecting your personal information on FundiConnect.</p>
      </section>

      <section className="privacy-section">
        <h2>Information We Collect</h2>
        <p>
          We collect the data you provide when creating an account, posting jobs, applying for work,
          or communicating with other users.
        </p>
      </section>

      <section className="privacy-section">
        <h2>How We Use Information</h2>
        <p>
          Data is used to operate the platform, improve services, provide customer support, and personalize
          your experience.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Data Security</h2>
        <p>
          We use industry-standard measures to protect your information, but you should also take steps to
          keep your account secure.
        </p>
      </section>

      <section className="privacy-section">
        <h2>Cookies &amp; Tracking</h2>
        <p>
          FundiConnect may use cookies and tracking tools to remember preferences and analyze usage.
          You can manage cookies through your browser settings.
        </p>
      </section>
    </div>
  );
}

export default PrivacyPolicy;
