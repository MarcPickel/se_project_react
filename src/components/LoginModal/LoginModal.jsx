import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function LoginModal({
  isOpen,
  onClose,
  onOverlayClose,
  buttonText,
  authText,
  handleSignin,
}) {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function handleSubmit(evt) {
    evt.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    handleSignin(values)
      .then(() => {
        setEmailError(false);
        setPasswordError(false);
        handleReset(evt);
        onClose();
      })
      .catch((error) => {
        setEmailError(true);
        setPasswordError(true);
      });
  }

  const handleEmailChange = (evt) => {
    handleChange(evt);
    if (emailError) {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (evt) => {
    handleChange(evt);
    if (passwordError) {
      setPasswordError(false);
    }
  };

  return (
    <ModalWithForm
      name="signin"
      title="Login"
      buttonText={buttonText}
      authText={authText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
    >
      <label
        htmlFor="email"
        className={`modal__label ${emailError ? "modal__label-error" : ""}`}
      >
        {emailError ? "Incorrect email" : "Email"}
        <input
          id="email"
          type="email"
          name="email"
          className={`modal__input ${emailError ? "modal__input-error" : ""}`}
          placeholder="Email"
          required
          value={values.email}
          onChange={handleEmailChange}
        />
      </label>
      <label
        htmlFor="password"
        className={`modal__label ${passwordError ? "modal__label-error" : ""}`}
      >
        {passwordError ? "Incorrect password" : "Password"}
        <input
          id="password"
          type="password"
          name="password"
          className={`modal__input ${
            passwordError ? "modal__input-error" : ""
          }`}
          placeholder="Password"
          required
          value={values.password}
          onChange={handlePasswordChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
