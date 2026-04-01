import { useEffect, useState, useCallback } from "react";
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

import { filterWeatherData, fetchWeatherData } from "../../utils/weatherApi";
import VideoPlayer from "../Video/Video.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
// import { getAllClothingItems, addClothingItem } from "../../utils/api.js";
import { register, authorize, getUserInfo } from "../../utils/auth.js";
function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    city: "",
    weather: "",
    isDay: "",
    condition: "",
    temp: { "°C": 999, "°F": 999 },
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({});

  const handleActiveModal = useCallback(() => {
    setActiveModal("add-garment");
  }, []);

  const handlePreviewModal = useCallback((data) => {
    setActiveModal("preview");
    setSelectedCard(data);
  }, []);

  const handleAddRegistration = useCallback(() => {
    setActiveModal("register");
  }, []);

  const handleLogIn = useCallback(() => {
 setActiveModal("login");
  }, []);

  const handleOpenProfileUpdate = useCallback(() => {
    setActiveModal("profile");
  }, []);
  const handleCloseModal = useCallback(() => {
    setActiveModal("");
  }, []);

  const handleSubmitAddItem = useCallback(
    (data) => {
      // We MUST return the fetch call so the Modal can use .then()
      return addClothingItem(data)
        .then((newItem) => {
          // SUCCESS: Update the local state so the new card appears!
          setClothingItems((prevItems) => [newItem, ...prevItems]);

          // Return newItem again so the NEXT .then() in the Modal gets the data
          return newItem;
        })
        .catch((err) => {
          console.error("API Error:", err);
          throw err; // Re-throw so the Modal's .catch() triggers
        });
    },
    [setClothingItems], // handleCloseModal isn't strictly needed here since Modal handles it
  );

  const handleDeleteModalOpen = useCallback((data) => {
    setActiveModal("delete");
    setSelectedCard(data);
    console.log("Form submitted, but page refresh prevented!");
  }, []);

  const handleDeleteClothingtem = useCallback(
    (data) => {
      console.log("DELETED CLOTYHING ITEM");
      console.log(data);
    },
    [handleCloseModal],
  );

  const handleSubmitRegister = useCallback((data) => {
    return register(data).then((data) => {
      setCurrentUser(data);
      console.log(data);
    }).catch((err) => {
      console.error(err);
    });
  }, []);

  const handleSubmitLogIn = (data) => {
   return authorize(data).then((newdata) => {
   
     const token = newdata.data;
     console.log(token);
    }).catch((err) => {
      console.error(err);
    })

   };

  const handleProfileUpdate = ({ nameProfile, avatarUrl }) => {
    console.log("App.js received:", { nameProfile, avatarUrl });

    return new Promise((resolve, reject) => {
      const isSuccessful = true;

      setTimeout(() => {
        if (isSuccessful) {
          const newItem = {
            nameProfile: nameProfile, // Use 'name' instead of 'values.name'
            avatarUrl: avatarUrl, // Use 'weatherType' instead of 'values.weatherType'
            _id: String(Math.random()),
          };

          resolve(newItem);
        } else {
          reject("Server Error");
        }
      }, 1000);
    });
  };

  //This switches temperature unit through out the components.
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "°F" ? "°C" : "°F");
  };

  useEffect(() => {
    fetchWeatherData()
      .then((data) => filterWeatherData(data))
      .then((newData) => {
        setWeatherData(newData);
      })
      .catch((err) => console.error("Effect Error:", err));
  }, []);

  useEffect(() => {
    // getAllClothingItems()
    //   .then((data) => {
    //     return data
    //       ? setClothingItems(data)
    //       : Promise.reject("Error: server error");
    //   })
    //   .catch((err) => console.error(err));
  }, []);

    useEffect(() => {
    // getUserInfo()
    //   .then((data) => {
    //   console.log(data)
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleActiveModal={handleActiveModal}
            handleAddRegistration={handleAddRegistration}
            handleLogIn={handleLogIn}
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
                  handleOpenProfileUpdate={handleOpenProfileUpdate}
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
          <VideoPlayer />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
