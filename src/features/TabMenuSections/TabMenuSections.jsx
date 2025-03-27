/* eslint-disable no-unused-vars */
import React, { Suspense, lazy, useState } from "react";
import styles from "./TabMenuSections.module.scss";
import { Loader } from "lucide-react";
import { TabMenu } from "../TabMenu/TabMenu";
import AnimatedWrapper from "../../components/AnimatedWrapper/AnimatedWrapper";
import MainPageSectionsTemplate from "../../features/MainPageSectionsTemplate/MainPageSectionsTemplate";
import { mock_news_data } from "../../utils/mock_news_data";

const SECTIONS = [
    { title: "Для вас", filter: () => true }, // Все данные
    { title: "Новости", filter: (el) => el.type === "new_course" || el.type === "news" },
    { title: "Материалы", filter: (el) => el.type === "new_course" || el.type === "course_update" || el.type === "new_certification"},
    { title: "Люди", filter: () => true },
];

export const TabMenuSections = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeFilter = SECTIONS[activeIndex].filter;
    const filteredData = mock_news_data.filter(activeFilter);

    return (
        <>
            <TabMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <div className={styles.sections}>
                <Suspense
                    fallback={
                        <div className={styles.loading}>
                            <Loader className="loader" />
                        </div>
                    }
                >
                    <AnimatedWrapper className={styles.section} activeIndex={activeIndex}>
                        <MainPageSectionsTemplate data={filteredData} />
                    </AnimatedWrapper>
                </Suspense>
            </div>
        </>
    );
};
