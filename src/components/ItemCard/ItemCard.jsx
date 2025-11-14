import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLiked =
    currentUser &&
    item.likes &&
    item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = "card__like-button_active";

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (evt) => {
    evt.stopPropagation();
    onCardLike(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__text">{item.name}</h2>
        <button
          className={`card__like-button ${
            isLiked ? itemLikeButtonClassName : ""
          }`}
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
