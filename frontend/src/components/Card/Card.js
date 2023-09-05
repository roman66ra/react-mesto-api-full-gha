import { useContext } from "react";
import CurrentUserContext from "../../context/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);

  return (
    <div className="element">
      {isOwn && (
        <button
          className="element__delete element__delete_visible"
          type="button"
          onClick={() => onCardDelete(card)}
        />
      )}
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="element__text-like">
        <h2 className="element__text">{card.name}</h2>
        <div className="element__card-like">
          <button
            className={`element__like ${isLiked ? "element__like_active" : ""}`}
            type="button"
            onClick={() => onCardLike(card)}
          />
          <div className="element__like-counter">
            {card.likes.length}
          </div>
        </div>
      </div>
    </div>
  );
}
