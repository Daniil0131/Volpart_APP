import type { ReactNode } from "react";
import "./rules.css";

type Rule = {
  icon: ReactNode;
  title: string;
  text: string;
};

const CheckIcon = () => (
   <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 13L10 18L19 7"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 6L18 18M18 6L6 18"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const rules: Rule[] = [
  {
    icon: <CheckIcon />,
    title: "Соблюдение тишины",
    text: "Просьба соблюдать тишину с 22:00 до 08:00.",
  },
  {
    icon: <CrossIcon />,
    title: "Запрет на шумные мероприятия",
    text: "Запрещается проведение шумных мероприятий в квартире.",
  },
  {
    icon: <CrossIcon />,
    title: "Курение",
    text: "Курение запрещено в квартирах и на территории комплекса.",
  },
  {
    icon: <CrossIcon />,
    title: "Размещение с животными",
    text: "Размещение с животными возможно только по предварительному согласованию.",
  },
];

export function Rules() {
  return (
    <section className="rules" id="rules">
      <div className="rules__container">
        <h2 className="rules__title">Правила проживания</h2>

        <p className="rules__description">
          Мы заботимся о комфорте всех гостей, поэтому просим вас соблюдать
          правила.
        </p>

        <div className="rules__grid">
          {rules.map((rule) => (
            <div className="rules__item" key={rule.title}>
              <div className="rules__icon">{rule.icon}</div>

              <div>
                <h3 className="rules__item-title">{rule.title}</h3>
                <p className="rules__item-text">{rule.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}