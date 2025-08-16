function WeatherCard({ weather }) {
  if (!weather) return <p>Loading weather...</p>;

  return (
    <div>
      <h2>{weather.name}</h2>
      <p>{weather.main.temp}°F</p>
      <p>{weather.weather[0].description}</p>
    </div>
  );
}

export default WeatherCard;


