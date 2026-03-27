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
import DeleteModal from "../Delete/Delete";
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

  const handleActiveModal = () => {
    setActiveModal("add-garment");
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

  const handleSubmitAddItem = ({ name, image, weatherType }) => {
    console.log({ name, image, weatherType });
  };
  const handleDeleteModalOpen = (data) => {
   setActiveModal("delete");
  setSelectedCard(data);
    console.log("Form submitted, but page refresh prevented!");
  };

const handleDeleteClothingtem = (data) => {
  console.log("DELETED CLOTYHING ITEM");
    console.log(data);
   }

  const handleSubmitRegister = ({
    avatarRegister,
    nameRegister,
    passwordRegister,
    emailRegister,
  }) => {
    console.log({
      avatarRegister,
      nameRegister,
      passwordRegister,
      emailRegister,
    });
    
  };

  const handleSubmitLogIn = ({ email, password }) => {
    console.log({ email, password });
   
  };

  const handleProfileUpdate = ({ nameProfile, avatarUrl }) => {
    console.log({ nameProfile, avatarUrl });
   
  };

  

  useEffect(() => {
    fetchWeatherData()
      .then((data) => filterWeatherData(data))
      .then((newData) => {
        setWeatherData(newData);
      })
      .catch((err) => console.error("Effect Error:", err));
  }, []);
 

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
            element={
              <Profile
                clothingItems={clothingItems}
                handlePreviewModal={() => {}} // This is a "No-Op" function. It does nothing but prevents the crash.
              />
            }
          />
        </Routes>

        <AddItemModal
          handleCloseModal={handleCloseModal}
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onSubmitAddItem={handleSubmitAddItem}
        />
        <PreviewItemModal
          handleCloseModal={handleCloseModal}
          buttonText="Delete card"
          title="Image preview"
          selectedCard={selectedCard}
          isOpen={activeModal === "preview"}
          onSubmitDelete={handleDeleteModalOpen}
           
        />
        <RegisterModal
          handleCloseModal={handleCloseModal}
          title="Register"
          buttonText="Register"
          isOpen={activeModal === "register"}
          onSubmitRegister={handleSubmitRegister}
        />

        <LoginModal
          handleCloseModal={handleCloseModal}
          title="Log In"
          buttonText="Log In"
          isOpen={activeModal === "login"}
          onSubmitLogIn={handleSubmitLogIn}
        />

        <ProfileEditModal
          handleCloseModal={handleCloseModal}
          title="Edit Profile"
          buttonText="Edit profile"
          isOpen={activeModal === "profile"}
          onProfileUpdate={handleProfileUpdate}
        />
        <DeleteModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === "delete"}
          onDeleteClothingtem={handleDeleteClothingtem}
           selectedCard={selectedCard}
        />
      </div>
    </div>
  );
}

export default App;
