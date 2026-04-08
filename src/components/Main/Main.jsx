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
  handleActiveModal
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const filteredItems = (clothingItems || []).filter((item) => {
    const matchesWeather = item?.weather === weatherData?.weather;
    const isOwn = item?.owner === currentUser?._id;
    return matchesWeather && isOwn;
  });

  const hasVisibleItems = filteredItems.length > 0;
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} weatherOptions={weatherOptions} />
      <section className="cards">
        {hasVisibleItems ? (<>
           <p className="cards__text">{`Today is ${weatherData?.temp[currentTemperatureUnit]} ${currentTemperatureUnit} / You may want to wear:`}</p>
        <ul className="cards__list">
          {filteredItems .map(
      (item) => {
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
        </>) : (<div className="main__empty-state">
            {!isLoggedIn ? (
              <>
                <h2 className="main__empty-title">Your virtual closet is waiting!</h2>
                <p className="main__empty-text">
                  Log in or Register to start organizing your outfits based on the local weather.
                </p>
              </>
            ) : (
              <>
                <h2 className="main__empty-title">Your closet is empty</h2>
                <p className="main__empty-text">
                  You haven&lsquo;t added any clothing for <strong>{weatherData?.weather}</strong> weather yet.
                </p>
                <button 
                  type="button" 
                  className="main__add-btn" 
                  onClick={handleActiveModal}
                >
                  + Add Clothing
                </button>
              </>
            )}
        </div>)}
       
      </section>
    </main>
  );
}
export default React.memo(Main);
