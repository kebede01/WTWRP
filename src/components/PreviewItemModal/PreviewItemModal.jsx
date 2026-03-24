import "./PreviewItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
export default function PreviewItemModal({
  handleCloseModal,
  buttonText,
  title,
  selectedCard,
  isOpen,
  handleSubmitPreviewItem,
  activeModal,
}) {
  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      activeModal={activeModal}
      buttonText={buttonText}
      title={title}
      handleSubmitPreviewItem={handleSubmitPreviewItem}
    >
      <img
        src={selectedCard.link}
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
