import React, { useState, memo } from "react";
import "swiper/css";
import styles from './PinnedNewsSlider.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { mock_pinned_news_data } from "../../utils/mock_pinned_news_data";

/* eslint-disable no-unused-vars */
export const PinnedNewsSlider = memo(() => {
    const [news, setNews] = useState(mock_pinned_news_data)

    return (
        <>
            <h2 className="font-bold">Закрепленные новости</h2>
            <Swiper spaceBetween={8} slidesPerView={3} loop={false}>
                {news.map((el) => {
                    return (
                        <SwiperSlide
                            className={styles.pinned_news_element}
                            style={{ backgroundImage: `url(${el.image})` }}
                            key={el.title}
                        >
                            <p className={styles.pinned_news_element_title}>
                                {el.title}
                            </p>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
});

// export default PinnedNewsSlider;
