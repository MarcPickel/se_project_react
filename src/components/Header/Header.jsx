import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

import logo from "../../assets/wtwr-logo.svg";

function Header({ onAddClick, weatherData, onSignupClick, onSigninClick }) {
  const { userData, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="WTWR" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={onAddClick}
            type="button"
            className="header__add-clothes-button"
          >
            + Add clothes
          </button>
          <NavLink to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{userData.name}</p>
              {userData.avatar ? (
                <img
                  className={"header__avatar"}
                  src={userData.avatar}
                  alt={userData.name}
                />
              ) : (
                <div className="header__avatar-circle">
                  <p className={"header__avatar-letter"}>{userData.name[0]}</p>
                </div>
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <>
          <div className="header__auth-container">
            <button
              onClick={onSignupClick}
              type="button"
              className="header__signup-button"
            >
              Sign Up
            </button>
            <button
              onClick={onSigninClick}
              type="button"
              className="header__signin-button"
            >
              Log In
            </button>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
