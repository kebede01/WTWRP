import React from "react";
import "./SideBar.css";
import avatar from "../../assets/images/avatar.svg";
function SideBar({ handleProfileOpen, logOut}) {
  return (
    <section className="side-bar">
      <div className="side-bar__header">
        <img src={avatar} alt="avatar-image" className="side-bar__avatar" />

        <p className="side-bar__avatar-name">Terres Tegegne</p>
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