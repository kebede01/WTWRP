
import { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  buttonText,
  title,
  handleCloseModal,
  isOpen,
  openAddItemButton,
  onSubmitAddItemModal,
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [weatherType, setWeatherType] = useState("");

  const handleNameInput = (e) => setName(e.target.value);
  const handleImageInput = (e) => setImage(e.target.value);
  
  // Updated to handle the select change
  const handleSelectInput = (e) => setWeatherType(e.target.value);

  const handleSubmitModal = (e) => {
    e.preventDefault();
    onSubmitAddItemModal(name, image, weatherType);
  };

  useEffect(() => {
    setName("");
    setImage("");
    setWeatherType("");
  }, [isOpen]);

  const isFilled = name && image && weatherType;

  return (
    <ModalWithForm
      buttonText={buttonText}
      title={title}
      openAddItemButton={openAddItemButton}
      handleCloseModal={handleCloseModal}
      isOpen={isOpen}
      onItemSubmitModal={handleSubmitModal}
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
          value={name}
          onChange={handleNameInput}
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          id="imageUrl"
          type="text"
          className="modal__input"
          placeholder="Image URL"
          name="imageUrl"
          value={image}
          required
          onChange={handleImageInput}
        />
      </label>

      {/* Refactored Radio Buttons into a Select Dropdown */}
      <label htmlFor="weather" className="modal__label">
        Select the weather type
        <select
          id="weather"
          className="modal__input modal__input_type_select"
          name="weather"
          value={weatherType}
          required
          onChange={handleSelectInput}
        >
          <option value="" disabled>Select weather...</option>
          <option value="hot">Hot</option>
          <option value="warm">Warm</option>
          <option value="cold">Cold</option>
        </select>
      </label>
    </ModalWithForm>
  );
};

export default AddItemModal;