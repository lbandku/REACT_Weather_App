import { useState, useEffect } from 'react';
import{fetchCoordinates,fetchWeather} from './utils/api';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import './App.css';


// Call API using useEffect
function App() {

const[weather, setWeather]=useState(null);
const[searchTerm, setSearchTerm]=useState('');
const defaultLocation='Milan, Italy';

useEffect(()=>{
  const loadDefaultWeather=async()=>{
    try{
      const{lat,lon}=await fetchCoordinates(defaultLocation);
      const weatherData=await fetchWeather(lat,lon);
      setWeather(weatherData);
    } catch(error){
      console.error('Default weather load error:',error);
    }
  };

  loadDefaultWeather();
},[]);


// Weather Search Bar: let user type city/zip/address/landmark, submit, trigger a new weather lookup using existing API functions
  const handleSearch = async (e) => {
    e.preventDefault(); //prevents page reload

    if (!searchTerm) return;

    try {
      const {lat, lon} = await fetchCoordinates(searchTerm);
      const weatherData = await fetchWeather(lat, lon);
      setWeather(weatherData);
      setSearchTerm(''); // clears input after successful.
    } catch (error) {
      console.error('Search error:', error);
      alert('Weather not found for that location.');
    }
  };


  return(
    <div className="app-container">   {/* full page wrapper */}
      <div className="scale-wrapper">   {/* only scales the card/dashboard content */}
        <div className='="app-content'>   {/* white card with shadow, etc */}
          <h1>Weather App</h1>
      
          <SearchBar
           searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           onSearch={handleSearch}
          />

          <WeatherCard weather={weather} />
        </div>
      </div>
    </div>
  );
}

export default App;










