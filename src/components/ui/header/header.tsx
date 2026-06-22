import "./header.css";
import logo from "../../../assets/logo.png";

export function Header() {
  return (
    <header className="header">
      <a className="header__logo-link" href="/">
        <img src={logo} alt="Волпарт" className="header__logo" />
      </a>

      <nav className="header__nav">
        <a href="#catalog" className="header__link">Каталог</a>
        <a href="#rules" className="header__link">Правила</a>
        <a href="#questions" className="header__link">Вопросы</a>
      </nav>

      <a href="#contact" className="header__button">
        Связаться с нами
      </a>
    </header>
  );
}