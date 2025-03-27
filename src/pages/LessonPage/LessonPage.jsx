import styles from "./LessonPage.module.scss";
import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { new_mock_training_courses } from "../../utils/mock_training_courses";

import Header from "../../components/Header/Header";
import AnimatedWrapper from "../../components/AnimatedWrapper/AnimatedWrapper";

const LessonPage = () => {
    const [lesson, setLesson] = useState(null);
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Находим курс по courseId
        const foundCourse = new_mock_training_courses.find(
            (c) => c.id === courseId
        );

        if (foundCourse) {
            // Находим урок внутри курса по lessonId
            const foundLesson = foundCourse.lessons.find(
                (l) => l.id === lessonId
            );
            setLesson(foundLesson || null);
        } else {
            setLesson(null);
        }
    }, [courseId, lessonId]);

    if (!lesson) {
        return <div>Загрузка урока...</div>;
    }

    console.log(lesson);

    return (
        <>
            <Header title={"Урок"} />
            <AnimatedWrapper>
                <section className={styles.lessonpage_content}>
                    <div className={styles.lesson_heading}>
                        <img
                            src={lesson.image}
                            alt={"Обложка урока"}
                            className={styles.lesson_image}
                        />
                        <h1 className={styles.lesson_title}>
                            Урок "{lesson.title}"
                        </h1>
                    </div>
                    {lesson ? (
                        lesson.blocks.map((block) => {
                            return (
                                <article
                                    key={block.id}
                                    className={styles.lesson_block}
                                >
                                    <h2 className={styles.block_title}>
                                        {block.blockTitle}
                                    </h2>
                                    <p className={styles.block_text}>
                                        {block.blockText}
                                    </p>
                                </article>
                            );
                        })
                    ) : (
                        <h1>Загрузка...</h1>
                    )}

                    <button
                        className={styles.lesson_endbutton}
                        type="button"
                        onClick={() => navigate(-1)}
                    >
                        Завершить урок
                    </button>
                </section>
            </AnimatedWrapper>
        </>
    );
};

export default LessonPage;
