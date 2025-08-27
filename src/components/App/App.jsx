import { useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
  });

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm title="New garment" buttonText="Add garment">
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
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input id="hot" type="radio" className="modal__radio-input" /> Hot
              <span className="modal__radio-span_type_black"></span>
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input id="warm" type="radio" className="modal__radio-input" />{" "}
              Warm
              <span className="modal__radio-span_type_black"></span>
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio-input" />{" "}
              Cold
              <span className="modal__radio-span_type_black"></span>
            </label>
          </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
