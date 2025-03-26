import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./LearningPage.module.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { mock_training_courses } from "../../utils/mock_training_courses";
import { mock_menus_standards } from "../../utils/mock_menus_standards";
import { mock_surveys } from "../../utils/mock_surveys";

import { Search } from 'lucide-react';
import { Star } from "lucide-react";
import { BookCheck } from "lucide-react";
import { ClipboardList } from "lucide-react";

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
                <Search className={styles.learningpage_ico} />
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
            <section className={styles.training_courses}>
              <div className={styles.learningpage_head}>
                <h2 className={styles.learningpage_head_title}>Учебные курсы</h2>
                <span className={styles.training_head_more}>Показать все (8)</span>
              </div>
              <Swiper spaceBetween={15} slidesPerView={'auto'}>
                {mock_training_courses.map((el, index) => {
                  return (
                    <SwiperSlide key={index} className={styles.training_courses_slide}>
                      <img className={styles.training_courses_slide_img} src={el.image} alt="" loading="lazy" />
                      <div className={styles.training_courses_slide_progress}>
                        <div className={styles.training_courses_slide_progress_done}></div>
                      </div>
                      <h3 className={styles.training_courses_slide_title}><img className="w-4 h-4" src={el.ico} alt="" />{el.title}</h3>
                      <div className={styles.training_courses_slide_desc}>
                        <span className={styles.training_courses_slide_desc_item}><BookCheck className="w-4 h-4" />Уроки: {el.lessons}</span>
                        <span className={styles.training_courses_slide_desc_item}><ClipboardList className="w-4 h-4" />Тесты: {el.tests}</span>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </section>
            <section className={styles.menus_standards}>
              <div className={styles.learningpage_head}>
                <h2 className={styles.learningpage_head_title}>Меню и стандарты</h2>
                <span className={styles.training_head_more}>Показать все (80)</span>
              </div>
              <Swiper spaceBetween={15} slidesPerView={'auto'}>
                {mock_menus_standards.map((el) => {
                  return (
                    <SwiperSlide key={el.productId} className={styles.menus_standards_slide}>
                      <Link to={`/dishes/${el.productId}`}>
                        <Star className={styles.menus_standards_slide_star} />
                        <img className={styles.menus_standards_slide_img} src={el.image} alt="" loading="lazy" />
                        <h3 className={styles.menus_standards_slide_title}>{el.name}</h3>
                      </Link>
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
                {mock_surveys.map((el, index) => {
                  return (
                    <SwiperSlide key={index} className={styles.surveys_slide}>
                      <img className={styles.surveys_slide_img} src={el.image} alt="" loading="lazy" />
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
