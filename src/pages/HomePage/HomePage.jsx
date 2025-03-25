import React, { useRef, useEffect, useCallback } from "react";
import styles from "./HomePage.module.scss";
import "swiper/css";
import { PinnedNewsSlider } from "../../features/PinnedNewsSlider/PinnedNewsSlider";
import { TabMenuSections } from "../../features/TabMenuSections/TabMenuSections";
import HomePagePersonal from "../../features/HomePagePersonal/HomePagePersonal";

export const HomePage = () => {
  const personalRef = useRef(null);

  const handleScroll = useCallback(() => {
    const personalSection = personalRef.current;
    if (!personalSection) return;

    const sectionHeight = personalSection.offsetHeight;
    const scrollPosition = window.scrollY;

    const maxScroll = sectionHeight * 0.8;
    const opacity = Math.max(0, Math.min(1, 1 - scrollPosition / maxScroll));

    personalSection.style.opacity = opacity;
    personalSection.style.visibility = scrollPosition > sectionHeight ? 'hidden' : 'visible';
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className={styles.homepage}>
      <section ref={personalRef} className={styles.homepage_personal}>
        <HomePagePersonal />
      </section>
      <section className={styles.pinned_news}>
        <PinnedNewsSlider />
      </section>
      <section className={styles.homegape_content}>
        <TabMenuSections />
      </section>
    </div>
  );
};
