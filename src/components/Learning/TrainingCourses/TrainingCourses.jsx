/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react'
import { useNavigate } from "react-router-dom";
import styles from './TrainingCourses.module.scss'

import { new_mock_training_courses } from "../../../utils/mock_training_courses";

import { Swiper, SwiperSlide } from "swiper/react";

import { BookCheck } from "lucide-react";
import { ClipboardList } from "lucide-react";

const TrainingCourses = () => {
  const [courses, setCourses] = useState(new_mock_training_courses);
  const navigate = useNavigate();
  
    const coursesWithTestCounts = useMemo(() => {
        return courses.map(course => ({
          ...course,
          totalTests: course.lessons.reduce((acc, lesson) => acc + (lesson.tests?.length || 0), 0)
        }));
      }, [courses]);

  return (
    <section className={styles.training_courses}>
        <div className={styles.learningpage_head}>
            <h2 className={styles.learningpage_head_title}>Учебные курсы</h2>
            <span className={styles.training_head_more}>Показать все (8)</span>
        </div>
        <Swiper spaceBetween={15} slidesPerView={'auto'}>
            {coursesWithTestCounts.map((el) => {
            return (
                <SwiperSlide className={styles.training_courses_slide} key={el.id} onClick={() => navigate(`/learning/courses/${el.id}`)}>
                    <img className={styles.training_courses_slide_img} src={el.image} alt="" loading="lazy"/>
                    <div className={styles.training_courses_slide_progress}>
                        <div className={styles.training_courses_slide_progress_done}></div>
                    </div>
                    <h3 className={styles.training_courses_slide_title}>{el.title}</h3>
                    <div className={styles.training_courses_slide_desc}>
                        <span className={styles.training_courses_slide_desc_item}><BookCheck className="w-4 h-4" />Уроки: {el.lessons.length}</span>
                        <span className={styles.training_courses_slide_desc_item}><ClipboardList className="w-4 h-4" />Тесты: {el.totalTests}</span>
                    </div>
                </SwiperSlide>
            );
            })}
        </Swiper>
    </section>
  )
}

export default TrainingCourses
