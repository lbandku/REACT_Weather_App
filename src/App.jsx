import { useState, useEffect } from 'react';
import{fetchCoordinates,fetchWeather} from './utils/api';
// import './App.css';

function App() {

const[weather, setWeather]=useState(null);
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

return(
  <div>
    <h1>Weather App</h1>
    {weather ?(
      <div>
        <h2>{weather.name}</h2>
        <p>{weather.main.temp}°F</p>
        <p>{weather.weather[0].description}</p>
      </div>
    ):(
      <p>Loading weather...</p>

    )}
  </div>
);
}

export default App;




