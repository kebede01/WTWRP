import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";
export default function LoginModal({
  title,
  buttonText,
  isOpen,
  onSubmitLogIn,
  handleCloseModal,
}) {
  const { values, handleChange, handleReset } = useForm({
    email: "",
    password: "",
  });

  const handleClose = () => {
    handleReset(); 
    handleCloseModal(); 
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    onSubmitLogIn(values);
  };

  const isFilled = values.email && values.password;

  return (
    <ModalWithForm
      buttonText={buttonText}
      isOpen={isOpen}
      title={title}
      onSubmit={handleSubmitModal}
      onCloseModal={handleClose}
      isFilled={isFilled}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          value={values.email}
          name="email"
          onChange={handleChange}
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
          onChange={handleChange}
          placeholder="Password"
          value={values.password}
          required
        />
      </label>
    </ModalWithForm>
  );
}
