import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://wttr.in/${city}?format=j1`);
      const data = response.data;

      setWeather({
        temp: data.current_condition[0].temp_C,
        desc: data.current_condition[0].weatherDesc[0].value,
        location: city,
      });
      setError('');
    } catch (err) {
      setError('Failed to fetch weather. Try another city.');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>Weather in {weather.location}</h2>
          <p>Temperature: {weather.temp}°C</p>
          <p>Condition: {weather.desc}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Weather;
