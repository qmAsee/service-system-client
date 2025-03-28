import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./QuestionPage.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { new_mock_training_courses } from "../../utils/mock_training_courses";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Ленивая загрузка компонентов
const LazyHeaderNav = React.lazy(() => import("../../features/HeaderNav/HeaderNav"));
const LazyQuestionProperties = React.lazy(() => import("../../features/QuestionProperties/QuestionProperties"));

const QuestionsState = {
  current: null,
  next: null,
  prev: null,
};

export const QuestionPage = () => {
  const [state, setState] = useState({
    isTransitioning: false,
    questions: QuestionsState,
    test: null,
    totalTime: 0,
    remainingTime: 0,
    isTimerRunning: true
  });

  const swiperRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const { courseId, testId, questionId } = useParams();

  // Мемоизированные данные курса
  const courseData = useMemo(() => (
    new_mock_training_courses.find((c) => c.id === courseId)
  ), [courseId]);

  // Получение данных вопроса с мемоизацией
  const getQuestionData = useCallback(() => {
    if (!courseData) return null;

    const foundTest = courseData.tests.find((elem) => elem.id === testId);
    if (!foundTest) return null;

    const foundQuestion = foundTest.questions.find((elem) => elem.id === questionId);
    if (!foundQuestion) return null;

    const currentIndex = foundTest.questions.findIndex(item => item.id === questionId);

    return {
      test: foundTest,
      question: foundQuestion,
      next: currentIndex < foundTest.questions.length - 1 
        ? foundTest.questions[currentIndex + 1] 
        : null,
      prev: currentIndex > 0 
        ? foundTest.questions[currentIndex - 1] 
        : null,
    };
  }, [courseData, testId, questionId]);

  // Форматирование времени
  const formatTime = useCallback((totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return [
      hours > 0 ? hours.toString().padStart(2, '0') : null,
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  }, []);

  // Расчет общего времени
  const calculateTotalTime = useCallback((questions) => (
    questions.reduce((total, question) => total + (question.timeLimit || 0), 0)
  ), []);

  // Управление таймером
  const startTimer = useCallback(() => {
    timerRef.current && clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        remainingTime: Math.max(0, prev.remainingTime - 1)
      }));
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Загрузка данных вопроса
  useEffect(() => {
    const data = getQuestionData();
    if (!data) return;

    setState(prev => ({
      ...prev,
      questions: {
        current: data.question,
        next: data.next,
        prev: data.prev,
      },
      test: data.test,
      totalTime: data.test?.questions ? calculateTotalTime(data.test.questions) : 0
    }));
  }, [getQuestionData, calculateTotalTime]);

  // Инициализация таймера
  useEffect(() => {
    if (state.totalTime > 0 && state.remainingTime === 0) {
      setState(prev => ({ ...prev, remainingTime: prev.totalTime }));
    }

    state.isTimerRunning ? startTimer() : stopTimer();
    
    return stopTimer;
  }, [state.totalTime, state.isTimerRunning, startTimer, stopTimer]);

  // Обработчики Swiper
  const handleSlideChange = useCallback((swiper) => {
    if (state.isTransitioning) return;

    const activeIndex = swiper.activeIndex;
    const { next, prev } = state.questions;

    if ((activeIndex === 2 && !next) || (activeIndex === 0 && !prev)) {
      swiper.slideTo(1);
      return;
    }

    if ((activeIndex === 2 && next) || (activeIndex === 0 && prev)) {
      setState(prev => ({ ...prev, isTransitioning: true }));
      swiper.allowTouchMove = false;
      
      navigate(`/learning/courses/${courseId}/test/${testId}/${
        activeIndex === 2 ? next.id : prev.id
      }`);
    }
  }, [state.isTransitioning, state.questions, navigate, courseId, testId]);

  const handleTransitionEnd = useCallback(() => {
    setState(prev => ({ ...prev, isTransitioning: false }));
    swiperRef.current && (swiperRef.current.allowTouchMove = true);
  }, []);

  // Текущий индекс вопроса
  const currentQuestionIndex = useMemo(() => (
    state.test?.questions.findIndex(q => q.id === questionId) + 1 || 1
  ), [state.test, questionId]);

  if (!state.questions.current) {
    return <div className="not-found">Вопрос не найден</div>;
  }

  return (
    <>
      <header className={styles.question_header}>
        <X
          size={25}
          color="#696969"
          className={styles.question_back}
          onClick={() => navigate(-1)}
          aria-label="Назад"
        />
        <h1 className={styles.question_title}>
          Вопрос {currentQuestionIndex} / {state.test?.questions?.length || 0}
        </h1>
        {state.totalTime > 0 && (
          <div className={styles.question_time}>
            {formatTime(state.remainingTime)}
          </div>
        )}
      </header>
      <section className={styles.question_nav}>
        <React.Suspense fallback={<div>Загрузка...</div>}>
          <LazyHeaderNav 
            id={currentQuestionIndex} 
            obj={state.test?.questions} 
          />
        </React.Suspense>
      </section>
      <AnimatePresence mode="wait">
        <motion.section
          key={currentQuestionIndex}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={styles.section}
        >
          <div className={styles.question}>
            <Swiper
              key={questionId}
              spaceBetween={15}
              slidesPerView={'auto'}
              initialSlide={1}
              speed={150}
              onSlideChange={handleSlideChange}
              onTransitionEnd={handleTransitionEnd}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              preventInteractionOnTransition
              resistanceRatio={0.5}
              shortSwipes
              allowSlidePrev={!!state.questions.prev}
              allowSlideNext={!!state.questions.next}
              style={{ height: '100%' }}
            >
              <SwiperSlide className={styles.dishes_gallery_slide}>
                {state.questions.prev && (
                  <React.Suspense fallback={<div>Загрузка...</div>}>
                    <LazyQuestionProperties question={state.questions.prev}/>
                  </React.Suspense>
                )}
              </SwiperSlide>
              
              <SwiperSlide className={styles.dishes_gallery_slide}>
                <React.Suspense fallback={<div>Загрузка...</div>}>
                  <LazyQuestionProperties question={state.questions.current}/>
                </React.Suspense>
              </SwiperSlide>
              
              <SwiperSlide className={styles.dishes_gallery_slide}>
                {state.questions.next && (
                  <React.Suspense fallback={<div>Загрузка...</div>}>
                    <LazyQuestionProperties question={state.questions.next}/>
                  </React.Suspense>
                )}
              </SwiperSlide>
            </Swiper>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};