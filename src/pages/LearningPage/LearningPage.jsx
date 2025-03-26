
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "./LearningPage.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { mock_menus_standards } from "../../utils/mock_menus_standards";
import { mock_surveys } from "../../utils/mock_surveys";

import { Search, Star } from 'lucide-react';

import TrainingCourses from "../../components/Learning/TrainingCourses/TrainingCourses";

import { motion, AnimatePresence } from "framer-motion";

export const LearningPage = () => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', query);
    // Ваша логика поиска
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.1 }}
          className={styles.section}
        >
          <div className={styles.learningpage}>
            <section className={styles.learningpage_search}>
              <div className="relative w-full">
                <Search className={styles.learningpage_ico}/>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  type="text"
                  placeholder="Поиск..."
                  className={styles.learningpage_search_input}
                />
              </div>
              <button onClick={handleSearch} className={styles.learningpage_search_btn}>Найти</button>
            </section>
  
            <TrainingCourses />

            <section className={styles.menus_standards}>
              <div className={styles.learningpage_head}>
                <h2 className={styles.learningpage_head_title}>Меню и стандарты</h2>
                <span className={styles.training_head_more}>Показать все (80)</span>
              </div>
              <Swiper spaceBetween={15} slidesPerView={'auto'}>
                {mock_menus_standards.map((el) => {
                  return (

                    <SwiperSlide className={styles.menus_standards_slide}>
                      <Star className={styles.menus_standards_slide_star}/>
                      <img className={styles.menus_standards_slide_img} src={el.image} alt="" loading="lazy"/>
                      <h3 className={styles.menus_standards_slide_title}>{el.title}</h3>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
            <section className={styles.atestation}>
              <div className={styles.learningpage_head}>
                <h2 className={styles.learningpage_head_title}>Атестация</h2>
                <span className={styles.training_head_more}>Показать все (6)</span>
              </div>
              <span className="text-xs text-gray-400">В этом разделе пока еще ничего не разместили </span>
            </section>
            <section className={styles.surveys}>
              <div className={styles.learningpage_head}>
                <h2 className={styles.learningpage_head_title}>Опросы</h2>
                <span className={styles.training_head_more}>Показать все (1)</span>
              </div>
              <Swiper spaceBetween={15} slidesPerView={'auto'}>
                {mock_surveys.map((el) => {
                  return (
                    <SwiperSlide className={styles.surveys_slide}>
                      <img className={styles.surveys_slide_img} src={el.image} alt="" loading="lazy"/>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  )
}
