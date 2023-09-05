import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authorize } from "../../utils/auth";
import Header from "../Header/Header";

const Login = ({ handleLogin, setEmail }) => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }

    authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          handleLogin(setEmail(formValue.email));
          navigate("/", { replace: true });
          setFormValue({ email: "", password: "" });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Header headerButtonName={"Регистрация"} link={"../sign-up"} />
      <div className="login">
        <p className="login__title">Вход</p>
        <form onSubmit={handleSubmit} className="login__form">
          <input
            placeholder="Email"
            className="login__input"
            required
            id="email"
            name="email"
            type="text"
            value={formValue.email}
            onChange={handleChange}
          />
          <input
            placeholder="Пароль"
            className="login__input"
            required
            id="password"
            name="password"
            type="password"
            value={formValue.password}
            onChange={handleChange}
          />
          <div className="login__container-button">
            <button type="submit" className="login__button">
              Войти
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
