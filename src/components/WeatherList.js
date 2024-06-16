// src/components/WeatherList.js
import React, { useState } from 'react';
import Weather from './Weather';
import './WeatherList.css';

const WeatherList = () => {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState('');

  const addLocation = () => {
    if (newLocation && !locations.includes(newLocation)) {
      setLocations([...locations, newLocation]);
      setNewLocation('');
    }
  };

  return (
    <div className="weather-list">
      <div className="location-input">
        <input
          type="text"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          placeholder="Add new location"
        />
        <button className='add-btn' onClick={addLocation}>Add</button>
      </div>
      <div className="weather-cards">
        {locations.map((location, index) => (
          <Weather key={index} location={location} />
        ))}
      </div>
    </div>
  );
};

export default WeatherList;
