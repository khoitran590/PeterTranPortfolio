// src/components/Weather.jsx – animated weather widget
import React, { useState, useEffect, useCallback } from 'react';
import {
  Cloud,
  CloudRain,
  Snowflake,
  Loader2,
  MapPin,
  RefreshCw,
  Sun,
  Moon,
  CloudLightning,
  CloudFog as CloudMist,
  Thermometer,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHeading from './ScrollFx';

const API_KEY = '6a6b48405c070ffa29c6e7a4ea6c6499';

// Temps are fetched in °C; convert for display based on the selected unit
const convertTemp = (tempC, isCelsius) =>
  isCelsius ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);

// Maps weather condition strings to standardized weather types
const mapWeatherType = (condition) => {
  const main = (condition || '').toLowerCase();
  if (main.includes('clear')) return 'clear';
  if (main.includes('cloud')) return 'clouds';
  if (main.includes('rain') || main.includes('drizzle')) return 'rain';
  if (main.includes('snow')) return 'snow';
  if (main.includes('thunder')) return 'thunderstorm';
  if (main.includes('mist') || main.includes('fog') || main.includes('haze')) return 'mist';
  return 'unknown';
};

// Animation variants for different weather types
const weatherAnimations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', damping: 15 } },
  },
  rotate: {
    animate: {
      rotate: 360,
      transition: { repeat: Infinity, duration: 20, ease: 'linear' },
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
    },
  },
  rain: {
    initial: { opacity: 0, y: -10 },
    animate: {
      opacity: [0, 1, 0],
      y: [0, 20],
      transition: { repeat: Infinity, duration: 1.5, ease: 'linear' },
    },
  },
  snow: (i) => ({
    initial: { opacity: 0, y: -5 },
    animate: {
      opacity: [0, 1, 0],
      y: [0, 15],
      x: [0, i % 2 === 0 ? 5 : -5, 0],
      transition: { repeat: Infinity, duration: 3, ease: 'easeInOut', delay: i * 0.2 },
    },
  }),
  lightning: {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0.5, 1, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
        times: [0, 0.1, 0.2, 0.21, 0.3],
        repeatDelay: 1.5,
      },
    },
  },
  mist: {
    initial: { opacity: 0.3, x: -20 },
    animate: {
      opacity: [0.3, 0.6, 0.3],
      x: [-20, 20, -20],
      transition: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
    },
  },
};

// Animation components for each weather type
const AnimatedWeatherIcons = {
  clear: ({ isDay }) => (
    <motion.div variants={weatherAnimations.item} className="relative">
      {isDay ? (
        <motion.div animate={weatherAnimations.rotate.animate} aria-label="Clear day">
          <Sun className="h-8 w-8 text-amber-300" />
          <motion.div className="absolute inset-0" animate={weatherAnimations.pulse.animate}>
            <Sun className="h-8 w-8 text-amber-300" />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div animate={weatherAnimations.pulse.animate} aria-label="Clear night">
          <Moon className="h-8 w-8 text-slate-200" />
        </motion.div>
      )}
    </motion.div>
  ),

  clouds: () => (
    <motion.div variants={weatherAnimations.item} className="relative" aria-label="Cloudy weather">
      <Cloud className="h-8 w-8 text-slate-300" />
      <motion.div
        className="absolute -left-3 top-1"
        animate={{
          x: [0, 3, 0],
          transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
        }}
      >
        <Cloud className="h-6 w-6 text-slate-400/80" />
      </motion.div>
    </motion.div>
  ),

  rain: () => (
    <motion.div variants={weatherAnimations.item} className="relative" aria-label="Rainy weather">
      <CloudRain className="h-8 w-8 text-blue-300" />
      <div className="absolute bottom-0 left-1 right-1 h-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 bg-blue-300 w-[2px] h-[7px] rounded-full opacity-0"
            style={{ left: `${25 + i * 20}%` }}
            variants={weatherAnimations.rain}
            animate="animate"
            initial="initial"
            custom={i}
          />
        ))}
      </div>
    </motion.div>
  ),

  snow: () => (
    <motion.div variants={weatherAnimations.item} className="relative" aria-label="Snowy weather">
      <Snowflake className="h-8 w-8 text-blue-200" />
      <div className="absolute bottom-0 left-0 right-0 h-8">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 bg-blue-200 w-[3px] h-[3px] rounded-full opacity-0"
            style={{ left: `${25 + i * 20}%` }}
            variants={weatherAnimations.snow(i)}
            animate="animate"
            initial="initial"
            custom={i}
          />
        ))}
      </div>
    </motion.div>
  ),

  thunderstorm: () => (
    <motion.div variants={weatherAnimations.item} className="relative" aria-label="Thunderstorm weather">
      <CloudLightning className="h-8 w-8 text-amber-300" />
      <motion.div
        className="absolute inset-0"
        variants={weatherAnimations.lightning}
        animate="animate"
        initial="initial"
      >
        <CloudLightning className="h-8 w-8 text-amber-200" />
      </motion.div>
    </motion.div>
  ),

  mist: () => (
    <motion.div variants={weatherAnimations.item} className="relative" aria-label="Misty weather">
      <CloudMist className="h-8 w-8 text-slate-300" />
      <motion.div
        className="absolute inset-0 opacity-30"
        variants={weatherAnimations.mist}
        animate="animate"
        initial="initial"
      >
        <CloudMist className="h-8 w-8 text-slate-300" />
      </motion.div>
    </motion.div>
  ),

  unknown: () => (
    <motion.div variants={weatherAnimations.item} aria-label="Unknown weather condition">
      <Thermometer className="h-8 w-8 text-slate-300" />
    </motion.div>
  ),
};

