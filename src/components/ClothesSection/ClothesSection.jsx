import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ClothesSection({ onCardClick, clothingItems, onAddClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser && clothingItems.some(item => item.owner === currentUser._id);

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
        {isOwn && (
          <ul className="clothes-section__items">
            {clothingItems.map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
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
