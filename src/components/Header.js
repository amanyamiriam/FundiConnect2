import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="site-logo">FundiConnect</Link>
        <nav className="main-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/get-started">Get Started</Link></li>
            <li><Link to="/client-platform">Client Platform</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/auth">Login/Register</Link></li>

          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
