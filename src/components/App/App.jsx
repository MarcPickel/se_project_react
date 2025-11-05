import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import Profile from "../Profile/Profile.jsx";

import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";

import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import { getItems, postItems, removeItems } from "../../utils/api.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // Authority App Function Expressions
  const onRegClick = () => {
    setActiveModal("sign-up");
  };

  const onLogClick = () => {
    setActiveModal("login");
  };

  const onOpenAuth = () => {
    setIsButtonVisible(true);
  };

  const handleAuthButtonVis = () => {
    if ((activeModal = "sign-up || login")) {
      onOpenAuth();
    }
  };

  const onEmptyForm = () => {
    setIsButtonDisabled(true);
  };

  // General App Function Expressions
  const onAddClick = () => {
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
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

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      onClose();
    }
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
    removeItems(id)
      .then(() => {
        setClothingItems((prev) => prev.filter((item) => item._id !== id));
        onClose();
        setSelectedCard({});
      })
      .catch(console.error);
  };

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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

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

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header onAddClick={onAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={onAddClick}
                />
              }
            ></Route>
          </Routes>
          <Footer />
        </div>
        <RegisterModal
          isOpen={activeModal === "sign-up"}
          buttonText={"Next"}
          authText={"or Log in"}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          buttonText={"Next"}
          authText={"or Register"}
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
  );
}

export default App;
