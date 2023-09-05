import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

export default function Header({ email, headerButtonName, signOut, link }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Надпись Mesto Russia" />
      <div className="header__email-button-container">
        <p className="header__email">{email}</p>
        <Link
          to={link}
          replace
          type="submit"
          className="header__button"
          onClick={signOut}
        >
          {headerButtonName}
        </Link>
      </div>
    </header>
  );
}
