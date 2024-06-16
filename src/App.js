import React, { useState } from 'react';
import './App.css';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import Header from './components/Header';
import WeatherList from './components/WeatherList';

function App() {
  const [theme, setTheme] = useState('light');
  const [location, setLocation] = useState('');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleSearch = (loc) => {
    setLocation(loc);
  };

  return (
    <div className={`App ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <SearchBar onSearch={handleSearch} />
      <Weather location={location} />
      <WeatherList />
    </div>
  );
}

export default App;


