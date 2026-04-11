export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/images/day-weather-img/clear.svg", import.meta.url)
      .href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/images/day-weather-img/cloud.svg", import.meta.url)
      .href,
  },
  {
    day: true,
    condition: "fog",
    url: new URL("../assets/images/day-weather-img/fog.svg", import.meta.url)
      .href,
  },
  {
    day: true,
    condition: "rain",
    url: new URL("../assets/images/day-weather-img/rain.svg", import.meta.url)
      .href,
  },
  {
    day: true,
    condition: "snow",
    url: new URL("../assets/images/day-weather-img/snow.svg", import.meta.url)
      .href,
  },
  {
    day: true,
    condition: "storm",
    url: new URL("../assets/images/day-weather-img/storm.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL(
      "../assets/images/night-weather-img/clear.svg",
      import.meta.url,
    ).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL(
      "../assets/images/night-weather-img/cloud.svg",
      import.meta.url,
    ).href,
  },
  {
    day: false,
    condition: "fog",
    url: new URL("../assets/images/night-weather-img/fog.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "rain",
    url: new URL("../assets/images/night-weather-img/rain.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "snow",
    url: new URL("../assets/images/night-weather-img/snow.svg", import.meta.url)
      .href,
  },
  {
    day: false,
    condition: "storm",
    url: new URL(
      "../assets/images/night-weather-img/storm.svg",
      import.meta.url,
    ).href,
  },
];
export const defaultWeatherOptions = {
  day: {
    url: new URL(
      "../assets/images/day-weather-img/default.svg",
      import.meta.url,
    ).href,
    condition: "clouds",
  },
  night: {
    url: new URL(
      "../assets/images/night-weather-img/default.svg",
      import.meta.url,
    ).href,
    condition: "clouds",
  },
};
