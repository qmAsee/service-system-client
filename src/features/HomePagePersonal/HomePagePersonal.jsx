import React, { memo } from 'react'
import styles from "./HomePagePersonal.module.scss"
import profile_icon from "../../assets/profile_icon.svg";
import { Coins, Gift } from "lucide-react";

const HomePagePersonal = memo(() => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
          <div className={styles.homepage_profile_thumb}>
            <img src={profile_icon} className={styles.homepage_profile_pic} alt="Аватар"/>
            <div className={styles.homepage_name_wrapper}>
              <span>Иван Иванов</span>
              <span className={styles.homepage_comingback}>
                С возвращением!
              </span>
            </div>
          </div>
          <div className={styles.homepage_personal_bonuses}>
            <div className="flex items-center gap-1">
              <Coins color={"#ffff47"} size={20} />
              <span className="text-xs">10</span>
            </div>
            <Gift color={"#5f5fff"} size={20} />
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
    </>
  )
});

HomePagePersonal.displayName = 'HomePagePersonal';

export default HomePagePersonal;