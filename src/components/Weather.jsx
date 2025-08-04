// src/components/Weather.jsx
import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Eye, Droplets, Thermometer } from 'lucide-react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Garden Grove'); // Default city
  const [isCelsius, setIsCelsius] = useState(true); // Temperature unit state

  // TODO: Add your weather API key here
  const API_KEY = '6a6b48405c070ffa29c6e7a4ea6c6499';

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      console.log('Fetching weather for:', city);
      console.log('API URL:', API_URL);
      
      const response = await fetch(API_URL);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        
        // If API key is invalid, show demo data instead of error
        if (response.status === 401) {
          console.log('API key invalid, showing demo data for:', city);
          setWeatherData({
            name: city,
            main: {
              temp: Math.round(Math.random() * 15 + 15), // Random temp between 15-30°C
              feels_like: Math.round(Math.random() * 15 + 17),
              humidity: Math.round(Math.random() * 40 + 40), // 40-80%
              pressure: Math.round(Math.random() * 50 + 1000)
            },
            weather: [{
              main: 'Clear',
              description: 'demo weather data',
              icon: '01d'
            }],
            wind: {
              speed: Math.round(Math.random() * 10 + 1) // 1-11 m/s
            },
            visibility: 10000
          });
          setLoading(false);
          return;
        }
        
        throw new Error(errorData.message || 'Weather data not found');
      }
      const data = await response.json();
      console.log('Weather data:', data);
      setWeatherData(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  // Temperature conversion functions
  const convertTemp = (temp) => {
    if (isCelsius) {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9/5) + 32);
    }
  };

  const getTemperatureUnit = () => {
    return isCelsius ? '°C' : '°F';
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case 'clouds':
        return <Cloud className="w-16 h-16 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="w-16 h-16 text-blue-300" />;
      default:
        return <Sun className="w-16 h-16 text-yellow-500" />;
    }
  };

  const handleCityChange = (e) => {
    e.preventDefault();
    const newCity = e.target.city.value.trim();
    if (newCity) {
      setCity(newCity);
      e.target.city.value = ''; // Clear the input
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Weather Dashboard
        </h2>

        {/* City Search */}
        <form onSubmit={handleCityChange} className="mb-8">
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              name="city"
              placeholder="Enter city name..."
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-500 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* Temperature Unit Toggle */}
        <div className="text-center mb-8">
          <button
            onClick={toggleTemperatureUnit}
            className="inline-flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
          >
            <span className="mr-2">Temperature Unit:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {isCelsius ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </span>
          </button>
        </div>

        {/* Weather Display */}
        {loading && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse animation-delay-100"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse animation-delay-200"></div>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-red-500 dark:text-red-400">Error: {error}</p>
            <button
              onClick={fetchWeather}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {weatherData && !loading && (
          <div className="bg-white dark:bg-gray-600 rounded-xl shadow-lg p-8">
            {/* Main Weather Info */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {weatherData.name}
              </h3>
              <div className="flex items-center justify-center mb-4">
                {getWeatherIcon(weatherData.weather[0]?.main)}
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {convertTemp(weatherData.main.temp)}{getTemperatureUnit()}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 capitalize">
                {weatherData.weather[0]?.description}
              </p>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Feels like</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {convertTemp(weatherData.main.feels_like)}{getTemperatureUnit()}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Humidity</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {weatherData.main.humidity}%
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <Wind className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Wind Speed</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {weatherData.wind.speed} m/s
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <Eye className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-300">Visibility</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {(weatherData.visibility / 1000).toFixed(1)} km
                </p>
              </div>
            </div>

            {/* API Notice */}
            {weatherData?.weather?.[0]?.description === 'demo weather data' && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Demo Mode:</strong> API key is invalid or not activated yet. Showing demo data. 
                  <br />
                  <span className="text-xs">New OpenWeatherMap API keys take 2-4 hours to activate.</span>
                </p>
              </div>
            )}
            {API_KEY === 'YOUR_API_KEY_HERE' && (
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Demo Mode:</strong> This is showing sample data. Add your OpenWeatherMap API key to get real weather data.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;
