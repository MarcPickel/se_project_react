import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getToken } from "../../utils/token";

function ProtectedRoute({ children, anonymous = false }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);
  const token = getToken();

  const location = useLocation();
  const from = location.state?.from || "/";

  if (token && !currentUser) {
    return null;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
