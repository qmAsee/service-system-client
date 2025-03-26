import React from "react";
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./DishesSuggest.module.scss";
import { Star } from "lucide-react";

const DishesSuggest = ({ productSuggest }) => {
  return (
    <>
      <h3 className={styles.dishes_suggest_title}>С этой позицией нужно предлагать</h3>
      <Swiper spaceBetween={15} slidesPerView={'auto'}>
        {productSuggest.map((el) => {
          return (
            <SwiperSlide key={el.productId} className={styles.dishes_suggest_slide}>
              <Link to={`/dishes/${el.productId}`}>
                <img src={el.image} alt="" loading="lazy" />
                <Star className={styles.dishes_suggest_star} />
                <h3 className={styles.dishes_suggest_name}>{el.name}</h3>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default DishesSuggest;