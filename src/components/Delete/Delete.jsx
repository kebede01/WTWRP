import "./Delete.css";

function DeleteModal({
  handleCloseModal,
  isOpen,
  onDeleteClothingtem,
  selectedCard,
 
}) {
  function handleCallBack() {
    onDeleteClothingtem(selectedCard)
  }

  
  return (
    <div
      className={`modal modal__card ${
        isOpen ? "modal_opened" : ""
      }`}
    >
      <div className="modal__content modal__content_type-delete">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type-preview"
          onClick={handleCloseModal}
        ></button>

        <h2 className="modal__title-delete modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <button
          type="button"
          className="modal__button modal__text"
          onClick={handleCallBack}
        >
          Yes delete item
        </button>

        <button
          type="button"
          onClick={handleCloseModal}
          className="modal__button-cancel modal__text"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
export default DeleteModal;
