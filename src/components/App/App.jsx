import { useState, useEffect } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 451 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const onAddClick = () => {
    setActiveModal("add-garment");
  };
  const onClose = () => {
    setActiveModal("");
  };

  const handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("modal")) {
      setActiveModal("");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  /*useEffect(() => {
    function handleEscapeClose(evt) {
      if (evt.key === "Escape") {
        setActiveModal("");
      }
    }

    document.addEventListener("keydown", handleEscapeClose);

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  });*/

  return (
    <div className="page">
      <div className="page__content">
        <Header onAddClick={onAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        name="New garment"
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
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
            <input id="hot" type="radio" className="modal__radio-input" /> Hot
            <span className="modal__radio-span_type_black"></span>
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input" /> Warm
            <span className="modal__radio-span_type_black"></span>
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input" /> Cold
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
