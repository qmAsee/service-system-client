import React from "react";
import styles from "./MobileLayout.module.scss";
import { Outlet } from "react-router-dom";
import { Navigation } from "../../components/Navigation/Navigation";

export const MobileLayout = () => {
  return (
    <div className={styles.mobile_layout}>
      <main className={styles.main_content}>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
};
