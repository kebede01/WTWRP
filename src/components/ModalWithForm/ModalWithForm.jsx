import "./ModalWithForm.css";
export default function ModalWithForm({ children, title, buttonText, isOpen, activeModal, handleCloseModal, handleSubmitAddItem, handleSubmitPreviewItem,
  handleSubmitRegister, handleSubmitLogIn,  handleProfileUpdate  
}) {
  
 const handleSubmit = (e) => {
  e.preventDefault(); 

  switch (activeModal) {
    case "add garment":
      handleSubmitAddItem(e);
      break;
    case "preview":
      handleSubmitPreviewItem(e);
      break;
    case "register":
      handleSubmitRegister(e);
      break;
     case "login":
      handleSubmitLogIn(e);
      break;
    case "profile":
      handleProfileUpdate(e);
      break;
    default:
      console.warn("No handler for modal:", activeModal);
  }
};
 
  return (
    <section className={`modal ${isOpen? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">
          {title}
        </h2>
        <button className="modal__close-btn" type="button" onClick={handleCloseModal}></button>
        <form className="modal__form modal__form_add" name="modalWithForm" id="add-item"
          onSubmit={(e) => {
          handleSubmit(e)
        }}>
          {children}
          <button type="submit" className="modal__submit-btn" >{buttonText}</button>
        </form>
      </div>
   </section>
  );
}