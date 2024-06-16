import React from 'react';

const Header = ({ theme, toggleTheme }) => {
  return (
    <header className="header">
      <h1>Weather App</h1>
      <button className='toggle-btn' onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
};

export default Header;
