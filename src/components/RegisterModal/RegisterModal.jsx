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
  name
}) {
  // 1. Initialize the hook with your starting values
  const { values, handleChange, handleReset } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleClose = () => {
    handleReset();
    handleCloseModal();
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    // CRITICAL: Notice the "return" here in fetch() at app.js inorder to use .then() here
    onSubmitRegister(values).then(() => {
      handleReset();
      handleCloseModal();
    });
  };

  const isFilled =
    values.email && values.password && values.name && values.avatar;
  return (
    <ModalWithForm
      name={name}
      onSubmit={handleSubmitModal}
      handleAddRegistration={handleAddRegistration}
      isOpen={isOpen}
      buttonText={buttonText}
      title={title}
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
          required
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="password"
          type="password"
          className="modal__input"
          placeholder=" Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </label>
      <label htmlFor="name" className="modal__label ">
        Name
        <input
          type="text"
          id="name"
          minLength="2"
          maxLength="30"
          className="modal__input"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          autoComplete="nameRegister"
        />
      </label>
      <label htmlFor="avatar" className="modal__label ">
        Avatar URL
        <input
          type="url"
          id="avatar"
          className="modal__input"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </label>
    </ModalWithForm>
  );
}
