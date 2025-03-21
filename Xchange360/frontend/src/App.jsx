// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import necessary components
import Navbar from './Navbar';
import Login from './Login';
import Providers from './Providers';
import './App.css';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to Xchange360</h1>
      <p>This is your homepage content.</p>
      
      <Login/>
    </div>
  );
}

export default App;