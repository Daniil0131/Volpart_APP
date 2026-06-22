import { useState } from "react";
import { loginUser, registerUser } from "../../../api/apartmentsApi";
import type { User } from "../../../api/apartmentsApi";
import "./auth-modal.css";

type AuthModalProps = {
  onClose: () => void;
  onSuccess: (user: User) => void;
};

export function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      setMessage("");

      const user =
        mode === "login"
          ? await loginUser({ email, password })
          : await registerUser({ name, email, password });

      localStorage.setItem("volpart-user", JSON.stringify(user));
      onSuccess(user);
      onClose();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Ошибка авторизации"
      );
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__overlay" onClick={onClose} />

      <div className="auth-modal__content">
        <button className="auth-modal__close" onClick={onClose}>
          ×
        </button>

        <h2 className="auth-modal__title">
          {mode === "login" ? "Вход" : "Регистрация"}
        </h2>

        {mode === "register" && (
          <input
            className="auth-modal__input"
            type="text"
            placeholder="Ваше имя"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        )}

        <input
          className="auth-modal__input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          className="auth-modal__input"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className="auth-modal__button" onClick={handleSubmit}>
          {mode === "login" ? "Войти" : "Зарегистрироваться"}
        </button>

        <button
          className="auth-modal__switch"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "Нет аккаунта? Зарегистрироваться"
            : "Уже есть аккаунт? Войти"}
        </button>

        {message && <p className="auth-modal__message">{message}</p>}
      </div>
    </div>
  );
}