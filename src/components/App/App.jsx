import { useEffect, useState, useCallback } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
// import { getAllClothingItems, addClothingItem } from "../../utils/api.js";
import { register, authorize, getUserInfo, signOut } from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import * as tokenStore from "../../utils/token.js";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleActiveModal = useCallback(() => {
    setActiveModal("add-garment");
  }, []);

  const handlePreviewModal = useCallback((data) => {
    setActiveModal("preview");
    setSelectedCard(data);
  }, []);

  const handleAddRegistration = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const handleLogIn = useCallback(() => {
    // Instead of setActiveModal("login"), we move the user to the route
    navigate("/login");
  }, [navigate]);

  const handleCloseModal = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleOpenProfileUpdate = useCallback(() => {
    setActiveModal("profile");
  }, []);

  // function to logout
  const logOut = useCallback(() => {
  signOut() // Call the API function we just made
    .then(() => {
     setIsLoggedIn(false);
      setCurrentUser({});
       navigate("/");
       console.log("User logged out successfully");
    })
    .catch((err) => {
      console.error("Logout failed:", err);
    });
  }, [navigate]);
  
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

  const handleSubmitLogIn = useCallback(
    ({ email, password }) => {
      if (!email || !password) {
        return;
      }
      return authorize({ email, password })
        .then((newdata) => {
          tokenStore.setToken(newdata.data); //storing token in localStorage
          return getUserInfo(newdata.data).then((value) => {
            setIsLoggedIn(true);
            setCurrentUser(value.data);
            // Smart redirection logic
            const redirectedPath = location.state?.from?.pathname || "/profile";
            navigate(redirectedPath);
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [navigate, location, setIsLoggedIn, setCurrentUser],
  );

  const handleSubmitRegister = useCallback(
    ({ name, avatar, email, password }) => {
      return register({ name, avatar, email, password })
        .then(() => {
          return handleSubmitLogIn({ email, password });
        })
        .then(() => {
          // This only runs after a successful login
          handleCloseModal();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [handleSubmitLogIn, handleCloseModal],
  );

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
    // Calling setState synchronously within an effect can trigger cascading renders so, define a function to handle the wrap-up
    const jwt = tokenStore.getToken(); // Or however you retrieve it from localStorage
    const finishLoading = (loggedIn = false, user = {}) => {
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
      setIsLoading(false);
    };

    if (!jwt) {
      finishLoading(false);
      return;
    }

    getUserInfo(jwt)
      .then((res) => {
        finishLoading(true, res.data);
      })
      .catch((err) => {
        console.error(err);
        tokenStore.removeToken();
        finishLoading(false);
      });
  }, []); // Runs only once on mount
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <div className="page">
          <div className="page__content">
            <Header
              handleActiveModal={handleActiveModal}
              handleAddRegistration={handleAddRegistration}
              handleLogIn={handleLogIn}
              weatherData={weatherData}
            />
            {isLoading ? (
              <div className="loading-spinner">
                <p>Loading your closet...</p>
                {/* You can replace this with a real Spinner component */}
              </div>
            ) : (
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
                    <ProtectedRoute>
                      <Profile
                        clothingItems={clothingItems}
                        handlePreviewModal={() => {}} // This is a "No-Op" function. It does nothing but prevents the crash.
                        handleOpenProfileUpdate={handleOpenProfileUpdate}
                        logOut={logOut}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute anonymous>
                      <LoginModal
                        handleCloseModal={handleCloseModal}
                        title="Log In"
                        buttonText="Log In"
                        isOpen={true}
                        onSubmitLogIn={handleSubmitLogIn}
                      />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/register"
                  element={
                    <ProtectedRoute anonymous>
                      <RegisterModal
                        handleCloseModal={handleCloseModal}
                        title="Register"
                        buttonText="Register"
                        isOpen={true}
                        onSubmitRegister={handleSubmitRegister}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to={"/profile"} replace />
                    ) : (
                      <Navigate to={"/login"} replace />
                    )
                  }
                />
              </Routes>
            )}

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
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