const getWeatherIcon = (type, isDay) => {
  const IconComponent = AnimatedWeatherIcons[type] || AnimatedWeatherIcons.unknown;
  return <IconComponent isDay={isDay} />;
};

// Small static icons for the 5-day forecast row
const ForecastIcon = ({ type }) => {
  const cls = 'h-5 w-5';
  switch (type) {
    case 'clear':
      return <Sun className={`${cls} text-amber-300`} />;
    case 'clouds':
      return <Cloud className={`${cls} text-slate-300`} />;
    case 'rain':
      return <CloudRain className={`${cls} text-blue-300`} />;
    case 'snow':
      return <Snowflake className={`${cls} text-blue-200`} />;
    case 'thunderstorm':
      return <CloudLightning className={`${cls} text-amber-300`} />;
    case 'mist':
      return <CloudMist className={`${cls} text-slate-300`} />;
    default:
      return <Thermometer className={`${cls} text-slate-300`} />;
  }
};

// Collapse the 3-hour/5-day forecast list into one entry per day
// (picks the entry closest to midday for each of the next 5 days)
const buildDailyForecast = (list) => {
  const days = {};
  list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const key = date.toISOString().slice(0, 10);
    const hour = date.getHours();
    if (!days[key]) days[key] = { entries: [], temps: [] };
    days[key].entries.push({ entry, distanceFromNoon: Math.abs(hour - 12) });
    days[key].temps.push(entry.main.temp);
  });

  const todayKey = new Date().toISOString().slice(0, 10);
  return Object.keys(days)
    .filter((key) => key !== todayKey)
    .sort()
    .slice(0, 5)
    .map((key) => {
      const day = days[key];
      const best = day.entries.sort((a, b) => a.distanceFromNoon - b.distanceFromNoon)[0].entry;
      return {
        key,
        weekday: new Date(`${key}T12:00:00`).toLocaleDateString('en-US', { weekday: 'short' }),
        weatherType: mapWeatherType(best.weather[0].main),
        high: Math.round(Math.max(...day.temps)),
        low: Math.round(Math.min(...day.temps)),
      };
    });
};

// Loading skeleton for the weather widget
const WeatherSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex justify-between items-center mb-2">
      <div className="bg-white/10 h-8 w-8 rounded-full" />
      <div className="bg-white/10 h-6 w-6 rounded-full" />
    </div>
    <div className="space-y-2">
      <div className="bg-white/10 h-10 w-16 rounded-md" />
      <div className="flex items-center">
        <div className="bg-white/10 h-3 w-4 rounded-sm mr-1" />
        <div className="bg-white/10 h-3 w-20 rounded-sm" />
      </div>
      <div className="bg-white/10 h-3 w-32 rounded-sm" />
    </div>
  </div>
);

