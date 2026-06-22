import "./booking.css";

export function Booking() {
  return (
    <section className="booking">
      <h2 className="booking__title">
        Бронируйте сейчас!
      </h2>

      <p className="booking__subtitle">
        Бронируйте сейчас и наслаждайтесь комфортным проживанием!
      </p>

      <button className="booking__button">
        Забронировать
      </button>
    </section>
  );
}