import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  console.log("ItemCard/Item:", item);

  const isLiked =
    item.likes?.some((id) => id === currentUser.userData?._id) ?? false;
  const itemLikeButtonClassName = "card__like-button_active";

  const handleLike = (evt) => {
    evt.preventDefault();
    onCardLike({ _id: item._id, isLiked });
  };

  const handleCardImageClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <div className="card__info">
        <h2 className="card__text">{item.name}</h2>
        {currentUser.isLoggedIn && (
          <button
            className={`card__like-button ${
              isLiked ? itemLikeButtonClassName : ""
            }`}
            type="button"
            onClick={handleLike}
          ></button>
        )}
      </div>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardImageClick}
      />
    </li>
  );
}

export default ItemCard;
