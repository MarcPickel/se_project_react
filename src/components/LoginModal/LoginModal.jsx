import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function LoginModal({ isOpen, onClose, onOverlayClose, buttonText, authText }) {
  const defaultValues = { email: "", password: "", name: "", imageUrl: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    postItems(values)
      .then((newItem) => {
        onAddItem(newItem);
        onClose();
        handleReset(evt);
      })
      .catch(console.error);
  }

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
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="email"
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="password"
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
