// src/components/Navbar.jsx
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const { authenticated, logout } = usePrivy();
  const navigate = useNavigate();

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
      <div>
        <a href="/" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Xchange360</a>
      </div>
      <div>
        <a href="/about" style={{ marginRight: '10px', textDecoration: 'none' }}>About</a>
        <a href="/contact" style={{ textDecoration: 'none' }}>Contact</a>
        {authenticated && ( // Render logout button only when authenticated
          <button onClick={() => {
            logout();
            navigate('/');
          }}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;