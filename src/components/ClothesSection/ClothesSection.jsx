import { useContext } from "react";
import React from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ClothesSection({ clothingItems, handlePreviewModal, handleActiveModal }) {
  const { currentUser } = useContext(CurrentUserContext);

  if (!currentUser) return <p>Loading wardrobe...</p>;

  return (
    <section className="clothes">
      <div className="clothes__heading">
        <p className="clothes-heading__title">Your Items</p>
        <button className="clothes-heading__btn" onClick={handleActiveModal}>+ Add new</button>
      </div>
      <ul className="cards__list">
        {/* No need filtering for clthes(owner id) and user(_id) b/c backend sends data filtered by user id*/}
        {clothingItems &&
          clothingItems.map((item) => (
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
