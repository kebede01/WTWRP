import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();

  const { isLoggedIn } = useContext(CurrentUserContext);

  if (anonymous && isLoggedIn) {
    // Forces a logged-in user to stay exactly where they are.
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
