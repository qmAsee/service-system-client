/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "swiper/css";
import styles from "./LearningPage.module.scss";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Search, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { mock_menus_standards } from "../../utils/mock_menus_standards";
import { mock_surveys } from "../../utils/mock_surveys";

import TrainingCourses from "../../components/Learning/TrainingCourses/TrainingCourses";
import AnimatedWrapper from "../../components/AnimatedWrapper/AnimatedWrapper";

export const LearningPage = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");

    const handleSearch = () => {
        console.log("Searching for:", query);
        // Ваша логика поиска
    };

    return (
        <>
            <AnimatedWrapper className={styles.section}>
                <div className={styles.learningpage}>
                    <section className={styles.learningpage_search}>
                        <div className="relative w-full">
                            <Search className={styles.learningpage_ico} />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && handleSearch()
                                }
                                type="text"
                                placeholder="Поиск..."
                                className={styles.learningpage_search_input}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className={styles.learningpage_search_btn}
                        >
                            Найти
                        </button>
                    </section>

                    <TrainingCourses />

                    <section className={styles.menus_standards}>
                        <div className={styles.learningpage_head}>
                            <h2 className={styles.learningpage_head_title}>
                                Меню и стандарты
                            </h2>
                            <span className={styles.training_head_more}>
                                Показать все (80)
                            </span>
                        </div>
                        <Swiper spaceBetween={15} slidesPerView={"auto"}>
                            {mock_menus_standards.map((el) => {
                                return (
                                    <SwiperSlide
                                        key={el.productId}
                                        className={styles.menus_standards_slide}
                                        onClick={() =>
                                            navigate(
                                                `/learning/dishes/${el.productId}`
                                            )
                                        }
                                    >
                                        <Star
                                            className={
                                                styles.menus_standards_slide_star
                                            }
                                        />
                                        <img
                                            className={
                                                styles.menus_standards_slide_img
                                            }
                                            src={el.image}
                                            alt=""
                                            loading="lazy"
                                        />
                                        <h3
                                            className={
                                                styles.menus_standards_slide_title
                                            }
                                        >
                                            {el.name}
                                        </h3>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </section>
                    <section className={styles.atestation}>
                        <div className={styles.learningpage_head}>
                            <h2 className={styles.learningpage_head_title}>
                                Атестация
                            </h2>
                            <span className={styles.training_head_more}>
                                Показать все (6)
                            </span>
                        </div>
                        <span className="text-xs text-gray-400">
                            В этом разделе пока еще ничего не разместили{" "}
                        </span>
                    </section>
                    <section className={styles.surveys}>
                        <div className={styles.learningpage_head}>
                            <h2 className={styles.learningpage_head_title}>
                                Опросы
                            </h2>
                            <span className={styles.training_head_more}>
                                Показать все (1)
                            </span>
                        </div>
                        <Swiper spaceBetween={15} slidesPerView={"auto"}>
                            {mock_surveys.map((el, index) => {
                                return (
                                    <SwiperSlide
                                        key={index}
                                        className={styles.surveys_slide}
                                    >
                                        <img
                                            className={styles.surveys_slide_img}
                                            src={el.image}
                                            alt=""
                                            loading="lazy"
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </section>
                </div>
            </AnimatedWrapper>
        </>
    );
};
