import { useContext } from "react";
import Card from "../Card/Card.js";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  signOut,
  email,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        email={email}
        signOut={signOut}
        headerButtonName={"Выйти"}
        link={"../sign-in"}
      />
      <main>
        <section className="profile">
          <div className="profile__user">
            <div className="profile__avatar-edit">
              <img
                className="profile__avatar"
                src={currentUser.avatar}
                alt="Аватар"
              />
              <button
                type="button"
                className="profile__avatar-image-edit"
                onClick={onEditAvatar}
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-button"
                onClick={onEditProfile}
              />
              <p className="profile__profession">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            onClick={onAddPlace}
          />
        </section>
        <section className="elements">
          {cards.map((data) => {
            return (
              <Card
                card={data}
                key={data._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </section>
        <Footer />
      </main>
    </>
  );
}
