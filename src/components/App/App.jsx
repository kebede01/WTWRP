import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import { useState } from "react";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({ weather: "hot" })
  const [activeModal, setActiveModal] = useState("");
  
  const handleActiveModal = () => {
    setActiveModal("add garment");
  }
  
  const handleCloseModal = () => {
     setActiveModal("");
  }
  return (
    <div className="page">
      <div className="page__content">
        <Header handleActiveModal={handleActiveModal} />
        <Main clothingItems={clothingItems} weatherData={weatherData} />
        <AddItemModal activeModal={activeModal} handleCloseModal={handleCloseModal } />
      </div>
    </div>
  );
}

export default App;
