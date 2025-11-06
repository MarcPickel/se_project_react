import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

import logo from "../../assets/wtwr-logo.svg";
import avatar from "../../assets/avatar.png";

function Header({ onAddClick, weatherData }) {
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
              <p className="header__username">Terrence Tegegne</p>
              <img
                className="header__avatar"
                src={avatar}
                alt="Terrence Tegegne"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <div className="header__auth-container">
            <button
              onClick={
                {
                  /*Pass method to active signup modal*/
                }
              }
              type="button"
              className="header__signup-button"
            >
              Sign Up
            </button>
            <button
              onClick={
                {
                  /*Pass method to active signin modal*/
                }
              }
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
