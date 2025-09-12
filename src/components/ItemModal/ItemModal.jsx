import "./ItemModal.css";

function ItemModal({
  activeModal,
  name,
  card,
  onClose,
  onOverlayClose,
  onConfirm,
}) {
  return (
    <div
      onClick={onOverlayClose}
      className={`modal ${
        activeModal === "preview" && "modal_opened"
      } modal_type_${name}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          className="modal__close"
          type="button"
        ></button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div>
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={onConfirm}
            type="button"
            className="modal__delete-button"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
