import { useContext } from "react";
import React from "react";
import "./Header.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import logo from "../../assets/images/logo.svg";
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

  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

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
        <ToggleSwitch />
        <button
          type="button"
          className="header__button"
          onClick={handleActiveModal}
        >
          + Add clothing
        </button>

        {isLoggedIn ? (
          <NavLink to="/profile" className="header__navlink">
            <p className="header__user-name header__user-name_type-home">
              {currentUser?.name || "Terres Tegegne"}
            </p>
            {/* {you can pass any class name to customize as you want} */}
            <UserAvatar user={currentUser} className="header__avatar" />
          </NavLink>
        ) : (
          <div>
            <button onClick={handleAddRegistration}> Sign up</button>
            <button onClick={handleLogIn}>Sign in</button>
          </div>
        )}
      </div>
    </header>
  );
}
export default React.memo(Header);
