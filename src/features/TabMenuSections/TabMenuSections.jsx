import React, { Suspense, lazy } from "react";
import styles from "./TabMenuSections.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "lucide-react";

// import {ForYouSection} from "../ForYouSection/ForYouSection";
// import {NewsSection} from "../NewsSection/NewsSection";
// import {MaterialsSection} from "../MaterialsSection/MaterialsSection";
// import {PeopleSection} from "../PeopleSection/PeopleSection";

const ForYouSection = lazy(() => import("../ForYouSection/ForYouSection"));
const NewsSection = lazy(() => import("../NewsSection/NewsSection"));
const MaterialsSection = lazy(() => import("../MaterialsSection/MaterialsSection"));
const PeopleSection = lazy(() => import("../PeopleSection/PeopleSection"));

const SECTIONS = [ForYouSection, NewsSection, MaterialsSection, PeopleSection];

export const TabMenuSections = ({ activeIndex }) => {
  const ActiveComponent = SECTIONS[activeIndex];

  return (
    <div className={styles.sections}>
      <Suspense fallback={<div className={styles.loading}><Loader className="loader"/></div>}>
        {/* <ActiveComponent />
           */}
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
  );
};
