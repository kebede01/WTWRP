import "./ModalWithForm.css";
export default function ModalWithForm({children, title, buttonText}) {
  return (
    <section className="modal modal_opened">
      <div className="modal__content">
        <h2 className="modal__title">
          {title}
        </h2>
        <button className="modal__close-btn" type="button"></button>
        <form className="modal__form modal__form_add" name="modalWithForm" id="add-item">
          {children}
          <button type="submit" className="modal__submit-btn" >{buttonText}</button>
        </form>
      </div>
   </section>
  );
}