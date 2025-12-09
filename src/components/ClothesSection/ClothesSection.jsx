import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClick,
  onCardLike,
}) {
  const { userData } = useContext(CurrentUserContext);
  const userItems = userData
    ? clothingItems.filter((item) => item.owner === userData._id) : [];

  return (
    <div className="clothes-section">
      <div className="clothes-section__text-group">
        <p className="clothes-section__text">Your items</p>
        <button
          onClick={onAddClick}
          type="button"
          className="clothes-section__add-button"
        >
          + Add new
        </button>
      </div>
      <div>
        {userItems.length > 0 && (
          <ul className="clothes-section__items">
            {userItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ClothesSection;
