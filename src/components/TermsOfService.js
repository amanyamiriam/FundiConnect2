import React from 'react';
import './TermsOfService.css';

function TermsOfService() {
  return (
    <div className="terms-container">
      <section className="terms-hero">
        <h1>Terms of Service</h1>
        <p>These terms govern your use of FundiConnect. Please read them carefully.</p>
      </section>

      <section className="terms-section">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By using FundiConnect, you agree to comply with these Terms of Service. If you do not agree,
          please do not use our platform.
        </p>
      </section>

      <section className="terms-section">
        <h2>2. User Accounts</h2>
        <p>
          Users are responsible for keeping account credentials secure and accurate. You must provide
          truthful information when registering and using the platform.
        </p>
      </section>

      <section className="terms-section">
        <h2>3. Job Listings &amp; Service Agreements</h2>
        <p>
          Job posters and fundis agree to communicate clearly, honor posted requirements, and follow
          project terms agreed within the platform.
        </p>
      </section>

      <section className="terms-section">
        <h2>4. Payments &amp; Escrow</h2>
        <p>
          Payments processed through FundiConnect are held in escrow until job completion. The platform
          is not a bank and provides payment facilitation for registered users.
        </p>
      </section>

      <section className="terms-section">
        <h2>5. Liability</h2>
        <p>
          FundiConnect is not responsible for the work performed by service providers. Users should
          verify skills, discuss expectations, and rate completed work honestly.
        </p>
      </section>
    </div>
  );
}

export default TermsOfService;
