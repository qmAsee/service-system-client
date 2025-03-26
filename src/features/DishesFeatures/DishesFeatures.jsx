import React from "react";
import { Star } from "lucide-react";
import styles from "./DishesFeatures.module.scss";

const DishesFeatures = ({ product }) => {
  return (
    <>
      <img
        src={product.image}
        alt={product.name}
        className={styles.dishes_features_image}
      />
      <Star className={styles.dishes_features_star} />
      <h2 className={styles.dishes_features_name}>{product.name}</h2>
      <div className={styles.dishes_features_description}>
        <h3 className={styles.dishes_features_title}>Описание</h3>
        <p className="italic">{product.description}</p>
      </div>
      <div className={styles.dishes_features_details}>
        <div>
          <h3 className={styles.dishes_features_title}>Ингредиенты:</h3>
          <ul className={styles.dishes_features_title_list}>
            {product.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.dishes_features_nutrition_info}>
          <span>Цена: {product.weight} грамм г. - {product.price} рублей руб.</span>
        </div>
      </div>
    </>
  );
};

export default DishesFeatures;