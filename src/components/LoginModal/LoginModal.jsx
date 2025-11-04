import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function LoginModal({ isOpen, onClose, onOverlayClose, buttonText }) {
  const defaultValues = { email: "", password: "", name: "", imageUrl: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    postItems(values)
      .then((newItem) => {
        onAddItem(newItem);
        onClose();
        handleReset(evt);
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      name="login"
      title="Login"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image
        <input
          id="imageURL"
          type="url"
          name="imageUrl"
          className="modal__input"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />{" "}
          Hot
          <span className="modal__radio-span_type_black"></span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />{" "}
          Warm
          <span className="modal__radio-span_type_black"></span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weather"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />{" "}
          Cold
          <span className="modal__radio-span_type_black"></span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default LoginModal;
