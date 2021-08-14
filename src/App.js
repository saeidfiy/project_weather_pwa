import React, { useCallback, useEffect, useState } from 'react';
import { Loading, WeatherView } from './component';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery('');
    }
  };

  const initializeProject = useCallback(async () => {
    if (query === '' && weather.main === undefined) {
      const data = await fetchWeather('iran');
      setWeather(data);
    }
  }, [query, weather]);

  useEffect(() => {
    initializeProject();
  }, [initializeProject]);

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      <div className="city">
        {weather.main ? <WeatherView weather={weather} /> : <Loading />}
      </div>
    </div>
  );
};

export default App;
