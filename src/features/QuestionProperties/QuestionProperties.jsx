import React from "react";
import styles from "./QuestionProperties.module.scss";

const QuestionProperties = ({ question }) => {

  return (
    <>
      <section className={styles.question_properties}>
        <img className={styles.question_properties_img} src={question.image} alt="" />
        <div className={styles.question_properties_question}>
          <span>{question.type == "open" ? 'Свободный ответ' : ''}</span>
          <h2 className={styles.question_properties_question_text}>{question.question}</h2>
        </div>
        <div className={styles.question_properties_answer}>
          <input className={styles.question_properties_answer_input} type="text" placeholder="Ваш ответ" />
          <span className={styles.question_properties_answer_title}>Подсказка:</span>
          <span className={styles.question_properties_answer_hint}>{question.hint}</span>
        </div>
      </section>
    </>
  );
};

export default QuestionProperties;