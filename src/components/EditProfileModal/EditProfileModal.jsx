import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import useForm from "../../hooks/useForm.js";
import { getToken } from "../../utils/token.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useContext, useEffect } from "react";

function EditProfileModal({
  isOpen,
  onClose,
  onOverlayClose,
  buttonText,
  editProfile,
  onEditProfile,
}) {
  // default values should match editable fields (name, avatar)
  const defaultValues = { name: "", avatar: "" };
  const userData = useContext(CurrentUserContext);

  const { values, setValues, handleChange, handleReset } =
    useForm(defaultValues);
  const token = getToken();

  useEffect(() => {
    if (isOpen && userData)
      setValues({
        name: userData.name || "",
        avatar: userData.avatar || "",
      });
  }, [isOpen, userData]);

  function handleSubmit(evt) {
    evt.preventDefault();
    editProfile(values, token)
      .then((userData) => {
        onEditProfile(userData);
        onClose();
        handleReset(evt);
      })
      .catch(console.error);
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
          id="name-edit"
          type="text"
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
          id="avatar-edit"
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

export default EditProfileModal;
