import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (location) {
      fetchWeather(location);
    }
  }, [location]);

  const fetchWeather = async (loc) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=4837797609556a1d46ac15e34a5320c6&units=metric`);
      setWeather(response.data);
      setError('');
      fetchForecast(loc);
    } catch (err) {
      setError('Failed to fetch weather data');
      setWeather(null);
    }
  };

  const fetchForecast = async (loc) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${loc}&appid=4837797609556a1d46ac15e34a5320c6&units=metric`);
      setForecast(response.data.list.slice(0, 7));
    } catch (err) {
      console.error('Failed to fetch forecast data', err);
    }
  };

  return (
    <div className="weather">
      {error && <p>{error}</p>}
      {weather && (
        <>
          <div className='weather-details'>
            <div className='weather-report'>
              <div>
              <h2>{weather.name}</h2>
              <p>{new Date().toLocaleString()}</p>
              </div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
              </div>
            </div>
            <div className='weather-section'>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind Speed: {weather.wind.speed} m/s</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          </div>
          <div className="forecast">
            {forecast.map((day, index) => (
              <div className="forecast-day" key={index}>
                <h3>{new Date(day.dt_txt).toLocaleDateString()}</h3>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <div className="degree">
                  <p className="card-para">{day.main.temp_max}<sup>o</sup></p>
                  <p className="card-para">{day.main.temp_min}<sup>o</sup></p>
                </div>
                <p className="weather">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
