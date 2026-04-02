import { useContext } from "react";
import React from "react";
import "./Header.css";
import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/avatar.svg";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";
 function Header({
  handleActiveModal,
  handleAddRegistration,
  handleLogIn,
 weatherData,
}) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
   
 const {currentUser, isLoggedIn} = useContext(CurrentUserContext)
  return (
    <header className="header">
      <div className="header__section header__section_left">
        <NavLink to="/" className="header-logo__navlink">
          <img src={logo} alt="what to wear logo" className="header__logo" />
        </NavLink>

        <p className="header__info">
          {formattedDate},{" "}
          <span className="header__location">{weatherData.city}</span>
        </p>
      </div>

      <div className="header__section header__section_right">
      
        <button
          type="button"
          className="header__button"
          onClick={handleActiveModal}
        >
          + Add clothing
        </button>
          <ToggleSwitch/>
        <button onClick={handleAddRegistration}>Register</button>
        <button onClick={handleLogIn}>Log In</button>

        <NavLink to="/profile" className="header__navlink">
          <p className="header__user-name">{currentUser?.name || "Terres Tegegne"}</p>
          <img src={currentUser?.avatar || avatar} alt={currentUser?.name || "User Avatar"}className="header__avatar" />
        </NavLink>
      </div>
    </header>
  );
}
export default React.memo(Header);