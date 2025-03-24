// src/components/Home.jsx
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import './Homepage.css';

function Home() {
  const { login, authenticated, logout } = usePrivy();

  return (
    <div className="homepage-container">
      <header className="main-header">
        <div className="logo-container">
          <img src="/360Logo.jpg" alt="Your Company Logo" className="logo" />
          <span style={{ color: '#5e6f9a', fontWeight: 'bold', marginRight: '1px' }}>Xchange</span>
          <span style={{ color: '#89ebde', fontWeight: 'bold' }}>360</span>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li>
              {authenticated ? (
                <button onClick={logout} className="login-button">Logout</button>
              ) : (
                <button onClick={login} className="login-button">Login</button>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-text">
          <h1 className="hero-headline">OUR LOYALTY PROGRAM</h1>
          <p className="hero-subheadline">
          A blockchain-based loyalty exchange program where users can collect, exchange, and redeem tokens for rewards offered by different restaurants and fast-food chains.
          </p>
          <button onClick={login} className="hero-cta-button">Join Now</button>
        </div>
        <div className="hero-image-container">
          <img src="/bg.jpg" alt="Loyalty Program Illustration" className="hero-image" />
        </div>
      </main>

      {/* Add more sections like Features, Benefits, Call to Action, etc. here */}

      <footer className="main-footer">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;