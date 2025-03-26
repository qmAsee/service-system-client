import React from "react";
import styles from "./RecipeContent.module.scss";

import DishesFeatures from "../../features/DishesFeatures/DishesFeatures";
import DishesGallery from "../../features/DishesGallery/DishesGallery";
import DishesSuggest from "../../features/DishesSuggest/DishesSuggest";

const RecipeContent = ({ recipe, suggest }) => {
    return (
      <>
        <section className={styles.dishes_features}>
          <DishesFeatures product={recipe} />
        </section>
        <section className={styles.dishes_gallery}>
          <DishesGallery product={recipe} />
        </section>
        {suggest && (
          <section className={styles.dishes_suggest}>
            <DishesSuggest productSuggest={suggest} />
          </section>
        )}
      </>
    );
  };


export default RecipeContent;