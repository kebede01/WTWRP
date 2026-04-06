import { useState, useContext, useEffect } from "react";
import React from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ItemCard({ item, handlePreviewModal, handleCardLikesDislikes }) {

   const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
 const [isLiked, setIsLiked] = useState(false);

  const handleLikeStatus = (e) => {
    // Prevent the click from bubbling up if the card itself has an onClick
    e.stopPropagation(); 
    handleCardLikesDislikes(item, isLiked);
  };
  // Simplified class logic
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    handlePreviewModal(item);
  };

// Synchronize internal state with the item.likes prop
  useEffect(() => {
    const isCurrentlyLiked = item.likes.some((id) => id === currentUser?._id);
    setIsLiked(isCurrentlyLiked);
  }, [item.likes, currentUser?._id]);

  return (
    <li className="card" >
      <div className="card__header">
        <p className="card__name">{item.name}</p>
          {isLoggedIn ? (
          <button
            type="button"
            className={itemLikeButtonClassName}
            onClick={handleLikeStatus}
            aria-label={isLiked ? "Unlike" : "Like"}
          ></button>
        ) : null}
         </div>
        <img
          src={item.image}
          alt={`A photo of ${item.name}`}
        className="card__img"
        onClick={handleCardClick}
        />
     
    </li>
  );
}
export default React.memo(ItemCard);
