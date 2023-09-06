import { useEffect, useState } from "react";
import api from "../utils/api";
import CurrentUserContext from "../context/CurrentUserContext";
import Main from "./Main/Main";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import PopupWithForm from "./PopupWithForm/PopupWithForm";
import ImagePopup from "./ImagePopup/ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register/Register";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { checkToken } from "../utils/auth";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    handleTokenCheck();
    Promise.all([
      api.getInitialCards(localStorage.getItem("token")),
      api.getUserInfo(localStorage.getItem("token")),
    ])
      .then((result) => {
        const [items, userInfo] = result;
        setCurrentUser(userInfo);
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const navigate = useNavigate();

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/", { replace: true });
            setEmail(res.email);
          }
        })
        .catch((res) => console.log(res));
    }
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .patchUserInfo(data, localStorage.getItem("token"))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((res) => console.log(res));
  }

  function handleUpdateAvatar(data) {
    api
      .patchUserAvatar(data, localStorage.getItem("token"))
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((res) => console.log(res));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .deleteLikeCard(card._id, localStorage.getItem("token"))
        .then((res) => {
          setCards((cards) => cards.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((res) => console.log(res));
    } else {
      api
        .putLikeCard(card._id, localStorage.getItem("token"))
        .then((res) => {
          setCards((cards) => cards.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((res) => console.log(res));
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id, localStorage.getItem("token"))
      .then(() => {
        setCards((cards) => cards.filter((c) => card._id !== c._id));
      })
      .catch((res) => console.log(res));
  }

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(card, localStorage.getItem("token"))
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
      })
      .catch((res) => {
        console.log(res);
      });
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  const handleLogin = () => {
    setLoggedIn(true);
  };

  function signOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/*"
            element={
              <ProtectedRoute
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
                signOut={signOut}
                email={email}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                isOpen={isInfoTooltipOpen}
                onClose={closeAllPopup}
                handleInfoTooltip={handleInfoTooltip}
              />
            }
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} setEmail={setEmail} />}
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="-delete-card"
          title="Вы уверены?"
          saveButtonTitle="Да"
          container="popup__container-delete"
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopup}
        ></ImagePopup>
      </div>
    </CurrentUserContext.Provider>
  );
}
