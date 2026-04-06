import { useContext } from "react";
import "./PreviewItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext"

function PreviewItemModal({
  activeModal,
  selectedCard,
  handleCloseModal,
  onSubmitDelete,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item
  const isOwn = selectedCard?.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__button-delete modal__footer_text ${
    isOwn ? "" : "modal__button-delete_hidden"
  }`;

  return (
    <div
      className={`modal  ${
        activeModal === "preview" ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close-preview"
          onClick={handleCloseModal}
        ></button>
        <img
          src={selectedCard?.image}
          alt={selectedCard?.name}
          className="modal__content-image"
        />
        <div className="modal__footer modal__footer_text">
          <div className="modal__footer__heading">
            <h2 className="modal__footer-name modal__footer_text">
              {selectedCard?.name}
            </h2>
            <button
              type="button"
              onClick={onSubmitDelete}
              className={itemDeleteButtonClassName}
            >
              Delete
            </button>
          </div>

          <p className="modal__weather modal__footer_text">
            Weather: {selectedCard?.weather}
          </p>
        </div>
      </div>
    </div>
  );
}
export default PreviewItemModal;






     
     
     
     
     
    
    



            
        