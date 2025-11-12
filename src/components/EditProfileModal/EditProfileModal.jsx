import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";

function EditProfileModal({ isOpen, onClose, onOverlayClose, buttonText }) {
  const defaultValues = { email: "", password: "" };
  const { values, handleChange, handleReset } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    //setName(); //setAvatar(); as one handler: onEditProfile(data);
    onClose();
    handleReset(evt);
  }

  return (
    <ModalWithForm
      name="edit-profile"
      title="Change profile data"
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      onOverlayClose={onOverlayClose}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="name"
          type="name"
          name="name"
          className="modal__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar
        <input
          id="avatar"
          type="avatar"
          name="avatar"
          className="modal__input"
          placeholder="Avatar"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
