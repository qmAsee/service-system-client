import React from "react";
import { mock_menus_standards } from "../../utils/mock_menus_standards";
import styles from "./DishesNav.module.scss";

const DishesNav = ({ productId }) => {
  return (
    <>
      {mock_menus_standards.map((el, index) => {
        return (
          <div
            key={el.productId}
            style={{
              width: `${100 / mock_menus_standards.length}%`,
              background: index === productId - 1 ? "rgb(95, 95, 255)" : "#eaeaea",
            }}
            className={styles.dishes_nav_item}>
          </div>
        );
      })}
    </>
  );
};

export default DishesNav;