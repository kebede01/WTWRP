import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, handlePreviewModal, handleCardLikesDislikes }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

 
  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const handleLikeStatus = (e) => {
    // Prevent the click from bubbling up to the card's image click handler
    e.stopPropagation();
    handleCardLikesDislikes(item, isLiked);
  };

  const handleCardClick = () => {
    handlePreviewModal(item);
  };

  // Dynamic class name based on the derived isLiked value
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_liked" : ""
  }`;

  return (
    <li className="card">
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