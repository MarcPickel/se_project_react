import "./WeatherCard.css";
import cloudy from "../../assets/cloudy.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temperature">75&deg;F</p>
      <img className="weather-card__condition" src={cloudy} alt="Cloudy" />
    </section>
  );
}

export default WeatherCard;
