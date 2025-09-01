import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { defaultClothingItems } from "../../utils/clothingItems.js";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 451 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [selectedClothes, setSelectedClothes] = useState(defaultClothingItems);

  const onAddClick = () => {
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  };

  const onAddSubmit = () => {
    setSelectedClothes([]);
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
      <div className="page__content">
        <Header onAddClick={onAddClick} weatherData={weatherData} />
        <Main
          weatherData={weatherData}
          handleCardClick={handleCardClick}
          selectedClothes={selectedClothes}
        />
        <Footer />
      </div>
      <ModalWithForm
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={onClose}
        onOverlayClose={handleOverlayClose}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            id="name"
            type="text"
            className="modal__input"
            placeholder="Name"
          ></input>
        </label>
        <label htmlFor="imageURL" className="modal__label">
          Image
          <input
            id="imageURL"
            type="url"
            className="modal__input"
            placeholder="Image URL"
          ></input>
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              name="weather"
              value="hot"
              type="radio"
              className="modal__radio-input"
            />{" "}
            Hot
            <span className="modal__radio-span_type_black"></span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              name="weather"
              value="warm"
              type="radio"
              className="modal__radio-input"
            />{" "}
            Warm
            <span className="modal__radio-span_type_black"></span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              name="weather"
              value="cold"
              type="radio"
              className="modal__radio-input"
            />{" "}
            Cold
            <span className="modal__radio-span_type_black"></span>
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        name="preview"
        activeModal={activeModal}
        card={selectedCard}
        onClose={onClose}
        onOverlayClose={handleOverlayClose}
      />
    </div>
  );
}

export default App;
