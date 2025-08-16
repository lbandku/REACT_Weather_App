import axios from 'axios';

//fetch geocoords from PositionStack API
export async function fetchCoordinates(location){
    const response=await axios.get('http://api.positionstack.com/v1/forward',{
        params:{
            access_key: import.meta.env.VITE_GEOCODE_API_KEY,
            query: location,
            limit: 1,
            country: 'US', // gets PositionStack to render US zip codes as US cities
        }
});

const{latitude,longitude}=response.data.data[0];
return{lat:latitude, lon:longitude};
}


//fetch weather from OpenWeather API
export async function fetchWeather(lat,lon){
    const response=await axios.get('https://api.openweathermap.org/data/2.5/weather',{
        params:{
            lat,
            lon,
            units:'imperial',
            appid:import.meta.env.VITE_WEATHER_API_KEY
        }
    });
    return response.data;
}



