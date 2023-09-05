import usePopupClose from "../../hooks/usePopupClose";

export default function ImagePopup({ card, isOpen, onClose }) {
  usePopupClose(card?.link, onClose);
  return (
    <section className={`popup popup_place-image ${isOpen && "popup_opened"}`}>
      <figure className="popup__image">
        <button
          className="popup__close-button popup__close-button_place-image"
          type="button"
          onClick={onClose}
        />
        <img className="popup__image-element" src={card.link} alt={card.name} />
        <figcaption className="popup__image-text">{card.name}</figcaption>
      </figure>
    </section>
  );
}
