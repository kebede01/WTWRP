import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
export default function Main({ clothingItems, weatherData, handlePreviewModal,  weatherOptions  }) {
  return (
    <main className="main">
      <WeatherCard
        weatherData={weatherData}
       weatherOptions={ weatherOptions}
      />
      <section className="cards">
        <p className="cards__text">{`Today is ${weatherData.temp["°F"]} °F / You may want to wear:`}</p>
        <ul className="cards__list">
          {clothingItems && clothingItems
            .filter((item) => { return item.weather === weatherData.weather })
            .map((item) => {
              return <ItemCard key={item._id} item={item} handlePreviewModal={handlePreviewModal} />;
          })}
        </ul>
      </section>
    </main>
  );
}
