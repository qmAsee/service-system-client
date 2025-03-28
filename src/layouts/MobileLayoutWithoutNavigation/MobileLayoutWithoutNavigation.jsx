import React from "react";
import styles from "./MobileLayoutWithoutNavigation.module.scss";
import { Outlet } from "react-router-dom";


export const MobileLayoutWithoutNavigation = () => {
    return (
    <div className={styles.mobile_layout}>
      <main className={styles.main_content}>
        <Outlet />
      </main>
    </div>
  );
};
