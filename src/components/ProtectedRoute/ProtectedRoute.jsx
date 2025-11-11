import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous = false }) {
  //const { isLoggedIn } = useContext(CurrentUserContext);
  const contextValue = useContext(CurrentUserContext);
  const isLoggedIn =
    typeof contextValue === "boolean"
      ? contextValue
      : Boolean(contextValue && contextValue.isLoggedIn);

  const location = useLocation();
  const from = location.state?.from || "/";

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
