// src/components/Login.jsx
import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { ready, authenticated, user, login } = usePrivy(); // Removed logout from destructuring
  const navigate = useNavigate();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (authenticated) {
    navigate('/'); // Redirect immediately after login
    return null; // Don't render anything in the Login component
  }

  return (
    <button onClick={login}>Get Started</button>
  );
}

export default Login;