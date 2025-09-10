import "./ModalWithForm.css";

function ModalWithForm({
  children,
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onOverlayClose,
  onSubmit,
}) {
  return (
    <div
      onClick={onOverlayClose}
      className={`modal ${isOpen && "modal_opened"} modal_type_${name}`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} className="modal__close" type="button" />
        <form className="modal__form" name={`${name}`} onSubmit={onSubmit}>
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
