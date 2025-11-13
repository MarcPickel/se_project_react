import "./ItemCard.css";
import { useState } from "react";

function ItemCard({ item, onCardClick, onCardLike, onLike }) {
  const [isActive, setIsActive] = useState(false);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike(item);
    setIsActive(true);
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
