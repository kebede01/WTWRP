import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";
import { useState } from "react";
export default function LoginModal({
  title,
  buttonText,
  isOpen,
  onSubmitLogIn,
  handleCloseModal,
 name
}) {

  const [apiError, setApiError] = useState("");

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
    setApiError(""); // Clear old errors
    // CRITICAL: Notice the "return" here in fetch() at app.js inorder to use .then() here
    onSubmitLogIn(values)
      .then(() => {
        handleReset();
        handleCloseModal();
      }).catch((err) => {
        // Extract the message from your backend limiter
        // Try to find the most descriptive message available
  const errorMessage = err.message || err.error || (typeof err === 'string' ? err : "An error occurred. Please try again.");
        setApiError(errorMessage);
      });
  }
    const isFilled = values.email && values.password;

    return (
      <ModalWithForm
        buttonText={buttonText}
        isOpen={isOpen}
        title={title}
        onSubmit={handleSubmitModal}
        onCloseModal={handleClose}
        isFilled={isFilled}
        name={name}
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
        {/* Place the error here, right before the form ends */}
  {apiError && <p className="modal__error-message">{apiError}</p>}
      </ModalWithForm>
    
    );
  }
