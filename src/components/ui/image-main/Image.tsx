import "./image.css";

export function Hero() {
  return (
    <section className="hero-con">
      <div className="hero">
        <div className="hero__overlay">
          <div className="hero__content">
            <h1 className="hero__title">Компания Волпарт</h1>

            <p className="hero__subtitle">
              Дарим заботу в любой точке Санкт-Петербурга
            </p>

            <a href="#catalog" className="hero__button">
              Посмотреть каталог
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}