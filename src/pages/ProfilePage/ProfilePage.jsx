import React from "react";
import styles from "./ProfilePage.module.scss";

import profile_icon from "../../assets/profile_icon.svg";

import { CalendarDays, ScrollText, ChevronRight } from "lucide-react";

import AnimatedWrapper from "../../components/AnimatedWrapper/AnimatedWrapper";

export const ProfilePage = () => {
    return (
        <>
            <AnimatedWrapper className={styles.section}>
                <header className={styles.profile_header}>
                    <div className={styles.profile_main_info}>
                        <img
                            src={profile_icon}
                            alt="profile_image"
                            className={styles.profile_image}
                        />
                        <h1 className={styles.profile_name}>Иван Иванов</h1>
                    </div>
                    <div className={styles.profile_contacts}>
                        <span>+79521234567</span>
                        <span>Restaurant Restaurant</span>
                    </div>
                </header>
                <section className={styles.profile_schedule}>
                    <CalendarDays color={"#5f5fff"} size={20} />
                    <a
                        href="/profile"
                        className={styles.profile_schedule_title}
                    >
                        График работы на март 2025 г.
                    </a>
                </section>
                <section className={styles.profile_bonuses}>
                    <div className={styles.profile_suggested_bonus}>
                        <p className={styles.profile_bonus_text}>
                            получайте монеты и приобретайте крутые вещи
                        </p>
                    </div>
                </section>
                <section className={styles.profile_certificates}>
                    <div className={styles.profile_certificates_wrapper}>
                        <ScrollText size={20} color={"#5f5fff"} />
                        <span className={styles.profile_certificates_title}>
                            Сертификаты{" "}
                            <span className={styles.profile_certificates_count}>
                                (3)
                            </span>
                        </span>
                    </div>
                    <ChevronRight color={"#8f8f8f"} size={20} />
                </section>
            </AnimatedWrapper>
        </>
    );
};