const WeatherWidget = ({ city, isCelsius, onToggleUnit }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshingDebounced, setIsRefreshingDebounced] = useState(false);

  const fetchWeather = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const statusCode = response.status;
        if (statusCode === 401) {
          throw new Error('Invalid API key. Please check the OpenWeather API credentials');
        } else if (statusCode === 404) {
          throw new Error(`"${city}" not found. Please try a different city`);
        } else if (statusCode === 429) {
          throw new Error('API call limit exceeded. Please try again later');
        }
        throw new Error(`Weather API error (${statusCode}): ${response.statusText}`);
      }

      const data = await response.json();
      const now = new Date();
      const formattedDateTime = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      }).format(now);

      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        weatherType: mapWeatherType(data.weather[0].main),
        description: data.weather[0].description,
        dateTime: formattedDateTime,
        isDay: data.weather[0].icon.includes('d'),
      });
      setError(null);

      // 3-hour / 5-day forecast for the same coordinates
      try {
        const { lat, lon } = data.coord;
        const forecastRes = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (forecastRes.ok) {
          const forecastData = await forecastRes.json();
          setForecast(buildDailyForecast(forecastData.list));
        } else {
          setForecast([]);
        }
      } catch {
        setForecast([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
      setInitialLoad(false);
      setRefreshing(false);
    }
  }, [city]);

  // Debounced refresh button handler
  const handleRefreshClick = useCallback(() => {
    if (isRefreshingDebounced) return;
    setIsRefreshingDebounced(true);
    fetchWeather();
    setTimeout(() => setIsRefreshingDebounced(false), 1000);
  }, [isRefreshingDebounced, fetchWeather]);

  useEffect(() => {
    setLoading(true);
    fetchWeather();
    // Refresh every 15 minutes
    const interval = setInterval(fetchWeather, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchWeather]);

  const displayTemp = weather ? convertTemp(weather.temperature, isCelsius) : null;

  return (
    <div
      className="w-80 p-2 overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-white/[0.05] supports-[backdrop-filter]:backdrop-blur-md"
      role="region"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Weather information"
    >
      <div className="p-4 text-white">
        <AnimatePresence mode="wait">
          {loading ? (
            initialLoad ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <WeatherSkeleton />
              </motion.div>
            ) : (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center p-4"
                aria-label="Loading weather data"
              >
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
              </motion.div>
            )
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 text-center"
              role="alert"
            >
              <p className="text-sm text-red-400 mb-2">{error}</p>
              <button
                onClick={handleRefreshClick}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-white/15 hover:bg-white/10 transition-colors h-8 px-3 py-2 disabled:pointer-events-none disabled:opacity-50"
                aria-label="Refresh weather data"
                disabled={isRefreshingDebounced}
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>Try Again</span>
              </button>
            </motion.div>
          ) : (
            weather && (
              <motion.div
                key={`weather-${weather.city}`}
                variants={weatherAnimations.container}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0 }}
                aria-label={`Current weather in ${weather.city}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="text-3xl">
                    {getWeatherIcon(weather.weatherType, weather.isDay)}
                  </div>
                  <motion.button
                    variants={weatherAnimations.item}
                    onClick={onToggleUnit}
                    className="text-gray-400 hover:text-white transition-colors rounded-full px-2 py-1 text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    aria-label={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
                    title={`Switch to ${isCelsius ? 'Fahrenheit' : 'Celsius'}`}
                  >
                    {refreshing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                      >
                        <RefreshCw size={14} />
                      </motion.div>
                    ) : (
                      <span>°{isCelsius ? 'F' : 'C'}</span>
                    )}
                  </motion.button>
                </div>
                <div className="space-y-1">
                  <motion.div
                    variants={weatherAnimations.item}
                    className="text-5xl font-extralight"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    aria-label={`Temperature: ${displayTemp} degrees ${isCelsius ? 'celsius' : 'fahrenheit'}`}
                  >
                    {displayTemp}
                    <span className="text-3xl">°{isCelsius ? 'C' : 'F'}</span>
                  </motion.div>
                  <motion.div
                    variants={weatherAnimations.item}
                    className="flex items-center text-sm text-gray-400"
                  >
                    <MapPin size={12} className="mr-1" aria-hidden="true" />
                    <span>{weather.city}</span>
                  </motion.div>
                  <motion.div
                    variants={weatherAnimations.item}
                    className="text-sm text-gray-400 capitalize"
                  >
                    {weather.description}
                  </motion.div>
                  <motion.div variants={weatherAnimations.item} className="text-sm text-gray-400">
                    {weather.dateTime}
                  </motion.div>
                </div>

                {/* 5-day forecast (from the 3-hour forecast API) */}
                {forecast.length > 0 && (
                  <motion.div
                    variants={weatherAnimations.item}
                    className="mt-4 pt-3 border-t border-white/10 grid grid-cols-5 gap-1"
                    aria-label="5-day forecast"
                  >
                    {forecast.map((day) => (
                      <div key={day.key} className="flex flex-col items-center gap-1">
                        <span className="text-sm text-gray-400">{day.weekday}</span>
                        <ForecastIcon type={day.weatherType} />
                        <span className="text-sm text-white font-medium">
                          {convertTemp(day.high, isCelsius)}°
                        </span>
                        <span className="text-sm text-gray-500">
                          {convertTemp(day.low, isCelsius)}°
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Self-contained weather card: search + widget + state, no section wrapper.
// Used alongside the Market Snapshot card.
export const WeatherCard = () => {
  const [city, setCity] = useState('Garden Grove');
  const [isCelsius, setIsCelsius] = useState(true);

  const handleCityChange = (e) => {
    e.preventDefault();
    const newCity = e.target.city.value.trim();
    if (newCity) {
      setCity(newCity);
      e.target.city.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* City Search */}
      <form onSubmit={handleCityChange} className="mb-6 w-full">
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            name="city"
            placeholder="Enter city name..."
            className="flex-1 px-4 py-2 rounded-full border border-white/10 bg-white/5 supports-[backdrop-filter]:backdrop-blur-md text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30 shadow-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-black bg-neutral-100 hover:bg-white shadow motion-safe:transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Weather Widget */}
      <WeatherWidget
        city={city}
        isCelsius={isCelsius}
        onToggleUnit={() => setIsCelsius((c) => !c)}
      />
    </div>
  );
};

const Weather = () => (
  <section className="relative py-16 overflow-hidden">
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <AnimatedHeading text="Weather" className="mt-4" />
      </div>
      <WeatherCard />
    </div>
  </section>
);

export default Weather;
