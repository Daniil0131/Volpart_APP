import { useEffect, useState } from "react";
import type { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
  createApartment,
  deleteApartment,
  getApartments,
} from "../api/apartmentsApi";
import type { Apartment } from "../types/apartment";
import "./AdminPage.css";

export function AdminPage() {
    const savedUser = localStorage.getItem("volpart-user");
const user = savedUser ? JSON.parse(savedUser) : null;

    if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
    }
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const loadApartments = () => {
    getApartments()
      .then((data) => {
        setApartments(data);
      })
      .catch(() => {
        setMessage("Не удалось загрузить список квартир");
      });
  };

  useEffect(() => {
    loadApartments();
  }, []);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!image) {
      setMessage("Добавьте фотографию квартиры");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("address", address);
    formData.append("image", image);

    try {
      setIsLoading(true);
      setMessage("");

      const newApartment = await createApartment(formData);

        setApartments((prevApartments) => [
        ...prevApartments,
        newApartment,
        ]);

        setTitle("");
        setDescription("");
        setPrice("");
        setAddress("");
        setImage(null);

        form.reset();

        setMessage("Квартира успешно добавлена");
    } catch {

        setMessage("Ошибка при добавлении квартиры");
    } finally {
        setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteApartment(id);
      setMessage("Квартира удалена");
      loadApartments();
    } catch {
      setMessage("Не удалось удалить квартиру");
    }
  };

  return (
    <main className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">
            Квартиры
          </h1>

          <p className="admin-page__subtitle">
            Сюда пихай квартиры
          </p>
        </div>

        <Link className="admin-page__link" to="/">
          На главную
        </Link>
      </div>

      <section className="admin-page__layout">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h2 className="admin-form__title">
            Добавить квартиру
          </h2>

          <label className="admin-form__label">
            Название квартиры
            <input
              className="admin-form__input"
              type="text"
              placeholder="Квартира-студия"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </label>

          <label className="admin-form__label">
            Описание
            <textarea
              className="admin-form__textarea"
              placeholder="Описание квартиры"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              required
            />
          </label>

          <label className="admin-form__label">
            Цена
            <input
              className="admin-form__input"
              type="text"
              placeholder="3500 ₽ / сутки"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </label>

          <label className="admin-form__label">
            Адрес
            <input
              className="admin-form__input"
              type="text"
              placeholder="Санкт-Петербург, Комендантский проспект"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
          </label>

          <label className="admin-form__label">
            Фотография
            <input
              className="admin-form__input"
              type="file"
              accept="image/*"
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  setImage(file);
                }
              }}
              required
            />
          </label>

          <button
            className="admin-form__button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Добавляем..." : "Добавить квартиру"}
          </button>

          {message && (
            <p className="admin-form__message">
              {message}
            </p>
          )}
        </form>

        <section className="admin-list">
          <h2 className="admin-list__title">
            Текущие квартиры
          </h2>

          {apartments.length === 0 && (
            <p className="admin-list__empty">
              Пока квартир нет.
            </p>
          )}

          <div className="admin-list__items">
            {apartments.map((apartment) => (
              <article
                className="admin-card"
                key={apartment.id}
              >
                <img
                  className="admin-card__image"
                  src={apartment.image}
                  alt={apartment.title}
                />

                <div className="admin-card__content">
                  <h3 className="admin-card__title">
                    {apartment.title}
                  </h3>

                  <p className="admin-card__price">
                    {apartment.price}
                  </p>

                  <p className="admin-card__address">
                    {apartment.address}
                  </p>

                  <div className="admin-card__actions">
                    <Link
                      className="admin-card__link"
                      to={`/apartments/${apartment.id}`}
                    >
                      Открыть
                    </Link>

                    <button
                      className="admin-card__delete"
                      type="button"
                      onClick={() => handleDelete(apartment.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}