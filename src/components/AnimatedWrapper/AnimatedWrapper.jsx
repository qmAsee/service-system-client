/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from "framer-motion";

const AnimatedWrapper = ({ children, activeIndex, className = "" }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.section
                key={activeIndex}
                className={className}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.1 }}
            >
                {children}
            </motion.section>
        </AnimatePresence>
    );
};

export default AnimatedWrapper;
