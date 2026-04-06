import React, { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
function Main({
  clothingItems,
  weatherData,
  handlePreviewModal,
  weatherOptions,
  handleCardLikesDislikes,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} weatherOptions={weatherOptions} />
      <section className="cards">
        <p className="cards__text">{`Today is ${weatherData?.temp[currentTemperatureUnit]} ${currentTemperatureUnit} / You may want to wear:`}</p>
        <ul className="cards__list">
          {clothingItems &&
            clothingItems
              .filter((item) => {
                // Condition 1: Must match the current weather
                const matchesWeather = item?.weather === weatherData?.weather;
                // Condition 2: Must be owned by the current user
                const isOwn = item?.owner === currentUser?._id;

                return matchesWeather && isOwn;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    handlePreviewModal={handlePreviewModal}
                    handleCardLikesDislikes={handleCardLikesDislikes}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}
export default React.memo(Main);
