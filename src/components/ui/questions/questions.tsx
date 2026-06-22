import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./questions.css";

const questions = [
  {
    title: "Какие документы нужны для бронирования?",
    answer: "Для бронирования квартиры вам потребуется только паспорт.",
  },
  {
    title: "Можно ли изменить даты бронирования?",
    answer: "Да, даты можно изменить при наличии свободных квартир.",
  },
  {
    title: "В какое время осуществляется заезд или выезд?",
    answer:
      "Обычное время заселения — 15:00. Время выезда — 11:00, но можно договориться о другом времени. Главное, сообщите заранее.",
  },
  {
    title: "Можно ли оплатить бронь онлайн?",
    answer:
      "Да, вы можете оплатить бронь онлайн через наш сайт с помощью банковской карты или электронных платёжных систем.",
  },
];

export function Questions() {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenedIndex(openedIndex === index ? null : index);
  };

  return (
    <section className="questions" id="questions">
      <h2 className="questions__title">
        Часто задаваемые вопросы
      </h2>

      <p className="questions__subtitle">
        Ответы на вопросы, которые помогут вам комфортно
        <br />
        забронировать квартиру
      </p>

      <div className="questions__grid">
        {questions.map((question, index) => {
          const isOpened = openedIndex === index;

          return (
            <div className="questions__item" key={question.title}>
              <button
                className="questions__button"
                type="button"
                onClick={() => handleToggle(index)}
              >
                <span>{question.title}</span>

                <motion.span
                  className="questions__icon"
                  animate={{ rotate: isOpened ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpened && (
                  <motion.div
                    className="questions__answer-wrapper"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="questions__answer">
                      {question.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}