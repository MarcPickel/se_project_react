import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { getToken, removeToken } from "../../utils/token";

function ProtectedRoute({ children, anonymous = false }) {
  const { userData, isLoggedIn } = useContext(CurrentUserContext);

  const token = getToken();

  const location = useLocation();
  const from = location.state?.from || "/";

  if (token && userData === null && !isLoggedIn) {
    return null;
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
