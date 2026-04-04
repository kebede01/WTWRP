import { useContext } from "react";
import "./UserAvatar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const UserAvatar = () => {

  const { currentUser } = useContext(CurrentUserContext);
  const className = "header__avatar";
  const { avatar } = currentUser || {};
   // Fallback initial
  const userInitial = currentUser?.name?.trim() 
  ? currentUser.name.trim().charAt(0).toUpperCase() 
  : "?";

  return avatar ? (
    <img 
      src={avatar} 
      alt={userInitial} 
      className={`avatar-image ${className}`} 
    />
  ) : (
    <div className={`avatar-placeholder ${className}`}>
      {userInitial}
    </div>
  );
};

export default UserAvatar;