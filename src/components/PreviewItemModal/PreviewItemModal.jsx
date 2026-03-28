import "./PreviewItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
export default function PreviewItemModal({
  handleCloseModal,
  buttonText,
  title,
  selectedCard,
  isOpen,
  onSubmitDelete,
  onItemDelete
}) {

  const handleDeletion = () => {
onSubmitDelete(selectedCard)
  }
  return (
    <ModalWithForm
      onCloseModal={handleCloseModal}
      isOpen={isOpen}
      onItemDelete={onItemDelete}
      buttonText={buttonText}
      title={title}
     onSubmitDelete={handleDeletion}
    >
      <img
        src={selectedCard.imageUrl}
        alt={selectedCard.name}
        className="modal__preview-img"
      ></img>
      <div className="modal__caption">
        <p className="modal__caption-name">Name: {selectedCard.name}</p>
        <p className="modal__caption-weather">Weather: {selectedCard.weather}</p>
      </div>
    </ModalWithForm>
  );
}
