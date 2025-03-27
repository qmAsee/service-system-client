/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from "react";
import styles from "./MessagesPage.module.scss";

import { mock_people_data } from "../../utils/mock_people_data";
import profile_icon from "../../assets/profile_icon.svg";

import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";

import AnimatedWrapper from "../../components/AnimatedWrapper/AnimatedWrapper";
import Header from "../../components/Header/Header";

export const MessagesPage = () => {
    const [data, setData] = useState(mock_people_data);
    return (
        <>
            <Header title={"Сообщения"} />
            <ul className={styles.chats_list}>
                <Suspense
                    fallback={
                        <div className={styles.loading}>
                            <Loader className="loader" />
                        </div>
                    }
                >
                    <AnimatedWrapper className={styles.section}>
                        {data.map((el) => {
                            return (
                                <li className={styles.chats_chat} key={el.name}>
                                    <img
                                        src={profile_icon}
                                        alt="profile_pic"
                                        className={styles.chats_profile_img}
                                    />
                                    <div>
                                        <span
                                            className={
                                                styles.chats_profile_name
                                            }
                                        >
                                            {el.name}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </AnimatedWrapper>
                </Suspense>
            </ul>
        </>
    );
};
