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
import {
  getAllMyClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api.js";
import {
  register,
  authorize,
  getUserInfo,
  signOut,
  changeUserInfo,
} from "../../utils/auth.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import { apiItemLike, apiItemUnlike } from "../../utils/apiLikeDislike.js";
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
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("°F");
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(
    sessionStorage.getItem("isLoggedIn") === "true",
  );

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
    setActiveModal("");
    navigate("/");
  }, [navigate]);

  const handleOpenProfileUpdate = useCallback(() => {
    setActiveModal("profile");
  }, []);

  // function to logout
  const logOut = useCallback(() => {
    signOut() // Call the API function we just made
      .then(() => {
        console.log("Session terminated on the server side.");
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      })
      .finally(() => {
        sessionStorage.clear(); // Now this actually has something to remove!
        setIsLoggedIn(false);
        setCurrentUser({});
        navigate("/");
      });
  }, [navigate]);

  const handleSubmitAddItem = useCallback(
    (data) => {
      return addClothingItem(data)
        .then((newItem) => {
          setClothingItems((prevItems) => [newItem.data, ...prevItems]);
          return newItem.data;
        })
        .catch((err) => {
          console.error("API Error:", err);
          throw err; // Re-throw so the Modal's .catch() triggers
        });
    },
    [setClothingItems],
  );

  const handleDeleteModalOpen = useCallback((data) => {
    console.log("Opening Delete Modal with card:", data);
    setActiveModal("delete");
    setSelectedCard(data);
  }, []);

  const handleDeleteClothingItem = useCallback(
    (selectedCard) => {
      const itemId = selectedCard._id;

      return deleteClothingItem(itemId)
        .then(() => {
          setClothingItems((prevItems) =>
            prevItems.filter((item) => item._id !== selectedCard._id),
          );
          handleCloseModal();
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
    },
    [handleCloseModal],
  ); // Now this dependency array is truly correct

  const handleSubmitLogIn = useCallback(
    ({ email, password }) => {
      if (!email || !password) {
        return;
      }
      return authorize({ email, password })
        .then((newdata) => {
          return getUserInfo(newdata.data).then((value) => {
            setIsLoggedIn(true);
            setCurrentUser(value.data);
            // To make your session survive a page refresh
            sessionStorage.setItem("isLoggedIn", "true");
            // Smart redirection logic
            const redirectedPath = location.state?.from?.pathname || "/profile";
            navigate(redirectedPath);
          });
        })
        .catch((err) => {
          console.error(err);
          throw err; // <--- CRITICAL: This allows LoginModal to see the 429 error
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
        .then(() => {})
        .catch((err) => {
          console.error(err);
        });
    },
    [handleSubmitLogIn],
  );

  const handleCardLikesDislikes = ({ _id }, isLiked) => {
    // Determine which API call to make
    const request = !isLiked ? apiItemLike(_id) : apiItemUnlike(_id);
    request
      .then((updatedItem) => {
        // updatedItem.data should be the fresh item object from the server
        setClothingItems((prevItems) =>
          prevItems.map((item) => (item._id === _id ? updatedItem.data : item)),
        );
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
      });
  };

  const handleProfileUpdate = ({ name, avatar }) => {
    return changeUserInfo({ name, avatar })
      .then((user) => {
        setCurrentUser((prevValue) => {
          return { ...prevValue, ...user.data };
        });
      })
      .catch((err) => {
        console.error(err);
        throw err; // <--- CRITICAL: This allows LoginModal to see the 429 error
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
    //backend filters based on the logged user id obtained from auth.js middleware.
    getAllMyClothingItems()
      .then((value) => {
        return value
          ? setClothingItems(value.data)
          : Promise.reject("Error: server error");
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const finishLoading = (loggedIn = false, user = {}) => {
      setIsLoggedIn(loggedIn);
      setCurrentUser(user);
      setIsLoading(false);
    };
    getUserInfo()
      .then((res) => {
        finishLoading(true, res.data || res);
      })
      .catch((err) => {
        // 401 means the cookie was missing, expired, or invalid
        console.error(err);
        finishLoading(false);
      });
  }, []); // Runs only once on mount

  // 1. Get the current pathname from useLocation
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    // Now it checks for the string state OR the route path
    if (!activeModal && !isAuthRoute) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    const handleOverlayClick = (e) => {
      // If you use document listener, this check is tricky.
      // It's better to check if the click was exactly on the modal wrapper class.
      if (e.target.classList.contains("modal_opened")) {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, [activeModal, handleCloseModal, isAuthRoute]);

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
                      handleCardLikesDislikes={handleCardLikesDislikes}
                       handleActiveModal={handleActiveModal}
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
                        handleActiveModal={handleActiveModal}
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute anonymous>
                      <LoginModal
                        name="login"
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
                        name="register"
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
              name="add-item"
              handleCloseModal={handleCloseModal}
              title="New garment"
              buttonText="Add garment"
              isOpen={activeModal === "add-garment"}
              onSubmitAddItem={handleSubmitAddItem}
            />
            <PreviewItemModal
              handleCloseModal={handleCloseModal}
              selectedCard={selectedCard}
              activeModal={activeModal}
              onSubmitDelete={handleDeleteModalOpen}
            />

            <ProfileEditModal
              name="profile"
              handleCloseModal={handleCloseModal}
              title="Edit Profile"
              buttonText="Edit profile"
              isOpen={activeModal === "profile"}
              onProfileUpdate={handleProfileUpdate}
            />
            <DeleteModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "delete"}
              onDeleteClothingItem={handleDeleteClothingItem}
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
