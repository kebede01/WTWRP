import { useState, useEffect } from "react";
import "./ProfileEditModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function ProfileEditModal({
  handleCloseModal,
  title,
  buttonText,
  isOpen,
  activeModal,
  onProfileUpdate,
}) {
  const [values, setValues] = useState({ nameProfile: "", avatarUrl: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    onProfileUpdate(values);
  };
  const isFilled = values.nameProfile && values.avatarUrl;

  useEffect(() => {
    setValues({ nameProfile: "", avatarUrl: "" });
  }, [isOpen]);

  return (
    <ModalWithForm
      handleCloseModal={handleCloseModal}
      title={title}
      buttonText={buttonText}
      isOpen={isOpen}
      activeModal={activeModal}
      onSubmit={handleSubmitModal}
      isFilled={isFilled}
    >
      <label htmlFor="nameProfile" className="modal__label">
        Name
        <input
          id="nameProfile"
          type="text"
          className="modal__input"
          placeholder="Name"
          onChange={handleChange}
          name="nameProfile"
          value={values.nameProfile}
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
          value={values.avatarUrl}
          placeholder="Avatar"
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
