import "./Header.css";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";

export default function Header({handleActiveModal, handleAddRegistration}) {
  return (
    <header className="header">
      <div className="header__section header__section_left">
 <img src={logo} alt="what to wear logo" className="header__logo" />
      
      <p className="header__info">
        June 15, <span className="header__location">New York</span>
      </p>
      </div>
     
      <div className="header__section header__section_right">
          <button type="button" className="header__button" onClick={handleActiveModal}>
        + Add clothing
      </button>
        <button onClick={ handleAddRegistration}>Register</button>
        <button>Log In</button>
      <p className="header__user-name">Terres Tegegne</p>
      
      <img src={avatar} alt="Terres Tegegne" className="header__avatar" />
</div>
    
    </header>
  );
}