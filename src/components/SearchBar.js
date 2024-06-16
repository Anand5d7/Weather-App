// src/components/SearchBar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  const fetchCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=4837797609556a1d46ac15e34a5320c6&units=metric`
            );
            setCurrentLocation(response.data.name);
          } catch (error) {
            console.error('Error fetching current location data', error);
          }
        },
        (error) => {
          console.error('Error fetching current location', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };


  const handleSearch = () => {
    if (location) {
      onSearch(location);
      setLocation('');
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter location"
        className="input-text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>Search</button>
      {currentLocation && (
        <>
          <p className="current-location">Current Location: {currentLocation}</p>
        </>
      )}
    </div>
  );
};

export default SearchBar;
