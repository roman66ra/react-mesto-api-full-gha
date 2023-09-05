import { useContext, useEffect, useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="-edit"
      title="Редактировать профиль"
      saveButtonTitle="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        id="name"
        className="popup__input popup__input_type_name"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required=""
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="name-error" />
      <input
        type="text"
        name="about"
        id="about"
        value={description || ""}
        className="popup__input popup__input_type_job"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        required=""
        onChange={handleChangeAbout}
      />
      <span className="about-error" />
    </PopupWithForm>
  );
}
