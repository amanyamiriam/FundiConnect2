import React from 'react';
import './FAQ.css';

function FAQ() {
  return (
    <div className="faq-container">
      <section className="faq-hero">
        <h1>Frequently Asked Questions</h1>
        <p>Answers to the most common questions about FundiConnect.</p>
      </section>

      <section className="faq-section">
        <h2>How do I post a job?</h2>
        <p>
          Create an account, go to the job market, and click "Post a Job." Fill in the details and submit your listing.
        </p>
      </section>

      <section className="faq-section">
        <h2>How do I apply as a fundi?</h2>
        <p>
          Browse open jobs in the Job Market, select the role you want, and click "Apply" to send your application.
        </p>
      </section>

      <section className="faq-section">
        <h2>How does payment escrow work?</h2>
        <p>
          Payment is held in escrow until the job is marked completed and the client approves the release.
        </p>
      </section>

      <section className="faq-section">
        <h2>How can I contact support?</h2>
        <p>
          Use the Contact Us page or reach out through our investor/contact forms for any platform assistance.
        </p>
      </section>
    </div>
  );
}

export default FAQ;
