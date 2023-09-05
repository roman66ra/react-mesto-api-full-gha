import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="-cards"
      title="Новое место"
      saveButtonTitle="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="image-name"
        name="name"
        className="popup__input popup__input_type_name-pict"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        required=""
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="image-name-error" />
      <input
        name="link"
        id="image-url"
        className="popup__input popup__input_type_link"
        placeholder="Ссылка на картинку"
        type="url"
        required=""
        value={link || ''}
        onChange={handleLinkChange}
      />
      <span className="image-url-error" />
    </PopupWithForm>
  );
}
