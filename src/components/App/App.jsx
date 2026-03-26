import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import PreviewItemModal from "../PreviewItemModal/PreviewItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import Profile from "../Profile/Profile";
import { defaultClothingItems } from "../../utils/constants";
import { filterWeatherData, fetchWeatherData } from "../../utils/weatherApi";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [weatherData, setWeatherData] = useState({
    city: "",
    weather: "",
    isDay: "",
    condition: "",
    temp: { "°C": 999, "°F": 999 },
  });
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
      .then((data) => filterWeatherData(data))
      .then((newData) => {
        setWeatherData(newData);
      })
      .catch((err) => console.error("Effect Error:", err));
  }, []);
  console.log(weatherData);

  return (
    <div className="page">
      <div className="page__content">
        <Header
          handleActiveModal={handleActiveModal}
          handleAddRegistration={handleAddRegistration}
          handleLogIn={handleLogIn}
          handleProfileOpen={handleProfileOpen}
          weatherData={weatherData}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                weatherData={weatherData}
                handlePreviewModal={handlePreviewModal}
              />
            }
          />
          <Route
            path="/profile"
            element={<Profile clothingItems={clothingItems} />}
          />
        </Routes>

        <AddItemModal
          handleCloseModal={handleCloseModal}
          title="New garment"
          buttonText="Add garment"
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
          handleSubmitRegister={handleSubmitRegister}
        />

        <LoginModal
          handleCloseModal={handleCloseModal}
          title="Log In"
          buttonText="Log In"
          isOpen={activeModal === "login"}
          activeModal={activeModal}
          handleSubmitLogIn={handleSubmitLogIn}
        />

        <ProfileEditModal
          handleCloseModal={handleCloseModal}
          title="Edit Profile"
          buttonText="Edit profile"
          isOpen={activeModal === "profile"}
          activeModal={activeModal}
          handleProfileUpdate={handleProfileUpdate}
        />
      </div>
    </div>
  );
}

export default App;
