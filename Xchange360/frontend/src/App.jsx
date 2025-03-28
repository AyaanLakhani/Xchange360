// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Providers from './Providers';
import Homepage from './Homepage';
import Listings from './Listings';
import Profilepage from './Profilepage';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/profilepage" element={<Profilepage/>} />
            {/* Add other routes if needed */}
          </Routes>
        </div>
      </BrowserRouter>
    </Providers>
  );
}

export default App;