import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./DishesGallery.module.scss";

const DishesGallery = ({ product }) => {
  return (
    <>
      <h3 className={styles.dishes_gallery_title}>Галерея</h3>
      <Swiper spaceBetween={15} slidesPerView={'auto'}>
        {product.gallery.map((el, index) => {
          return (
            <SwiperSlide key={index} className={styles.dishes_gallery_slide}>
              <img className={styles.surveys_slide_img} src={el} alt="" loading="lazy" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default DishesGallery;