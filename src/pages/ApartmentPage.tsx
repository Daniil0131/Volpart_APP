import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/ui/header";
import { Footer } from "../components/ui/footer";
import { AuthModal } from "../components/ui/auth-modal";
import {
  createApartmentReview,
  deleteApartmentReview,
  getApartmentById,
  updateApartmentReview,
} from "../api/apartmentsApi";
import type { User } from "../api/apartmentsApi";
import type { Apartment } from "../types/apartment";
import "./ApartmentPage.css";

export function ApartmentPage() {
  const { id } = useParams();

  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);

  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(5);

  const [isAuthModalOpened, setIsAuthModalOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");

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

  useEffect(() => {
    if (!id) {
      setMessage("Некорректный адрес квартиры");
      setIsLoading(false);
      return;
    }

    getApartmentById(id)
      .then((data) => {
        setApartment(data);
      })
      .catch(() => {
        setMessage("Квартира не найдена");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const handleReviewSubmit = async () => {
    setReviewMessage("");

    if (!user) {
      setIsAuthModalOpened(true);
      return;
    }

    if (!apartment) {
      return;
    }

    if (!reviewText.trim()) {
      setReviewMessage("Напишите текст отзыва");
      return;
    }

    const existingUserReview = apartment.reviews?.find(
      (review) => review.authorId === user.id
    );

    if (existingUserReview) {
      setReviewMessage("Вы уже оставили отзыв на эту квартиру");
      return;
    }

    try {
      const review = await createApartmentReview(apartment.id, {
        authorId: user.id,
        author: user.name,
        text: reviewText,
        rating,
      });

      setApartment({
        ...apartment,
        reviews: [...(apartment.reviews || []), review],
      });

      setReviewText("");
      setRating(5);
      setReviewMessage("");
    } catch (error) {
      setReviewMessage(
        error instanceof Error ? error.message : "Не удалось добавить отзыв"
      );
    }
  };

  const handleEditStart = (
    reviewId: number,
    text: string,
    reviewRating: number
  ) => {
    setEditingReviewId(reviewId);
    setEditedText(text);
    setEditedRating(reviewRating);
    setReviewMessage("");
  };

  const handleEditCancel = () => {
    setEditingReviewId(null);
    setEditedText("");
    setEditedRating(5);
  };

  const handleEditSave = async (reviewId: number) => {
    if (!apartment || !user) {
      return;
    }

    if (!editedText.trim()) {
      setReviewMessage("Отзыв не может быть пустым");
      return;
    }

    try {
      const updatedReview = await updateApartmentReview(
        apartment.id,
        reviewId,
        {
          authorId: user.id,
          text: editedText,
          rating: editedRating,
        }
      );

      setApartment({
        ...apartment,
        reviews: apartment.reviews?.map((review) =>
          review.id === reviewId ? updatedReview : review
        ),
      });

      handleEditCancel();
      setReviewMessage("");
    } catch (error) {
      setReviewMessage(
        error instanceof Error ? error.message : "Не удалось обновить отзыв"
      );
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!apartment || !user) {
      return;
    }

    try {
      await deleteApartmentReview(apartment.id, reviewId, user.id);

      setApartment({
        ...apartment,
        reviews: apartment.reviews?.filter((review) => review.id !== reviewId),
      });

      setReviewMessage("");
    } catch (error) {
      setReviewMessage(
        error instanceof Error ? error.message : "Не удалось удалить отзыв"
      );
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />

        <main className="apartment-page">
          <p className="apartment-page__message">Загрузка...</p>
        </main>

        <Footer />
      </>
    );
  }

  if (!apartment) {
    return (
      <>
        <Header />

        <main className="apartment-page">
          <p className="apartment-page__message">{message}</p>

          <Link to="/" className="apartment-page__back">
            ← На главную
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  const userAlreadyReviewed = apartment.reviews?.some(
    (review) => review.authorId === user?.id
  );

  return (
    <>
      <Header />

      <main className="apartment-page">
        <Link to="/" className="apartment-page__back">
          ← Назад к каталогу
        </Link>

        <section className="apartment-page__hero">
          <img
            className="apartment-page__image"
            src={apartment.image}
            alt={apartment.title}
          />

          <div className="apartment-page__info">
            <h1 className="apartment-page__title">{apartment.title}</h1>

            <p className="apartment-page__address">{apartment.address}</p>

            <p className="apartment-page__description">
              {apartment.description}
            </p>

            <p className="apartment-page__price">{apartment.price}</p>

            <button className="apartment-page__button" type="button">
              Забронировать
            </button>
          </div>
        </section>

        <section className="apartment-page__calendar">
          <h2>Календарь бронирования</h2>

          <div className="apartment-page__calendar-placeholder">
            Тут будет календарь для бронирования
          </div>
        </section>

        <section className="apartment-page__reviews">
          <h2>Отзывы о квартире</h2>

          <div className="apartment-page__review-form">
            <div className="apartment-page__rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={
                    star <= rating
                      ? "apartment-page__star apartment-page__star_active"
                      : "apartment-page__star"
                  }
                  onClick={() => setRating(star)}
                  disabled={Boolean(userAlreadyReviewed)}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              className="apartment-page__review-input"
              placeholder={
                userAlreadyReviewed
                  ? "Вы уже оставили отзыв на эту квартиру"
                  : "Напишите отзыв о квартире"
              }
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
              disabled={Boolean(userAlreadyReviewed)}
            />

            <button
              className="apartment-page__review-button"
              type="button"
              onClick={handleReviewSubmit}
              disabled={Boolean(userAlreadyReviewed)}
            >
              Оставить отзыв
            </button>

            {reviewMessage && (
              <p className="apartment-page__review-message">
                {reviewMessage}
              </p>
            )}
          </div>

          <div className="apartment-page__review-list">
            {(!apartment.reviews || apartment.reviews.length === 0) && (
              <p className="apartment-page__empty">
                Пока отзывов нет. Будьте первым.
              </p>
            )}

            {apartment.reviews?.map((review) => {
              const isOwnReview = user?.id === review.authorId;
              const isEditing = editingReviewId === review.id;
              const reviewRating = review.rating ?? 0;

              return (
                <article className="apartment-page__review" key={review.id}>
                  {isEditing ? (
                    <>
                      <div className="apartment-page__rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={
                              star <= editedRating
                                ? "apartment-page__star apartment-page__star_active"
                                : "apartment-page__star"
                            }
                            onClick={() => setEditedRating(star)}
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <textarea
                        className="apartment-page__review-input"
                        value={editedText}
                        onChange={(event) => setEditedText(event.target.value)}
                      />

                      <div className="apartment-page__review-actions">
                        <button
                          className="apartment-page__review-button"
                          type="button"
                          onClick={() => handleEditSave(review.id)}
                        >
                          Сохранить
                        </button>

                        <button
                          className="apartment-page__review-button apartment-page__review-button_secondary"
                          type="button"
                          onClick={handleEditCancel}
                        >
                          Отмена
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="apartment-page__review-stars">
                        {"★".repeat(reviewRating)}
                        {"☆".repeat(5 - reviewRating)}
                      </div>

                      <h3>{review.author}</h3>

                      <p>{review.text}</p>

                      <span>{review.createdAt}</span>

                      {isOwnReview && (
                        <div className="apartment-page__review-actions">
                          <button
                            className="apartment-page__review-edit"
                            type="button"
                            onClick={() =>
                              handleEditStart(
                                review.id,
                                review.text,
                                review.rating ?? 5
                              )
                            }
                          >
                            Редактировать
                          </button>

                          <button
                            className="apartment-page__review-delete"
                            type="button"
                            onClick={() => handleDeleteReview(review.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />

      {isAuthModalOpened && (
        <AuthModal
          onClose={() => setIsAuthModalOpened(false)}
          onSuccess={setUser}
        />
      )}
    </>
  );
}