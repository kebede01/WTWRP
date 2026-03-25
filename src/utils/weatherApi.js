import location from "./constants";

export default function fetchWeatherData() {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { lat, lng } = location;
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