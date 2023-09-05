export default function InfoTooltip({ isOpen, onClose, image, text }) {
  return (
    <section className={`popup popup_infotooltip ${isOpen && "popup_opened"}`}>
      <figure className="popup__container-infotooltip">
        <button
          className="popup__close-button popup__close-button_place-image"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__image-element"
          src={image}
          alt="Изображение галочки в круге либо крестика"
        />
        <p className="popup__infotooltip_title">{text}</p>
      </figure>
    </section>
  );
}
