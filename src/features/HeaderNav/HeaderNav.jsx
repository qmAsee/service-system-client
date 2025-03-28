import React from "react";
import styles from "./HeaderNav.module.scss";

const HeaderNav = ({ id, obj }) => {
  return (
    <>
      {obj.map((el, index) => {
        return (
          <div
            key={index}
            style={{
              width: `${100 / obj.length}%`,
              background: index === id - 1 ? "rgb(95, 95, 255)" : "#e6e6e6",
            }}
            className={styles.dishes_nav_item}>
          </div>
        );
      })}
    </>
  );
};

export default HeaderNav;