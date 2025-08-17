import axios from 'axios';

//fetch geocoords from LocationIQ API
export async function fetchCoordinates(location) {
  try {
    const isUSZip = /^\d{5}$/.test(location.trim());

    const paramsBase = {
      key: import.meta.env.VITE_GEOCODE_API_KEY,
      q: location,
      format: 'json',
      limit: 1,
    };

    // Function to do the API call with given params
    const geocode = async (params) => {
      const response = await axios.get('https://us1.locationiq.com/v1/search.php', { params });
      return response.data;
    };

    let data;

    if (isUSZip) {
      // Attempt US country filter first
      data = await geocode({ ...paramsBase, countrycodes: 'us' });

      if (!data || data.length === 0) {
        // Retry without country filter (global search)
        data = await geocode(paramsBase);
      }
    } else {
      // Not a zip code, do global search directly
      data = await geocode(paramsBase);
    }

    console.log("Geocode response:", data);

    if (!data || data.length === 0) {
      throw new Error("No geocoding results found for location: " + location);
    }

    const { lat, lon, display_name } = data[0];
    return { lat, lon, name: display_name };

  } catch (error) {
    console.error("Geocoding API error:", error);
    throw error;
  }
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

