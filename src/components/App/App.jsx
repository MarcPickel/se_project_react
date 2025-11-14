import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

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

import { setToken, getToken } from "../../utils/token.js";

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

  // Move isLiked useState up to here when done

  const navigate = useNavigate();
  const location = useLocation();

  // Auth App Methods
  const onSignupClick = () => {
    setActiveModal("signup");
  };

  const onSigninClick = () => {
    setActiveModal("signin");
  };

  const onRegClick = () => {
    onClose();
    setActiveModal("signup");
  };

  const onLogClick = () => {
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

  const onAddItem = (inputValues) => {
    const newCardData = {
      _id: inputValues._id,
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.imageUrl,
    };
    setClothingItems([newCardData, ...clothingItems]);
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
    let card = selectedCard;
    setActiveModal("deleteConfirmation");
    return card;
  };

  const handleCardDelete = () => {
    let id = selectedCard._id;
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
    return auth.register(email, password, name, avatar).then(() => {
      return handleSignin({ email, password });
    });
  };

  const handleSignin = ({ email, password }) => {
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
      return data;
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
  const handleCardLike = (item) => {
    const token = getToken();
    const isLiked =
      userData && item.likes && item.likes.some((id) => id === userData._id);

    const updateCard = (res) => {
      const updatedCard = res?.data || res;
      if (updatedCard && updatedCard._id) {
        setClothingItems((cards) =>
          cards.map((card) => {
            if (card._id === item._id) {
              return { ...card, ...updatedCard };
            }
            return card;
          })
        );
      } else {
        setClothingItems((cards) =>
          cards.map((card) => {
            if (card._id === item._id) {
              const newLikes = isLiked
                ? (card.likes || []).filter((id) => id !== userData._id)
                : [...(card.likes || []), userData._id];
              return { ...card, likes: newLikes };
            }
            return card;
          })
        );
      }
    };

    !isLiked
      ? addCardLike(item._id, token)
          .then(updateCard)
          .catch((err) => {
            console.log("Error adding like:", err);
          })
      : removeCardLike(item._id, token)
          .then(updateCard)
          .catch((err) => {
            console.log("Error removing like:", err);
          });
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
      .catch(console.error);
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
    <CurrentUserContext.Provider value={userData}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              onAddClick={onAddClick}
              weatherData={weatherData}
              userData={userData}
              isLoggedIn={isLoggedIn}
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
                      userData={userData}
                      onAddClick={onAddClick}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
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
            onLogClick={onLogClick}
            onOverlayClose={handleOverlayClose}
            handleSignup={handleSignup}
          />
          <LoginModal
            isOpen={activeModal === "signin"}
            buttonText={"Next"}
            regText={"or Register"}
            onClose={onClose}
            onRegClick={onRegClick}
            onOverlayClose={handleOverlayClose}
            handleSignin={handleSignin}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            buttonText={"Save changes"}
            onClose={onClose}
            onOverlayClose={handleOverlayClose}
            editProfile={editProfile}
            onEditProfile={onEditProfile}
          />
          <AddItemModal
            buttonText="Add garment"
            isOpen={activeModal === "add-garment"}
            onClose={onClose}
            onAddItem={onAddItem}
            onOverlayClose={handleOverlayClose}
            postItems={postItems}
          />
          <ItemModal
            name="preview"
            activeModal={activeModal}
            card={selectedCard}
            onClose={onClose}
            onOverlayClose={handleOverlayClose}
            onConfirm={openConfirmationModal}
          />
          <DeleteConfirmationModal
            name="deleteConfirmation"
            activeModal={activeModal}
            onCardDelete={handleCardDelete}
            onClose={onClose}
            removeItems={removeItems}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
