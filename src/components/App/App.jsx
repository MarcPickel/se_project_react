import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";

import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import {
  getItems,
  postItems,
  removeItems,
  addCardLike,
  removeCardLike,
  editProfile,
} from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { setToken, getToken, removeToken } from "../../utils/token.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 451, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth App Methods
  const onSignupClick = () => {
    setActiveModal("signup");
  };

  const onSigninClick = () => {
    setActiveModal("signin");
  };

  const onRegisterClick = () => {
    onClose();
    setActiveModal("signup");
  };

  const onLoginClick = () => {
    onClose();
    setActiveModal("signin");
  };

  // General App Function Expressions
  const onAddClick = () => {
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      onClose();
    }
  };

  /*const onAddItem = (inputValues) => {
    const newCardData = {
      _id: inputValues._id,
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.imageUrl,
    };
    setClothingItems([newCardData, ...clothingItems]);
    onClose();
  };*/

  const onAddItem = (newItem) => {
    setClothingItems([newItem, ...clothingItems]);
    onClose();
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const openConfirmationModal = () => {
    setActiveModal("deleteConfirmation");
  };

  const handleCardDelete = () => {
    const id = selectedCard._id;
    const token = getToken();
    removeItems(id, token)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        onClose();
        setSelectedCard({});
      })
      .catch(console.error);
  };

  // Auth Handlers
  const handleSignup = ({ email, password, name, avatar }) => {
    console.log(email, password, name, avatar);
    return auth.register(email, password, name, avatar).then(() => {
      return handleSignin({ email, password });
    });
  };

  const handleSignin = ({ email, password }) => {
    console.log(email, password);
    if (!email || !password) {
      return Promise.reject("Email and password are required");
    }

    return auth.authorize(email, password).then((data) => {
      if (data.token) {
        setToken(data.token);
        setUserData(data.user);
        setIsLoggedIn(true);
        onClose();
      }
    });
  };

  // Edit Profile Handlers
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const onEditProfile = (inputValues) => {
    const newUserData = {
      ...userData,
      name: inputValues.name,
      avatar: inputValues.avatar,
    };
    setUserData(newUserData);
    onClose();
  };

  // Card Like Handler for API
  const handleCardLike = ({ _id, isLiked }) => {
    const token = getToken();

    !isLiked
      ? addCardLike(_id, token)
          .then((updatedCard) => {
            const card = updatedCard?.data || updatedCard;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? card : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(_id, token)
          .then((updatedCard) => {
            const card = updatedCard?.data || updatedCard;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? card : item))
            );
          })
          .catch(console.error);
  };

  // Effects Upon Main Entry
  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        console.log("Data from useEffect, getItems():", data);
        const itemsArray = Array.isArray(data?.data) ? data.data : [];
        setClothingItems(itemsArray);
      })
      .catch(console.error);
  }, []);

  // Check User's JWT
  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    auth
      .getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setUserData(user);
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        removeToken();
        setIsLoggedIn(false);
        setUserData(null);
      });
  }, []);

  // Escape Close Effect
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  // The WTWR App
  return (
    <CurrentUserContext.Provider
      value={{ userData, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              onAddClick={onAddClick}
              weatherData={weatherData}
              onSignupClick={onSignupClick}
              onSigninClick={onSigninClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={onAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            isOpen={activeModal === "signup"}
            buttonText={"Next"}
            logText={"or Log in"}
            onClose={onClose}
            onLoginClick={onLoginClick}
            handleSignup={handleSignup}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            buttonText={"Next"}
            regText={"or Register"}
            onClose={onClose}
            onRegisterClick={onRegisterClick}
            handleSignin={handleSignin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            buttonText={"Save changes"}
            onClose={onClose}
            editProfile={editProfile}
            onEditProfile={onEditProfile}
          />
          <AddItemModal
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={onClose}
            onAddItem={onAddItem}
            postItems={postItems}
          />
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={onClose}
            onConfirm={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "deleteConfirmation"}
            onCardDelete={handleCardDelete}
            onClose={onClose}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
