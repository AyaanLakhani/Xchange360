import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';

function Home() {
  const { login, authenticated, logout } = usePrivy();
  const navigate = useNavigate(); // Initialize useHistory hook

  const navigateToProfile = () => {
    navigate('/Profilepage');
  };

  return (
    <div className="homepage-container">
      <header className="main-header">
        <div className="logo-container">
          <img src="/360Logo.jpg" alt="Your Company Logo" className="logo" />
          <span style={{ color: '#5e6f9a', fontWeight: 'bold', marginRight: '1px' }}>Xchange</span>
          <span style={{ color: '#89ebde', fontWeight: 'bold' }}>360</span>
        </div>
        <nav className="main-nav"> 
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Listings">Companies</Link></li>
            {authenticated ? (
              <>
                <li><button onClick={navigateToProfile} className="profile-button"><img src="/user-icon.png" alt="User Profile" className="user-icon" /></button></li>
                <li><button onClick={logout} className="login-button">Logout</button></li>
              </>
            ) : (
              <li><button onClick={login} className="login-button">Login</button></li>
            )}
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

      <footer className="main-footer">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
