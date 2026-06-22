import './additional-services.css';

import transferImg from '../../../assets/service-transfer.jpg';
import cleaningImg from '../../../assets/service-cleaning.jpg';
import linenImg from '../../../assets/service-linen.jpg';

const services = [
  {
    image: transferImg,
    title: 'Ранний или поздний\nзаезд/выезд',
  },
  {
    image: cleaningImg,
    title: 'Уборка',
  },
  {
    image: linenImg,
    title: 'Дополнительное\nпостельное белье',
  },
];

export function AdditionalServices() {
  return (
    <section className="services">
      <div className="services__container">
        <h2 className="services__title">
          Дополнительные услуги
        </h2>

        <p className="services__description">
          Для вашего комфортного проживания вы можете
          воспользоваться дополнительными услугами
        </p>

        <div className="services__list">
          {services.map((service) => (
            <article
              key={service.title}
              className="services__card"
            >
              <img
                src={service.image}
                alt={service.title}
                className="services__image"
              />

              <div className="services__overlay">
                <h3 className="services__card-title">
                  {service.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}