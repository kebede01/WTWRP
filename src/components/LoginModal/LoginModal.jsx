
import { useState, useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  title,
  buttonText,
  isOpen,
  onSubmitLogIn,
  handleCloseModal,
}) {

   const [values, setValues] = useState({
      email: '',
      password: ''
      });
      
 const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

   const handleSubmitModal = (e) => {
    e.preventDefault();
     onSubmitLogIn(values);
};

   useEffect(() => {
    setValues({
      email: "",
      password: ""
       });
   }, [isOpen]);
  
  const isFilled = values.email && values.password;
    
  
  return (
    <ModalWithForm
      buttonText={buttonText}
      isOpen={isOpen}
      title={title}
      onSubmit={handleSubmitModal}
      handleCloseModal={handleCloseModal}
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
