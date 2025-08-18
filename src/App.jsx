// Import REACT hooks and modules
import { useState, useEffect } from 'react';
import{fetchCoordinates,fetchWeather} from './utils/api';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import weatherImage from './assets/weather.jpg';
import './App.css';


// Main App Component; call API using useEffect
function App() {

//App state variables
const[weather, setWeather]=useState(null);  // Stores current weather data
const[searchTerm, setSearchTerm]=useState('');  // Stores search input value
const [darkMode, setDarkMode] = useState(false);  // Toggles light/dark theme
const [isRotating, setIsRotating] = useState(false);  // Controls icon animation

const defaultLocation='White House';   // Default location to show on initial load

// Force Page Title change in web browser tab
  useEffect(() => {
    document.title = 'WeatherSearch';  // Force browser tab title here
  }, []);

// Load default location on first render
useEffect(()=>{
  const loadDefaultWeather=async()=>{
    try{
      const{lat,lon}=await fetchCoordinates(defaultLocation);  // Get lat/lon from default location
      const weatherData=await fetchWeather(lat,lon);  // Get weather using lat/lon
      setWeather(weatherData);  // Set weather in state
    } catch(error){
      console.error('Default weather load error:',error);
    }
  };

  loadDefaultWeather();
},[]);



// Toggle dark mode class
  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Remove rotate animation class after rotate animation completes
  useEffect(() => {
    if (isRotating) {
      const timer = setTimeout(() => setIsRotating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isRotating]);

  // Dark mode toggle & start rotation animation
  const handleToggle = () => {
    setDarkMode(prev => !prev);
    setIsRotating(true);
  };


// Weather Search Bar: lets user type city/zip/address/landmark, submit, trigger a new weather lookup using existing API functions
  const handleSearch = async (e) => {
    e.preventDefault(); //prevents page reload

    if (!searchTerm) return;

    try {
      const {lat, lon} = await fetchCoordinates(searchTerm);  // Convert input to coordinates
      const weatherData = await fetchWeather(lat, lon);  // Fetch weather for new coordinates
      setWeather(weatherData);  // Update weather in state
      setSearchTerm(''); // clears input after successful search
    } catch (error) {
      console.error('Search error:', error);
      alert('Weather not found for that location.');
    }
  };


  return(
    <div className="app-container">   {/* full page wrapper */}
      <div className="scale-wrapper">   {/* only scales the card/dashboard content */}
        <div className="app-content"> 
        <button
          className="theme-toggle"
          onClick={handleToggle}  // triggers rotation
          aria-label="Toggle dark mode"
        >

  <i className={`bx ${darkMode ? 'bx-sun' : 'bx-moon'} ${isRotating ? 'rotate-animation' : ''}`}></i>
</button>

          <h1 className="app-title">WeatherSearch</h1>
          <p className="app-tagline">Real-Time Weather, Real Simple.</p>

          <img src={weatherImage} alt="Weather Image" className="app-image" />
    
          <h4 className="search-label">Search for weather:</h4>
          <SearchBar
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           onSearch={handleSearch}
          />

          <WeatherCard weather={weather} />
        </div>
      </div>
          {/* Copyright */}
    <footer className="app-footer">
      Handcrafted by Jax © twentytwenty-five.  All rights reserved.
    </footer>
    </div>
  );
}

export default App;

