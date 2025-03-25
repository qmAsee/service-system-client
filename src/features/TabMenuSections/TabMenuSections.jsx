/* eslint-disable no-unused-vars */
import React, { Suspense, lazy, useState } from "react";
import styles from "./TabMenuSections.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";
import { TabMenu } from "../TabMenu/TabMenu";

const ForYouSection = lazy(() => import("../ForYouSection/ForYouSection"));
const NewsSection = lazy(() => import("../NewsSection/NewsSection"));
const MaterialsSection = lazy(() =>
    import("../MaterialsSection/MaterialsSection")
);
const PeopleSection = lazy(() => import("../PeopleSection/PeopleSection"));

const SECTIONS = [ForYouSection, NewsSection, MaterialsSection, PeopleSection];

export const TabMenuSections = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const ActiveComponent = SECTIONS[activeIndex];

    return (
        <>
            <TabMenu
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            />
            <div className={styles.sections}>
                <Suspense
                    fallback={
                        <div className={styles.loading}>
                            <Loader className="loader" />
                        </div>
                    }
                >
                    <AnimatePresence mode="wait">
                        <motion.section
                            key={activeIndex}
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className={styles.section}
                        >
                            <ActiveComponent />
                        </motion.section>
                    </AnimatePresence>
                </Suspense>
            </div>
        </>
    );
};
