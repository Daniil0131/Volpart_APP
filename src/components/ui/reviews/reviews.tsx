import "./reviews.css";

import "./reviews.css";

import review1 from "../../../assets/review-1.jpg";
import review2 from "../../../assets/review-2.jpg";
import review3 from "../../../assets/review-3.jpg";
type Review = {
  name: string;
  role: string;
  text: string;
  avatar: string;
};

const reviews: Review[] = [
  {
    name: "Анна М.",
    role: "Гость",
    avatar: review1,
    text: "Работа с этой командой была исключительно слаженной и хорошо скоординированной. Их внимание к деталям и способность воплощать идеи в значимые результаты сделали сотрудничество по-настоящему продуктивным.",
  },
  {
    name: "Илья Д.",
    role: "Гость",
    avatar: review2,
    text: "Работа с этой командой была приятной и вдохновляющей. Благодаря их продуманному подходу, ясности мышления и умению превращать идеи в структурированные результаты весь процесс казался естественным и эффективным.",
  },
  {
    name: "Артем С.",
    role: "Гость",
    avatar: review3,
    text: "Процесс был четким, продуманным и вдохновляющим от начала и до конца. Сбалансированный подход и постоянная коммуникация помогли добиться результата, который превзошел ожидания и полностью соответствовал нашему видению.",
  },
];

export function Reviews() {
  return (
    <section className="reviews">
      <h2 className="reviews__title">Отзывы людей, которые выбрали нас</h2>

      <div className="reviews__list">
        {reviews.map((review) => (
          <article className="reviews__card" key={review.name}>
            <div className="reviews__stars">★★★★★</div>

            <p className="reviews__text">{review.text}</p>

            <div className="reviews__author">
              <img className="reviews__avatar" src={review.avatar} alt={review.name} />

              <div>
                <h3 className="reviews__name">{review.name}</h3>
                <p className="reviews__role">{review.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}