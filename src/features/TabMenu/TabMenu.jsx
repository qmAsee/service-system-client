import React from "react";
import styles from "./TabMenu.module.scss";

export const TabMenu = ({ activeIndex, setActiveIndex }) => {
  const tabs = ["Для вас", "Новости", "Материалы", "Люди"];

  return (
    <div className={styles.tab_menu}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`${styles.tab} ${activeIndex === index ? styles.active : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          {tab}
        </button>
      ))}
      <div className={styles.indicator} style={{ transform: `translateX(${activeIndex * 100}%)` }} />
    </div>
  );
};
