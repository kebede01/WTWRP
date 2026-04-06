import { useContext } from "react";
import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ClothesSection({ clothingItems, handlePreviewModal }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) return <p>Loading wardrobe...</p>;

  return (
    <section className="clothes">
      <div className="clothes__heading">
        <p className="clothes-heading__title">Your Items</p>
        <button className="clothes-heading__btn">+ Add new</button>
      </div>
      <ul className="cards__list">
        {/* ONLY check for ownership, ignore weather entirely */}
        {clothingItems &&
          clothingItems
            .filter(
              (item) => item.owner.toString() === currentUser?._id.toString(),
            )
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                handlePreviewModal={handlePreviewModal}
              />
            ))}
      </ul>
    </section>
  );
}
export default React.memo(ClothesSection);
