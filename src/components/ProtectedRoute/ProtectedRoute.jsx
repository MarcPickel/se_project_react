import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getToken, removeToken } from "../../utils/token";

function ProtectedRoute({ children, anonymous = false }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = currentUser?.isLoggedIn ?? false;
  const token = getToken();

  const location = useLocation();
  const from = location.state?.from || "/";

  // If there's a token but user data hasn't loaded yet, wait (show nothing)
  // This prevents redirecting while the auth check is in progress
  if (token && !isLoggedIn && !currentUser?.userData) {
    removeToken();
    return <Navigate to="/" state={{ from: location }} />;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && (!isLoggedIn || !token)) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
