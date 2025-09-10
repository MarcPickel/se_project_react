import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import { defaultClothingItems } from "../../utils/clothingItems.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const onAddClick = () => {
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      link: inputValues.link,
      weather: inputValues.weatherType,
    };
    setClothingItems([...clothingItems, newCardData]);
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

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
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
              path="/se_project_react"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            ></Route>
            <Route
              path="/se_project_react/profile"
              element={<Profile></Profile>}
            ></Route>
          </Routes>
          <Footer />
        </div>
        <ModalWithForm></ModalWithForm>
        <AddItemModal
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={onClose}
          onAddItem={onAddItem}
          onOverlayClose={handleOverlayClose}
        ></AddItemModal>
        <ItemModal
          name="preview"
          activeModal={activeModal}
          card={selectedCard}
          onClose={onClose}
          onOverlayClose={handleOverlayClose}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
