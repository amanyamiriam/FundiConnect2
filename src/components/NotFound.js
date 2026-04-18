import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, we couldn't find the page you're looking for.</p>
      <Link to="/" className="home-link">Return to Home</Link>
    </div>
  );
}

export default NotFound;
