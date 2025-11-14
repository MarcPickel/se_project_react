import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function SideBar({ handleEditProfileClick }) {
  const { userData, setIsLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  function logOut() {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  }

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        {userData.avatar ? (
          <img
            src={userData.avatar}
            alt={userData.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-circle">
            <p className="sidebar__avatar-letter">{userData.name[0]}</p>
          </div>
        )}
        <p className="sidebar__username">{userData.name}</p>
      </div>
      <button
        className="sidebar__edit-button"
        type="button"
        onClick={handleEditProfileClick}
      >
        Change profile data
      </button>
      <button className="sidebar__logout-button" type="button" onClick={logOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
