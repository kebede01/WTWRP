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
  // Map 'image' to 'imageUrl' before sending it to the server
    const itemData = {
      name: values.name,
      weather: values.weather,
      imageUrl: values.image, // Translation happens here!
    };
    // CRITICAL: Notice the "return" here in fetch() at app.js inorder to use .then() here
   e.preventDefault();
    console.log("1. Modal Submit Clicked");

    onSubmitAddItem(itemData)
      .then((data) => {
       
        console.log(data);
        console.log("2. Promise Resolved in Modal");
        handleReset();
        console.log("Baton received in Modal!", data);
        handleCloseModal();
      })
      .catch((err) => {
        console.log("3. Promise Rejected in Modal", err);
      });
  };

 const isFilled = values.name && (values.image || values.imageUrl) && values.weather;

  return (
    <ModalWithForm
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
