import React from "react";
import styles from "./BestWalkthroughs.module.scss";
import profile_icon from "../../assets/profile_icon.svg";

const BestWalkthroughs = () => {
  return (
    <>
      <li className={styles.test_properties_list_item}>
        <div className={styles.test_properties_list_item_left}>
          <span>1</span>
          <img src={profile_icon} alt="" />
          <div className={styles.test_properties_list_item_info}>
            <span>Игорь Матвеев</span>
            <span className={styles.test_properties_list_item_post}>Кассир-бариста, Fresh Bowl Депо</span>
          </div>
        </div>
        <span className={styles.test_properties_list_item_time}>0:04</span>
      </li>
    </>
  );
};

export default BestWalkthroughs;