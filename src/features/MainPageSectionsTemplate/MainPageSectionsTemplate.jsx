import React from "react";
import styles from "./MainPageSectionsTemplate.module.scss";
import { formatDate } from "../../utils/utils";
import food_pic from "../../assets/food_pic.webp";
import { CalendarDays } from "lucide-react";

const elementTypeNames = {
  course_update: { name: "Обновление курса", color: "#0550ff" },
  new_course: { name: "Новый курс", color: "#1fb002" },
  new_certification: { name: "Новая аттестация", color: "#b8ad33" },
  news: { name: "Новость", color: "#d236e0" },
};

const MainPageSectionsTemplate = ({ data, activeType }) => {
  // Фильтрация данных в зависимости от активного типа
  const filteredData = data.filter((el) => activeType ? el.type === activeType : true);

  return (
    <ul className={styles.list}>
      {filteredData.length === 0 ? (
        <p className={styles.no_data}>Нет данных</p>
      ) : (
        filteredData.map((el) => (
          <li className={styles.list_element} key={el.title}>
            <article className={styles.element_info}>
              <span
                className={styles.element_type}
                style={{
                  color: elementTypeNames[el.type]?.color || "#000",
                  borderBottom: `1px solid ${elementTypeNames[el.type]?.color || "#000"}`,
                }}
              >
                {elementTypeNames[el.type]?.name || "Неизвестно"}
              </span>
              <h3 className={styles.element_title}>{el.title}</h3>
              {el.test_period && (
                <span className={styles.element_period}>
                  <CalendarDays size={14} />
                  {formatDate(el.test_period.start)} - {formatDate(el.test_period.end)}
                </span>
              )}
              <span className={styles.element_date}>{formatDate(el.date)}</span>
            </article>
            <img className={styles.element_pic} src={food_pic} alt="pic" />
          </li>
        ))
      )}
    </ul>
  );
};

export default MainPageSectionsTemplate;
