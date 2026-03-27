import "./ProfileEditModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";
export default function ProfileEditModal({
  handleCloseModal,
  title,
  buttonText,
  isOpen,
  activeModal,
  onProfileUpdate,
}) {
  const { values, handleChange, handleReset } = useForm({
    nameProfile: "",
    avatarUrl: "",
  });

  const handleClose = () => {
    handleReset();
    handleCloseModal();
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();
    onProfileUpdate(values);
  };
  const isFilled = values.nameProfile && values.avatarUrl;

  return (
    <ModalWithForm
      onCloseModal={handleClose}
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
