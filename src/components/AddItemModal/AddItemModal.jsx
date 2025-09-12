import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm.js";

function AddItemModal({
  isOpen,
  onAddItem,
  onClose,
  onOverlayClose,
  buttonText,
}) {
  const defaultValues = { name: "", imageUrl: "", weatherType: "" };
  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      name="add-garment"
      title="New garment"
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
        ></input>
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
        ></input>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
          />{" "}
          Hot
          <span className="modal__radio-span_type_black"></span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
          />{" "}
          Warm
          <span className="modal__radio-span_type_black"></span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
          <span className="modal__radio-span_type_black"></span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
