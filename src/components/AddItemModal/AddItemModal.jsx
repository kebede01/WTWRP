import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal() {
  return (
    <ModalWithForm title="New garment" buttonText="Add garment">
 
      <label htmlFor="name" className="modal__label">Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="name"
          placeholder="Name"
           required
        />
      </label>
      <label htmlFor="image" className="modal__label">Image
        <input
          type="url"
          className="modal__input"
          name="image"
          id="image"
          placeholder="https://example.com/image.jpg"
  required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">
          Select the weather type
            <label htmlFor="weather" className="modal__label modal__label_fieldset">
          <input
            type="radio"
            className="modal__input modal__input_fieldset"
            name="weather"
            id="weather"
              value="hot"
              required
          />
          hot
        </label>
        <label htmlFor="weather" className="modal__label modal__label_fieldset">
          <input
            type="radio"
            className="modal__input modal__input_fieldset"
            name="weather"
            id="weather"
              value="warm"
              required
          />
          warm
        </label>
        <label htmlFor="weather" className="modal__label modal__label_fieldset">
          <input
            type="radio"
            className="modal__input modal__input_fieldset"
            name="weather"
            id="weather"
              value="cold"
              required
          />
          cold
        </label>
        </legend>   
         
      
      </fieldset>
  
    </ModalWithForm>
   
  );
}
