import "./WeatherCard.css";

import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
export default function WeatherCard({ weatherData}) {
  // 1. Find the matching option object
  const foundOption = weatherOptions.find((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  // 2. Identify the fallback based on day/night
  const fallback = weatherData.isDay ? defaultWeatherOptions.day : defaultWeatherOptions.night;

  // 3. Select the final object (NOT just the URL string)
  const weatherOption = foundOption || fallback;
  return (
    <section className="weather-card">
      <p className="weather-card__text">{`${weatherData.temp["°F"]}°F`}</p>
      <img src={weatherOption?.url} alt={`${weatherOption?.condition}-weather-image`} className="weather-card__img" />
    </section>
  );
}
