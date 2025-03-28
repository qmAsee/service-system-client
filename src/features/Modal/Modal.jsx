import React, { useState } from "react";
import styles from "../Modal/Modal.module.scss";
import { motion, AnimatePresence } from "framer-motion";
const Modal = ({ onClose, onConfirm }) => {
  return (
    <motion.section
      className={styles.modal_overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={styles.modal_content}>
        <div className={styles.modal_text}>
          <h3>Вы действительно хотите выйти?</h3>
          <p>Результат теста не сохранится</p>
        </div>
        <div className={styles.modal_buttons}>
          <button onClick={onClose}>Нет</button>
          <button onClick={onConfirm}>Да, выйти</button>
        </div>
      </div>
    </motion.section>
  );
};
export default Modal;