import "./ModalWithForm.css";
export default function ModalWithForm({ children, title, buttonText, isOpen, handleCloseModal,  onSubmit,  isFilled , onSubmitDelete
}) {

  

 
  return (
    <section className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">
          {title}
        </h2>
        <button className="modal__close-btn" type="button" onClick={handleCloseModal}></button>
        <form className="modal__form modal__form_add" name="modalWithForm" id="add-item"
          onSubmit={ onSubmit}>
          {children}
          
{onSubmitDelete ? (
              <button 
                type="button" 
                className="modal__delete-btn" 
                onClick={onSubmitDelete}
              >
                Delete
              </button>
            ) : (<button type="submit" className="modal__submit-btn" disabled={!isFilled}>{buttonText}</button>)}
        </form>
      </div>
   </section>
  );
}