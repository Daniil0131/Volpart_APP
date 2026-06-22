import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthModal } from "../auth-modal";
import type { User } from "../../../api/apartmentsApi";
import "./footer.css";
import logo from "../../../assets/logo.png";

export function Footer() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("volpart-user");

    if (!savedUser) {
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
    } catch {
      localStorage.removeItem("volpart-user");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("volpart-user");
    setUser(null);
  };

  const isAdmin = user?.role === "admin";

  return (
    <footer className="footer">
      <div className="footer__top">
        <Link to="/" className="footer__logo-link">
          <img src={logo} alt="Волпарт" className="footer__logo" />
        </Link>

        <div className="footer__actions">
          {!user && (
            <button
              className="footer__login"
              type="button"
              onClick={() => setIsAuthModalOpened(true)}
            >
              Войти
            </button>
          )}

          {user && (
            <button
              className="footer__login"
              type="button"
              onClick={handleLogout}
            >
              Выйти
            </button>
          )}

          {isAdmin && (
            <Link to="/admin-volpart" className="footer__admin">
              <span className="footer__arrow">→</span>
            </Link>
          )}
        </div>
      </div>

      <Link to="/rules" className="footer__rules">
        ПРАВИЛА ПОЛЬЗОВАНИЯ ПЛОЩАДКОЙ
      </Link>

      {isAuthModalOpened && (
        <AuthModal
          onClose={() => setIsAuthModalOpened(false)}
          onSuccess={setUser}
        />
      )}
    </footer>
  );
}