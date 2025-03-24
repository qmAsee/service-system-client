import React, { useRef, useEffect } from "react";
import styles from "./HomePage.module.scss";
import "swiper/css";
import profile_icon from "../../assets/profile_icon.svg";
import { Coins, Gift } from "lucide-react";
import { mock_pinned_news_data } from "../../utils/mock_pinned_news_data";
import { Swiper, SwiperSlide } from "swiper/react";

export const HomePage = () => {
  const personalRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const personalSection = personalRef.current;
      if (!personalSection) return;

      const sectionHeight = personalSection.offsetHeight;
      const scrollPosition = window.scrollY;

      const maxScroll = sectionHeight * 0.8; 
      let opacity = 1 - scrollPosition / maxScroll; 

      if (opacity < 0) opacity = 0;
      if (opacity > 1) opacity = 1;

      personalSection.style.opacity = opacity;

      if (scrollPosition > sectionHeight) {
        personalSection.style.visibility = "hidden";
      } else {
        personalSection.style.visibility = "visible";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Очистка
  }, []);
  return (
    <div className={styles.homepage}>
      <section ref={personalRef} className={styles.homepage_personal}>
        <div className="flex items-center justify-between w-full">
          <div className={styles.homepage_profile_thumb}>
            <img src={profile_icon} className={styles.homepage_profile_pic} />
            <div className={styles.homepage_name_wrapper}>
              <span>Иван Иванов</span>
              <span className={styles.homepage_comingback}>С возвращением!</span>
            </div>
          </div>
          <div className={styles.homepage_personal_bonuses}>
            <div className="flex items-center gap-1">
              <Coins color={"#ffff47"} width={20} />
              <span className="text-xs">10</span>
            </div>
            <Gift color={"#6c8de0"} w={20} />
          </div>
        </div>
        <div className={styles.homepage_personal_course}>
          <div className="flex flex-col">
            <span className="text-md font-bold text-gray-600 w-fit">
              вам нужно пройти
            </span>
            <span className="text-3xl font-bold text-white w-fit mb-3">
              8 курсов
            </span>
            <button className={styles.homepage_personal_button}>Перейти</button>
          </div>
        </div>
      </section>
      <section className={styles.pinned_news}>
        <h2 className="font-bold">Закрепленные новости</h2>
        <Swiper spaceBetween={8} slidesPerView={3} loop navigation>
          {/* <ul className={styles.pinned_news_list}> */}
          {mock_pinned_news_data.map((el) => {
            return (
              <SwiperSlide
                className={styles.pinned_news_element}
                style={{ backgroundImage: `url(${el.image})` }}
                key={el.title}
              >
                <p className={styles.pinned_news_element_title}>{el.title}</p>
              </SwiperSlide>
            );
          })}
          {/* </ul> */}
        </Swiper>
      </section>

      
    </div>
  );
};
