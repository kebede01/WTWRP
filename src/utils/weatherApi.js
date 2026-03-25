import { coordinates } from "./constants";

const  fetchWeatherData = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { lat, lng } = coordinates;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
}

const filterWeatherData = (data) => {
  let filteredData = {};
 
  filteredData.temperature = { "°C": data.main.temp, "°F": Math.round((data.main.temp * 9/5) + 32) };
  filteredData.condition = data.weather[0].main;
  filteredData.isDayTime = isDayTime(data);
  filteredData.weather = getWeatherCondition(filteredData);
  filteredData.city = data.name;

  filteredData.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  return filteredData;
}
const getWeatherCondition = (data) => {
  if (data.temperature["°F"] > 86) {
    return "hot";
  } else if (data.temperature["°F"] > 66 && data.temperature["°F"] < 86) {
    return "warm";  
  } else {
    return "cold";
  }
}

const isDayTime = (data) => {
  const currentTime = new Date().getTime() / 1000;      
  return currentTime > data.sys.sunrise && currentTime < data.sys.sunset;
}

export { filterWeatherData, fetchWeatherData };