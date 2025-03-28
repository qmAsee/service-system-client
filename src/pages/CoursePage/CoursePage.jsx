/* eslint-disable no-unused-vars */
import styles from "./CoursePage.module.scss";
import { useEffect, useState, useCallback } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, BookOpenText, ListCheck } from "lucide-react";

import { new_mock_training_courses } from "../../utils/mock_training_courses";

import Header from "../../components/Header/Header";
import AnimatedWrapper from "../../components/AnimatedWrapper/AnimatedWrapper";

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

    const handleNavigate = useCallback(
        (event) => {
            navigate(event.currentTarget.dataset.path);
            console.log(event.currentTarget.dataset.path);
        },
        [navigate]
    );

    if (!course) {
        return <div>Загрузка курса...</div>;
    }

    return (
        <>
            <Header title={`Курс "${course.title}"`} />
            {course ? (
                <AnimatedWrapper>
                    <section className={styles.course_content}>
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
                                    <BookOpenText size={25} color={"#8f8500"} />
                                    <span
                                        className={styles.course_material_info}
                                    >
                                        Уроки: {course.completedLessons}/
                                        {course.lessons.length}
                                    </span>
                                </div>
                                <div className={styles.course_material}>
                                    <ListCheck size={25} color={"#8f8500"} />
                                    <span
                                        className={styles.course_material_info}
                                    >
                                        Тесты: {course.completedTests}/
                                        {course.tests.length}
                                    </span>
                                </div>
                            </div>
                            <ul className={styles.course_lessons_list}>
                                {course.lessons.map((lesson) => {
                                    return (
                                        <li
                                            className={
                                                styles.course_lesson_wrapper
                                            }
                                            key={lesson.id}
                                            onClick={handleNavigate}
                                            data-path={`/learning/courses/${courseId}/${lesson.id}`}
                                        >
                                            <div
                                                className={
                                                    styles.course_lesson_icon_wrapper
                                                }
                                            >
                                                <BookOpenText
                                                    size={25}
                                                    color={"#ffffff"}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.course_lesson_info_wrapper
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.course_lesson_caption
                                                    }
                                                >
                                                    Урок
                                                </span>
                                                <h3
                                                    className={
                                                        styles.course_lesson_title
                                                    }
                                                >
                                                    {lesson.title}
                                                </h3>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <ul className={styles.course_lessons_list}>
                                {course.tests.map((test) => {
                                    return (
                                        <li
                                            className={
                                                styles.course_lesson_wrapper
                                            }
                                            key={test.id}
                                            onClick={() => navigate(`test/${test.id}`)}
                                        >
                                            <div
                                                className={
                                                    styles.course_test_icon_wrapper
                                                }
                                            >
                                                <ListCheck
                                                    size={25}
                                                    color={"#0550ff"}
                                                />
                                            </div>
                                            <div
                                                className={
                                                    styles.course_lesson_info_wrapper
                                                }
                                            >
                                                <span
                                                    className={
                                                        styles.course_lesson_caption
                                                    }
                                                >
                                                    Тест
                                                </span>
                                                <h3
                                                    className={
                                                        styles.course_lesson_title
                                                    }
                                                >
                                                    {test.title}
                                                </h3>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </article>
                    </section>
                </AnimatedWrapper>
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
