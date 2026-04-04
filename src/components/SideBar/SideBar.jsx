import { useContext } from "react";
import React from "react";
import "./SideBar.css";
import UserAvatar from "../UserAvatar/UserAvatar";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function SideBar({ handleProfileOpen, logOut }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <section className="side-bar">
      <div className="side-bar__header">
        <UserAvatar user={currentUser} className="header__avatar" />
        <p className="header__user-name">
          {currentUser?.name || "Terres Tegegne"}
        </p>
      </div>
      <div className="side-bar__buttons">
        <button
          type="button"
          className="side-bar__button-change side-bar__button"
          onClick={handleProfileOpen}
        >
          Change profile data
        </button>
        <button
          type="button"
          className="side-bar__button-logout side-bar__button"
          onClick={logOut}
        >
          Log out
        </button>
      </div>
    </section>
  );
}
export default React.memo(SideBar);
