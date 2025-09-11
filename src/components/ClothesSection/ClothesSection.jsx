import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/clothingItems.js";
import ItemCard from "../ItemCard/ItemCard.jsx";

function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__text-group">
        <p className="clothes-section__text">Your items</p>
        <button type="button" className="clothes-section__add-button">
          + Add new
        </button>
      </div>
      <div className="">
        <ul className="clothes-section__items">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;
