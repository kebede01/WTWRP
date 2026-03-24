import "./ProfileEditModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function ProfileEditModal({handleCloseModal, title, buttonText, isOpen, activeModal, handleProfileUpdate}) {

        
  return (
    <ModalWithForm
     handleCloseModal={handleCloseModal}
            title={title}
          buttonText={buttonText}
           isOpen={isOpen}
          activeModal={activeModal}
      handleProfileUpdate ={handleProfileUpdate }
    >

      <label htmlFor="nameProfile" className="modal__label">
          Name
          <input
            id="nameProfile"
            type="text"
            className="modal__input"
            placeholder="Name"
            name="nameProfile"
            required
           
          />
        </label>
        <label htmlFor="avatarUrl" className="modal__label ">
          Avatar
          <input
            type="url"
            id="avatarUrl"
            className="modal__input"
            name="avatarUrl"
            placeholder="Avatar"
            
          />
        </label>  
</ModalWithForm>
  );
}