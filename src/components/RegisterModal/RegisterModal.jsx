
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";
export default function RegisterModal({
  onSubmitRegister,
  handleAddRegistration,
  isOpen,
  buttonText,
  title,
  handleCloseModal,
}) {
// 1. Initialize the hook with your starting values
  const { values, handleChange, handleReset } = useForm({
    emailRegister: "",
    passwordRegister: "",
    nameRegister: "",
    avatarRegister: "",
  });


const handleClose = () => {
    handleReset();           
    handleCloseModal();  
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    onSubmitRegister(values);
   
  };

 

  const isFilled =
    values.emailRegister &&
    values.passwordRegister &&
    values.nameRegister &&
    values.avatarRegister;
  return (
    <ModalWithForm
      onSubmit={handleSubmitModal}
      handleAddRegistration={handleAddRegistration}
      isOpen={isOpen}
      buttonText={buttonText}
      title={title}
      onCloseModal={handleClose}
      isFilled={isFilled}
      
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
          value={values.emailRegister}
          onChange={handleChange}
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
           value={values.passwordRegister}
          onChange={handleChange}
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
          value={values.nameRegister}
          onChange={handleChange}
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
          value={values.avatarRegister}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </label>
    </ModalWithForm>
  );
}
