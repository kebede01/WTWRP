import { useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import PreviewItemModal from "../PreviewItemModal/PreviewItemModal";
import RegisterModal from "../RegisterModal/RegisterModal"; 
import LoginModal from "../LoginModal/LoginModal";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import fetchWeatherData from "../../utils/weatherApi";
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

 const handleAddRegistration = () => {
    setActiveModal("register");
 };
  
 const handleLogIn = () => {
    setActiveModal("login");
  };

   const handleProfileOpen = () => {
    setActiveModal("profile");
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
  
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log("Form submitted, but page refresh prevented!");
  };
 
   const handleSubmitLogIn = (e) => {
    e.preventDefault();
    console.log("Form submitted, but page refresh prevented!");
   };
  
    const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Form submitted, but page refresh prevented!");
    };
  
  useEffect(() => {
    fetchWeatherData()
      .then(data => {
        setWeatherData(data);
        console.log("Weather Loaded:", data);
      })
      .catch(err => console.error("Effect Error:", err));
  }, []); // Empty array ensures it only runs once on mount

 

  return (
    <div className="page">
      <div className="page__content">
        <Header handleActiveModal={handleActiveModal}
          handleAddRegistration={handleAddRegistration}
          handleLogIn={handleLogIn}
          handleProfileOpen={handleProfileOpen}
        />
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
        <RegisterModal
           handleCloseModal={handleCloseModal}
          title="Register"
          buttonText="Register"
           isOpen={activeModal === "register"}
          activeModal={activeModal}
         handleSubmitRegister={handleSubmitRegister }
        />
 
        <LoginModal
          handleCloseModal={handleCloseModal}
            title="Log In"
          buttonText="Log In"
           isOpen={activeModal === "login"}
          activeModal={activeModal}
      handleSubmitLogIn={handleSubmitLogIn }
        />

        < ProfileEditModal
             handleCloseModal={handleCloseModal}
            title="Edit Profile"
          buttonText="Edit profile"
           isOpen={activeModal === "profile"}
          activeModal={activeModal}
      handleProfileUpdate ={handleProfileUpdate }
        />
      </div>
    </div>
  );
}

export default App;
