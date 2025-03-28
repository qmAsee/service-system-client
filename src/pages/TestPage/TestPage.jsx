import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./TestPage.module.scss";
import { new_mock_training_courses } from "../../utils/mock_training_courses";
import { ChevronLeft, HelpCircle, Clock2, Check, Trophy } from "lucide-react";
import BestWalkthroughs from "../../features/BestWalkthroughs/BestWalkthroughs";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../components/Header/Header";

export const TestPage = () => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { courseId, testId } = useParams();

  // Мемоизированное вычисление данных теста
  const courseData = useMemo(() => {
    return new_mock_training_courses.find((c) => c.id === courseId);
  }, [courseId]);

  useEffect(() => {
    if (courseData) {
      const foundTest = courseData.tests.find((elem) => elem.id === testId);
      setTest(foundTest || null);
      setLoading(false);
    }
  }, [courseData, testId]);

  // Рассчитываем общее время теста
  const totalTestTime = useMemo(() => {
    if (!test?.questions) return 0;
    return test.questions.reduce((total, question) => total + (question.timeLimit || 0), 0);
  }, [test]);

  // Форматирование времени в минуты
  const formatTime = (seconds) => {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} мин`;
  };

  if (loading) {
    return <div className={styles.loading}>Загрузка теста...</div>;
  }

  if (!test) {
    return <div className={styles.notFound}>Тест не найден</div>;
  }

  const handleStartTest = () => {
    if (test.questions?.length > 0) {
      navigate(`${test.questions[0].id}`);
    }
  };

  return (
    <>
      <Header title={"Тест"}/>
      {/* <header className={styles.test_header}>
        <ChevronLeft
          size={25}
          color="#616161"
          className={styles.test_back}
          onClick={() => navigate(`/learning/courses/${courseId}`)}
        />
        <h1 className={styles.test_title}> Тест</h1>
      </header> */}
      <AnimatePresence mode="wait">
        <motion.section
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={styles.section}
        >
          <div className={styles.test}>
            <section className={styles.test_properties}>
              <h2 className={styles.test_properties_title}>{test.title}</h2>
              
              <ul className={styles.test_properties_list}>
                <li>
                  <HelpCircle color="#fff" size={26} />
                  {test.questions.length} {getQuestionWord(test.questions.length)}
                </li>
                <li>
                  <Clock2 color="#fff" size={26} />
                  {formatTime(totalTestTime)}
                </li>
                <li>
                  <Check color="#fff" size={26} />test верных ответов для прохождения</li>
              </ul>
            </section>
            <section className={styles.test_passes}>
              <div className={styles.test_passes_head}>
                <h3 className={styles.test_passes_title}>
                  <Trophy color="rgb(95, 95, 255)" size={18} />
                  Лучшие прохождения
                </h3>
                <span className={styles.test_passes_num_participants}>Из 84 участников</span>
              </div>
              
              <div className={styles.test_properties_list}>
                {Array.from({ length: 8 }).map((_, index) => (
                  <BestWalkthroughs key={index} />
                ))}
              </div>
            </section>

            <div className={styles.test_btn}>
              <button 
                onClick={handleStartTest}
                disabled={!test.questions?.length}
              >
                Начать тест
              </button>
            </div>
          </div>
        </motion.section>
      </AnimatePresence>
    </>
  );
};

// Вспомогательная функция для склонения слова "вопрос"
function getQuestionWord(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return "вопросов";
  if (lastDigit === 1) return "вопрос";
  if (lastDigit >= 2 && lastDigit <= 4) return "вопроса";
  return "вопросов";
}