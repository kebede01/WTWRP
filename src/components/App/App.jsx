import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import { useState } from "react";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({weather: "hot"})
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main clothingItems={clothingItems} weatherData={weatherData} />
      </div>
    </div>
  );
}

export default App;
