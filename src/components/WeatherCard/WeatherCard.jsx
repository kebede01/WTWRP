import "./WeatherCard.css";
import weatherCard from "../../assets/images/weather-card.svg";
export default function WeatherCard({weatherData}) {
  return (
    <section className="weather-card">
      <p className="weather-card__text">{`${weatherData.temperature["°F"]}°F`}</p>
      <img src={weatherCard} alt="" className="weather-card__img" />
    </section>
  );
}
