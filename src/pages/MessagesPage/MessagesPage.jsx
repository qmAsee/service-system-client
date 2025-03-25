/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from "react";
import styles from "./MessagesPage.module.scss";
import { mock_people_data } from "../../utils/mock_people_data";
import { motion, AnimatePresence } from "framer-motion";
import profile_icon from "../../assets/profile_icon.svg";
import { Loader } from "lucide-react";

export const MessagesPage = () => {
  const [data, setData] = useState(mock_people_data);
  return (
    <>
      <header className={styles.chats_header}>
        <h1 className={styles.chats_title}>Сообщения</h1>
      </header>
      <ul className={styles.chats_list}>
        <Suspense
          fallback={
            <div className={styles.loading}>
              <Loader className="loader" />
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <motion.section
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={styles.section}
            >
              {data.map((el) => {
                return (
                  <li className={styles.chats_chat} key={el.name}>
                    <img
                      src={profile_icon}
                      alt="profile_pic"
                      className={styles.chats_profile_img}
                    />
                    <div>
                      <span className={styles.chats_profile_name}>
                        {el.name}
                      </span>
                    </div>
                  </li>
                );
              })}
            </motion.section>
          </AnimatePresence>
        </Suspense>
      </ul>
    </>
  );
};
