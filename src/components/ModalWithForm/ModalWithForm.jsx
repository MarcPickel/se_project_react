import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  title,
  buttonText,
  activeModal,
  onClose,
  onEscapeClose,
  onOverlayClose,
}) {
  return (
    <div
      onClick={onOverlayClose}
      onKeyDown={onEscapeClose}
      className={`modal ${
        activeModal === "add-garment" && "modal_opened"
      } modal_type_${name}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <form className="modal__form" name={`${name}`}>
          {children}
          <button className="modal__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
