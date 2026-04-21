import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {
  return (
    <Link to="/" className="fundi-logo" aria-label="FundiConnect homepage">
      <span className="fundi-logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1d6d30" />
              <stop offset="100%" stopColor="#0c4c1f" />
            </linearGradient>
          </defs>
          <path fill="url(#logoGradient)" d="M32 4C21.1 4 12 13.1 12 24c0 9.2 10.4 24.4 17.5 33.4 1.5 2 4.6 2 6.1 0C41.6 48.4 52 33.2 52 24 52 13.1 42.9 4 32 4Zm0 34.5c-5.7 0-10.3-4.6-10.3-10.3S26.3 17.9 32 17.9 42.3 22.5 42.3 28.2 37.7 38.5 32 38.5Z"/>
          <path fill="#ffffff" d="M26.5 31.6c-.7 0-1.2-.5-1.2-1.2v-6.4c0-.7.5-1.2 1.2-1.2h11c.7 0 1.2.5 1.2 1.2v6.4c0 .7-.5 1.2-1.2 1.2h-11Zm2.1-2.3h6.7v-3.8h-6.7v3.8Z"/>
        </svg>
      </span>
      <span className="fundi-logo-text">
        <span className="fundi-logo-title">Fundi</span>
        <span className="fundi-logo-subtitle">Connect</span>
      </span>
    </Link>
  );
}

export default Logo;
