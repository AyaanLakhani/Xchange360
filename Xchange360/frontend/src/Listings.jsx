import React, { useEffect, useState } from 'react';
import './Listings.css';

const Listings = () => {
  const companies = [
    'Microsoft', 'Nike', 'Adidas', 'Puma', 'Under Armour', 'Samsung', 
    'Apple', 'Sony', 'Target', 'Walmart'
  ];

  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      const fetchedLogos = await Promise.all(
        companies.map(async (company) => {
          try {
            const response = await fetch(
              `https://api.api-ninjas.com/v1/logo?name=${company}`,
              {
                method: 'GET',
                headers: {
                  'X-Api-Key': 'DtxjSv85eQCuYyrbPSAaGw==XUtOJg1xJzeeTxKa',  // Replace with your API key
                },
              }
            );
            const data = await response.json();
            const logoUrl = data[0]?.image || 'https://via.placeholder.com/150';
            console.log(`Fetched logo for ${company}: ${logoUrl}`);
            return { company, logoUrl };
          } catch (error) {
            console.error('Error fetching logo:', error);
            return { company, logoUrl: 'https://via.placeholder.com/150' };
          }
        })
      );
      setLogos(fetchedLogos);
    };

    fetchLogos();
  }, []);

  return (
    <div className="container">
      <h2 className="title">Company Logos</h2>
      <div className="grid">
        {logos.map((logoData, index) => (
          <div key={index} className="card">
            <img
              className="card-logo"
              src={logoData.logoUrl}
              alt={`Logo for ${logoData.company}`}
            />
            <button className="card-btn">+</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Listings;
