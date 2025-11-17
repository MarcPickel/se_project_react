import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function RegisterModal({
  isOpen,
  onClose,
  onOverlayClose,
  buttonText,
  logText,
  handleSignup,
  onLoginClick,
}) {
  const defaultValues = { email: "", password: "", name: "", avatar: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();

    handleSignup(values)
      .then(() => {
        onClose();
        handleReset(evt);
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      name="signup"
      title="Sign Up"
      buttonText={buttonText}
      logText={logText}
      onClose={onClose}
      onLoginClick={onLoginClick}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
    >
      <label htmlFor="email-register" className="modal__label">
        Email*
        <input
          id="email-register"
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password-register" className="modal__label">
        Password*
        <input
          id="password-register"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="name-register" className="modal__label">
        Name*
        <input
          id="name-register"
          type="name"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar-register" className="modal__label">
        Avatar URL*
        <input
          id="avatar-register"
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
