import React, { useState } from "react";
import styles from "../ForYouSection/ForYouSection.module.scss";
import { mock_news_data } from "../../utils/mock_news_data";
import { formatDate } from "../../utils/utils";
import food_pic from "../../assets/food_pic.webp";
import { CalendarDays } from "lucide-react";

const elementTypeNames = {
  course_update: {
    name: "Обновление курса",
    color: "#0550ff",
  },
  new_course: {
    name: "Новый курс",
    color: "#1fb002",
  },
  new_certification: {
    name: "Новая аттестация",
    color: "#b8ad33",
  },
  news: {
    name: "Новость",
    color: "#d236e0",
  },
};

const MaterialsSection = () => {
  const [data, setData] = useState(mock_news_data);
  return (
    <ul className={styles.homepage_list}>
      {data.map((el) => {
        return el.type === "new_course" || el.type === "new_certification" ? (
          <li className={styles.homepage_list_element} key={el.title}>
            <article className={styles.homepage_element_info}>
              <span
                className={styles.homepage_element_type}
                style={{
                  color: `${elementTypeNames[el.type].color}`,
                  borderBottom: `1px solid ${elementTypeNames[el.type].color}`,
                }}
              >
                {elementTypeNames[el.type].name}
              </span>

              <h3 className={styles.homepage_element_title}>{el.title}</h3>

              {el.test_period && (
                <span className={styles.homepage_element_period}>
                  <CalendarDays size={14} />
                  {formatDate(el.test_period.start)} -{" "}
                  {formatDate(el.test_period.end)}
                </span>
              )}

              <span className={styles.homepage_element_date}>
                {formatDate(el.date)}
              </span>
            </article>
            <img
              className={styles.homepage_list_element_pic}
              src={food_pic}
              alt="pic"
            />
          </li>
        ) : null;
      })}
    </ul>
  );
};

export default MaterialsSection;
