import { useEffect, useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarInput.current.value });
  }

  useEffect(() => {
    avatarInput.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="-avatar-edit"
      title="Обновить аватар"
      saveButtonTitle="Сохранить"
      container="popup__container-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarInput}
        type="url"
        name="avatar"
        id="avatar"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link-avatar"
        required=""
      />
      <span className="avatar-error" />
    </PopupWithForm>
  );
}
