import "./WeatherCard.css";
import weatherCard from "../../assets/images/weather-card.svg";
export default function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__text">75°F</p>
      <img src={weatherCard} alt="" className="weather-card__img" />
    </section>
  );
}
