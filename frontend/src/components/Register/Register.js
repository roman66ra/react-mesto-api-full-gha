import React, { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../../utils/auth";
import Header from "../Header/Header";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import imageYes from "../../images/yep.svg";
import imageFail from "../../images/fail.svg";

const Register = ({ isOpen, onClose, handleInfoTooltip }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [popupValue, setPopupValue] = useState({
    image: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formValue.email, formValue.password)
      .then((res) => {
        console.log(res.error);
        setPopupValue({
          image: imageYes,
          text: "Вы успешно зарегистрировались!",
        });
      })
      .catch((res) => {
        setPopupValue({
          image: imageFail,
          text: "Что-то пошло не так! Попробуйте еще раз.",
        });
      })
      .finally(() => handleInfoTooltip());
  };

  return (
    <>
      <Header headerButtonName={"Войти"} link={"../sign-in"} />
      <div className="login">
        <p className="login__title">Регистрация</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            className="login__input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            placeholder="Пароль"
            className="login__input"
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handleChange}
          />
          <div className="login__container-button">
            <button type="submit" className="login__button">
              Зарегистрироваться
            </button>
          </div>
        </form>
        <div className="register__signin">
          <p>Уже зарегистрированы?&#160;</p>
          <Link to="../sign-in" className="register__login-link">
            Войти
          </Link>
        </div>
        <InfoTooltip
          isOpen={isOpen}
          onClose={onClose}
          image={popupValue.image}
          text={popupValue.text}
        />
      </div>
    </>
  );
};

export default Register;
