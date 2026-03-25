import { coordinates } from "./constants";

export const  fetchWeatherData = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { lat, lng } = coordinates;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEY}`;

  return fetch(url)
    .then((res) => {
     return res.ok ? res.json() : Promise.reject("Failed to fetch")
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      throw error;
    });
}

export const filterWeatherData = (data) => {
  let filteredData = {};
 
  filteredData.temp = { "°C": data.main.temp, "°F": Math.round((data.main.temp * 9/5) + 32) };
  filteredData.condition = data.weather[0].main.toLowerCase();
  filteredData.isDay = isDay(data.sys);
  filteredData.weather = getWeatherCondition(filteredData.temp["°F"]);
  filteredData.city = data.name;

return filteredData;
}
const getWeatherCondition = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature > 66 && temperature< 86) {
    return "warm";  
  } else {
    return "cold";
  }
}

const isDay = ({sunrise, sunset}) => {
  const currentTime = new Date().getTime() / 1000;      
  return currentTime > sunrise && currentTime < sunset;
}

