import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, onChangeLike }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
    onChangeLike();
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__text">{item.name}</h2>
        <button
          className="card__like-button"
          type="button"
          onClick={handleLike}
        ></button>
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
