// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Providers from './Providers';
import Homepage from './Homepage';
import './App.css';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes if needed */}
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}

export default App;