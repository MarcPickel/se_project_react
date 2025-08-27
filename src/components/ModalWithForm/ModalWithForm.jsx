import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.png";

function ModalWithForm() {
  return (
    <div className="modal">
      <form className="modal__form">
        <h2 className="modal__title">New garment</h2>
        <button className="modal__close" type="button" src={closeIcon}></button>
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
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input id="warm" type="radio" className="modal__radio-input" /> Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input id="cold" type="radio" className="modal__radio-input" /> Cold
          </label>
        </fieldset>
        <button className="modal__submit-button" type="submit">
          Add garment
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
