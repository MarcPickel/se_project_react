import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";

function Header({
  onAddClick,
  weatherData,
  userData,
  isLoggedIn,
  onSignupClick,
  onSigninClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR" />
      </Link>
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
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{userData.name}</p>
              <img
                className="header__avatar"
                src={userData.avatar}
                alt={userData.name}
              />
            </div>
          </Link>
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
