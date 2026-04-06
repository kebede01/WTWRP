import { useForm } from "../../../src/hooks/useForm";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  buttonText,
  title,
  handleCloseModal,
  isOpen,
  openAddItemButton,
  onSubmitAddItem,
  name
}) => {
  const { values, handleChange, handleReset } = useForm({
    name: "",
    image: "",
    weather: "",
  });

  const handleClose = () => {
    handleReset();
    handleCloseModal();
  };

  const handleSubmitModal = (e) => {
    e.preventDefault();

    const itemData = {
      name: values.name,
      weather: values.weather,
      image: values.image, // Translation happens here!
    };

    onSubmitAddItem(itemData)
      .then(() => {
        handleClose();
      })
      .catch((err) => {
        console.log("3. Promise Rejected in Modal", err);
      });
  };

  const isFilled =
    values.name && (values.image || values.imageUrl) && values.weather;

  return (
    <ModalWithForm
      name={name}
      buttonText={buttonText}
      title={title}
      openAddItemButton={openAddItemButton}
      onCloseModal={handleClose}
      isOpen={isOpen}
      onSubmit={handleSubmitModal}
      isFilled={isFilled}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          id="name"
          type="text"
          minLength="1"
          maxLength="30"
          className="modal__input"
          placeholder="Name"
          required
          name="name"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          id="image"
          type="text"
          className="modal__input"
          placeholder="Image URL"
          name="image"
          value={values.image}
          required
          onChange={handleChange}
        />
      </label>

      {/* Refactored Radio Buttons into a Select Dropdown */}
      <label htmlFor="weather" className="modal__label">
        Select the weather type
        <select
          id="weather"
          className="modal__input modal__input_type_select"
          name="weather"
          value={values.weather}
          required
          onChange={handleChange}
        >
          <option value="" disabled>
            Select weather...
          </option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;
