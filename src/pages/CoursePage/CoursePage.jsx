/* eslint-disable no-unused-vars */
import styles from "./CoursePage.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { new_mock_training_courses } from "../../utils/mock_training_courses";
import { useEffect, useState } from "react";

import { ChevronLeft, BookOpenText, ListCheck } from "lucide-react";

const CoursePage = () => {
    const [course, setCourse] = useState(null);

    const { courseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const foundCourse = new_mock_training_courses.find(
            (c) => c.id === courseId
        );
        setCourse(foundCourse || null); // Если курс не найден, оставляем null
    }, [courseId]);

    if (!course) {
        return <div>Загрузка курса...</div>;
    }

    return (
        <>
            <header className={styles.course_header}>
                <ChevronLeft
                    size={25}
                    color="#616161"
                    className={styles.course_back}
                    onClick={() => navigate(-1)}
                />
                <h1 className={styles.course_title}> Курс "{course.title}"</h1>
            </header>
            {course ? (
                <AnimatePresence mode="wait">
                    <motion.section
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className={styles.course_content}>
                            <img
                                src={course.image}
                                alt="Обложка курса"
                                className={styles.course_image}
                            ></img>
                            <article className={styles.course_info}>
                                <h2 className={styles.course_content_title}>
                                    {course.title}
                                </h2>
                                <p className={styles.course_description}>
                                    {course.description}
                                </p>
                                <div className={styles.course_materials}>
                                    <div className={styles.course_material}>
                                        <BookOpenText
                                            size={25}
                                            color={"#8f8500"}
                                        />
                                        <span
                                            className={
                                                styles.course_material_info
                                            }
                                        >
                                            Уроки: {course.completedLessons}/
                                            {course.lessons.length}
                                        </span>
                                    </div>
                                    <div className={styles.course_material}>
                                        <ListCheck
                                            size={25}
                                            color={"#8f8500"}
                                        />
                                        <span
                                            className={
                                                styles.course_material_info
                                            }
                                        >
                                            Тесты: {course.completedTests}/
                                            {course.tests.length}
                                        </span>
                                    </div>
                                </div>
                                <ul className={styles.course_lessons_list}>
                                    {
                                        course.lessons.map((lesson) => {
                                            return (
                                                <li className={styles.course_lesson_wrapper}>
                                                    <div className={styles.course_lesson_icon_wrapper}>
                                                        <BookOpenText
                                                            size={25}
                                                            color={"#ffffff"}
                                                        />
                                                    </div>
                                                    <div className={styles.course_lesson_info_wrapper}>
                                                        <span className={styles.course_lesson_caption}>Урок</span>
                                                        <h3 className={styles.course_lesson_title}>{lesson.title}</h3>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                                <ul className={styles.course_lessons_list}>
                                    {
                                        course.tests.map((test) => {
                                            return (
                                                <li className={styles.course_lesson_wrapper}>
                                                    <div className={styles.course_test_icon_wrapper}>
                                                        <ListCheck
                                                            size={25}
                                                            color={"#0550ff"}
                                                        />
                                                    </div>
                                                    <div className={styles.course_lesson_info_wrapper}>
                                                        <span className={styles.course_lesson_caption}>Тест</span>
                                                        <h3 className={styles.course_lesson_title}>{test.title}</h3>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>

                            </article>
                        </div>
                    </motion.section>
                </AnimatePresence>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className={styles.loading}
                >
                    Загрузка курса...
                </motion.div>
            )}
        </>
    );
};

export default CoursePage;
