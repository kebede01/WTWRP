import { useContext, useEffect} from "react";
import "./ProfileEditModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../../src/hooks/useForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function ProfileEditModal({
  handleCloseModal,
  title,
  buttonText,
  isOpen,
  activeModal,
  onProfileUpdate,
  name
}) {
  const { currentUser } = useContext(CurrentUserContext);

const { values, handleChange, handleReset, setValues } = useForm({
    name:  "",
    avatar:  "",
  });

  const handleClose = () => {
    handleReset();
    handleCloseModal();
  };

 const handleSubmitModal = (e) => {
  e.preventDefault();
onProfileUpdate(values)
    .then(() => {
      handleReset();
      handleCloseModal(); 
    })
    .catch((err) => {
       console.error("Profile update failed:", err);
      // Optional: Add a 'setErrorMessage' here to show the user the error in the UI
    });
};
  const isFilled = values.name && values.avatar;



 
    useEffect(() => {
    if (isOpen ) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [isOpen, currentUser, setValues]);

  return (
    <ModalWithForm
      name={name}
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
          name="name"
          value={values.name}
          required
        />
      </label>
      <label htmlFor="avatarUrl" className="modal__label ">
        Avatar
        <input
          type="url"
          id="avatarUrl"
          className="modal__input"
          name="avatar"
          value={values.avatar}
          placeholder="Avatar"
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
