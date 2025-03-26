import React, { useState, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { mock_menus_standards } from "../../utils/mock_menus_standards";
import styles from "./DishesPage.module.scss";

import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import RecipeContent from "../../features/RecipeContent/RecipeContent";
import DishesHead from "../../features/DishesHead/DishesHead";
import DishesNav from "../../features/DishesNav/DishesNav";

// Предзагрузка компонентов, которые могут быть отложены
const LazyRecipeContent = React.lazy(() => import("../../features/RecipeContent/RecipeContent"));
const LazyDishesHead = React.lazy(() => import("../../features/DishesHead/DishesHead"));
const LazyDishesNav = React.lazy(() => import("../../features/DishesNav/DishesNav"));

export const DishesPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Объединяем состояния в один объект для уменьшения ререндеров
  const [products, setProducts] = useState({
    current: null,
    next: null,
    prev: null,
    currentSuggest: null,
    nextSuggest: null,
    prevSuggest: null
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Мемоизированная функция для поиска предложений
  const findSuggestions = useMemo(() => {
    return (item) => {
      if (!item?.suggest) return [];
      return item.suggest.map(elem => 
        mock_menus_standards.find(element => element.productId === elem)
      ).filter(Boolean);
    };
  }, []);

  useEffect(() => {
    let isMounted = true; // Флаг для избежания утечек памяти

    const fetchProductById = () => {
      try {
        const foundProduct = mock_menus_standards.find(item => item.productId === Number(productId));

        if (!foundProduct) {
          if (isMounted) setError('Блюдо не найдено');
          return;
        }

        const currentIndex = mock_menus_standards.findIndex(item => item.productId === parseInt(productId));

        // Вычисляем все данные за один проход
        const nextProd = currentIndex < mock_menus_standards.length - 1 
          ? mock_menus_standards[currentIndex + 1] 
          : null;
        const prevProd = currentIndex > 0 
          ? mock_menus_standards[currentIndex - 1] 
          : null;

        if (isMounted) {
          setProducts({
            current: foundProduct,
            next: nextProd,
            prev: prevProd,
            currentSuggest: findSuggestions(foundProduct),
            nextSuggest: nextProd ? findSuggestions(nextProd) : null,
            prevSuggest: prevProd ? findSuggestions(prevProd) : null
          });

          setLoading(false);
        }

        // Предзагрузка данных для соседних страниц
        if (nextProd) {
          const nextNextProd = currentIndex + 1 < mock_menus_standards.length - 1 
            ? mock_menus_standards[currentIndex + 2] 
            : null;
          if (nextNextProd) {
            findSuggestions(nextNextProd);
          }
        }
        if (prevProd) {
          const prevPrevProd = currentIndex - 1 > 0 
            ? mock_menus_standards[currentIndex - 2] 
            : null;
          if (prevPrevProd) {
            findSuggestions(prevPrevProd);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Ошибка загрузки данных');
          console.error('Ошибка:', err);
          setLoading(false);
        }
      }
    };

    // Задержка для демонстрации лоадера (можно убрать в продакшене)
    const timer = setTimeout(fetchProductById, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [productId, findSuggestions]);

  const handleSlideChange = (swiper) => {
    if (isTransitioning) return;
    
    const activeIndex = swiper.activeIndex;
    
    // Запрещаем переход, если нет следующего/предыдущего продукта
    if (activeIndex === 2 && !products.next) {
      swiper.slideTo(1); // Возвращаем на центральный слайд
      return;
    }
    
    if (activeIndex === 0 && !products.prev) {
      swiper.slideTo(1); // Возвращаем на центральный слайд
      return;
    }
    
    if (activeIndex === 2 && products.next) {
      setIsTransitioning(true);
      swiper.allowTouchMove = false;
      navigate(`/dishes/${products.next.productId}`);
    }
    else if (activeIndex === 0 && products.prev) {
      setIsTransitioning(true);
      swiper.allowTouchMove = false;
      navigate(`/dishes/${products.prev.productId}`);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = true;
    }
  };

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
  
  if (error) return <div className="error-message">{error}</div>;
  if (!products.current) return <div className="not-found">Блюдо не найдено</div>;

  return (
    <React.Suspense fallback={<div className="loading-spinner">Загрузка...</div>}>
      <AnimatePresence mode="wait">
        <motion.section
          key={productId}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }} // Уменьшил длительность анимации
        >
          <div>
            <section className={styles.dishes_head}>
              <LazyDishesHead />
            </section>
            <section className={styles.dishes_nav}>
              <LazyDishesNav productId={products.current.productId} />
            </section>
            <Swiper 
              key={productId}
              spaceBetween={15} 
              slidesPerView={'auto'}
              initialSlide={1}
              speed={300} // Уменьшил скорость анимации
              onSlideChange={handleSlideChange}
              onTransitionEnd={handleTransitionEnd}
              onSwiper={(swiper) => swiperRef.current = swiper}
              preventInteractionOnTransition={true}
              resistanceRatio={0.7}
              shortSwipes={false}
              allowSlidePrev={!!products.prev} // Разрешаем свайп назад только если есть предыдущий продукт
              allowSlideNext={!!products.next} // Разрешаем свайп вперед только если есть следующий продукт
            >
              <SwiperSlide className={styles.dishes_gallery_slide}>
                {products.prev && (
                  <div className={styles.slide_content}>
                    <LazyRecipeContent 
                      recipe={products.prev} 
                      suggest={products.prevSuggest} 
                      isPreview 
                    />
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide className={styles.dishes_gallery_slide}>
                <div className={styles.slide_content}>
                  <LazyRecipeContent 
                    recipe={products.current} 
                    suggest={products.currentSuggest} 
                    isActive 
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className={styles.dishes_gallery_slide}>
                {products.next && (
                  <div className={styles.slide_content}>
                    <LazyRecipeContent 
                      recipe={products.next} 
                      suggest={products.nextSuggest} 
                      isPreview 
                    />
                  </div>
                )}
              </SwiperSlide>
            </Swiper>
          </div>
        </motion.section>
      </AnimatePresence>
    </React.Suspense>
  )
}