import { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
export default function RegisterModal({handleSubmitRegister, handleAddRegistration, activeModal, isOpen, buttonText, title, handleCloseModal}) {

   const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [nameRegister, setNameRegister] = useState("");
  const [avatarRegister, setAvatarRegister] = useState("");
  
  return (
    <ModalWithForm handleSubmitRegister={handleSubmitRegister}
      handleAddRegistration={handleAddRegistration}
      activeModal={activeModal}
      isOpen={isOpen}
      buttonText={buttonText}
      title={title}
    handleCloseModal={handleCloseModal}
    >
        <label htmlFor="emailRegister" className="modal__label">
        Email
        <input
          id="emailRegister"
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          name="emailRegister"
         
        />
      </label>
        <label htmlFor="passwordRegister" className="modal__label">
        Password
        <input
          id="passwordRegister"
          type="password"
          className="modal__input"
          placeholder=" Password"
          name="passwordRegister"
          required
          autoComplete="current-password"
         
        />
      </label>
         <label htmlFor="nameRegister" className="modal__label ">
        Name
        <input
          type="text"
          id="nameRegister"
          minLength="2"
          maxLength="30"
          className="modal__input"
          name="nameRegister"
         
          placeholder="Name"
          autoComplete="nameRegister"
          
        />
      </label>
       <label htmlFor="avatarRegister" className="modal__label ">
        Avatar URL
        <input
          type="url"
          id="avatarRegister"
          className="modal__input"
          name="avatarRegister"
          placeholder="https://example.com"
         
        />
      </label>
    </ModalWithForm>
  );
}