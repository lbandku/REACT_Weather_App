// src/components/WeatherCard.jsx
function WeatherCard({ weather }) {
  if (!weather) return <p>Loading weather...</p>;

  const { main, weather: weatherConditions, wind, sys } = weather;
  const temp = main.temp;
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const pressure = main.pressure;
  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
  const description = weatherConditions[0].description;
  const iconCode = weatherConditions[0].icon; // Use the weather icon code
  
  // Set the weather icon URL
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

  return (
    <div className="weather-card">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-info">
        <p className="temp">
            <i className="fas fa-temperature-high"></i> {temp}°F 
        </p>
        <p className="description">{description}</p>
        <img src={iconUrl} alt={description} />
      </div>
      <div className="weather-details">
        <h3>Weather Details</h3>
        <div className="details">
          <div className="detail">
            <i className="fas fa-sun"></i>
            <p>Sunrise:</p>
            <p>{sunrise}</p>
          </div>
          <div className="detail">
            <i className="fas fa-moon"></i>
            <p>Sunset:</p>
            <p>{sunset}</p>
          </div>
          <div className="detail">
            <i className="fas fa-tint"></i>
            <p>Humidity:</p>
            <p>{humidity}%</p>
          </div>
          <div className="detail">
            <i className="fas fa-wind"></i>
            <p>Wind:</p>
            <p>{windSpeed} m/s</p>
          </div>
          <div className="detail">
            <i className="fas fa-tachometer-alt"></i>
            <p>Pressure:</p>
            <p>{pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;



