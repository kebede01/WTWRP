import { jest, test, expect } from '@jest/globals';
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// 1. Mock the constants before importing the component
jest.unstable_mockModule('../../utils/constants', () => ({
  weatherOptions: [
    { day: true, condition: "sunny", url: "sunny-url" },
    { day: false, condition: "cloudy", url: "night-cloudy-url" }
  ],
  defaultWeatherOptions: {
    day: { url: "default-day-url", condition: "default" },
    night: { url: "default-night-url", condition: "default" }
  }
}));

// 2. Import tools and component
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const mockWeatherData = {
  isDay: true,
  condition: "sunny",
  temp: { "°F": "75", "°C": "24" }
};

test("renders weather card with correct temp and matching image", async () => {
  // Dynamic import to pick up the mock
  const { default: WeatherCard } = await import("./WeatherCard");

  render(
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit: "°F" }}>
      <WeatherCard weatherData={mockWeatherData} />
    </CurrentTemperatureUnitContext.Provider>
  );

  // Check temperature text
  expect(screen.getByText(/75 °F/i)).toBeInTheDocument();

  // Check if it found the 'sunny' image
  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "sunny-url");
  expect(image).toHaveAttribute("alt", "sunny-weather-image");
});

test("renders fallback image when condition is not found", async () => {
  const { default: WeatherCard } = await import("./WeatherCard");

  const unknownWeather = { ...mockWeatherData, condition: "tornado" };

  render(
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit: "°C" }}>
      <WeatherCard weatherData={unknownWeather} />
    </CurrentTemperatureUnitContext.Provider>
  );

  // Check temperature conversion
  expect(screen.getByText(/24 °C/i)).toBeInTheDocument();

  // Check for fallback day image
  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "default-day-url");
});