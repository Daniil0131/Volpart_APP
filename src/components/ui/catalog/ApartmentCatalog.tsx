import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getApartments } from "../../../api/apartmentsApi";
import type { Apartment } from "../../../types/apartment";
import "./ApartmentCatalog.css";

export function ApartmentCatalog() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getApartments()
      .then((data) => {
        setApartments(data);
      })
      .catch(() => {
        setError("Не удалось загрузить каталог");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const scrollLeft = () => {
    listRef.current?.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    listRef.current?.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <section className="catalog" id="catalog">
      <div className="catalog__header">
        <h2 className="catalog__title">Каталог</h2>

        <p className="catalog__subtitle">
          Выбирайте и бронируйте квартиры в районе <br />
          Комендантского проспекта
        </p>
      </div>

      {isLoading && <p className="catalog__message">Загрузка квартир...</p>}

      {error && <p className="catalog__message">{error}</p>}

      {!isLoading && !error && apartments.length === 0 && (
        <p className="catalog__message">
          Пока квартир нет. Добавьте первую квартиру через админ-панель.
        </p>
      )}

      {apartments.length > 0 && (
        <div className="catalog__slider">
         
          <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="catalog__arrow catalog__arrow_left"
            type="button"
            onClick={scrollLeft}
            aria-label="Листать влево">
            <circle cx="26.5" cy="26.5" r="26.5" fill="#264507"/>
            <path d="M30.735 36L20 26.5L30.735 17L32 18.1195L22.53 26.5L32 34.8805L30.735 36Z" fill="white"/>
          </svg>

          <div className="catalog__cards" ref={listRef}>
            {apartments.map((apartment) => (
              <article className="card" key={apartment.id}>
                <img
                  className="card__image"
                  src={apartment.image}
                  alt={apartment.title}
                />

                <div className="card__content">
                  <h3 className="card__title">{apartment.title}</h3>

                  <p className="card__description">
                    {apartment.description}
                  </p>

             

                  <div className="card__buttons">
                    <button className="card__button card__button_primary">
                      Забронировать
                    </button>

                    <Link
                      className="card__button card__button_secondary"
                      to={`/apartments/${apartment.id}`}
                    >
                      Подробнее
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
            

            

            
          <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg" className="catalog__arrow catalog__arrow_right" type="button"
            onClick={scrollRight}
            aria-label="Листать вправо">
            <circle cx="26.5" cy="26.5" r="26.5" fill="#264507"/>
            <path d="M22.265 36L33 26.5L22.265 17L21 18.1195L30.47 26.5L21 34.8805L22.265 36Z" fill="white"/>
          </svg>

        </div>
      )}
    </section>
  );
}