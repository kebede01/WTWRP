import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({title, buttonText, isOpen, activeModal, handleSubmitLogIn, handleCloseModal}) {
        
      
  return (
    <ModalWithForm
          buttonText={buttonText}
      isOpen={isOpen}
      title={title}
          activeModal={activeModal}
      handleSubmitLogIn={handleSubmitLogIn}
      handleCloseModal={handleCloseModal}
    >
       <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          name="email"
          required
          
        />
      </label>
       <label htmlFor="password" className="modal__label ">
        Password
        <input
          type="password"
          id="password"
          className="modal__input"
          name="password"
          placeholder="Password"
          
        />
      </label>
    </ModalWithForm>
  );
}