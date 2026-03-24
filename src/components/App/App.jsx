import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import PreviewItemModal from "../PreviewItemModal/PreviewItemModal";
import { useState } from "react";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({ weather: "hot" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  console.log(selectedCard);
  console.log(activeModal);

  const handleActiveModal = () => {
    setActiveModal("add garment");
  };

  const handlePreviewModal = (data) => {
    setActiveModal("preview");
    setSelectedCard(data);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSubmitAddItem = (e) => {
    e.preventDefault();
    console.log("Form submitted, but page refresh prevented!");
  };
  const handleSubmitPreviewItem = (e) => {
    e.preventDefault();
    console.log("Form submitted, but page refresh prevented!");
  };
  
  // const handleSubmitRegister = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted, but page refresh prevented!");
  // };
  //  const handleLogIn = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted, but page refresh prevented!");
  // };
  //   const handleProfileUpdate = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted, but page refresh prevented!");
  // };
  return (
    <div className="page">
      <div className="page__content">
        <Header handleActiveModal={handleActiveModal} />
        <Main
          clothingItems={clothingItems}
          weatherData={weatherData}
          handlePreviewModal={handlePreviewModal}
        />
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "add garment"}
          activeModal={activeModal}
          handleSubmitAddItem={handleSubmitAddItem}
        />
        <PreviewItemModal
          handlePreviewModal={handlePreviewModal}
          handleCloseModal={handleCloseModal}
          buttonText="Delete card"
          title="Image preview"
          selectedCard={selectedCard}
          isOpen={activeModal === "preview"}
          activeModal={activeModal}
          handleSubmitPreviewItem={handleSubmitPreviewItem}
        />
      </div>
    </div>
  );
}

export default App;
