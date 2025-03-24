import React from 'react'
import styles from './Navigation.module.scss'
import { NavLink } from "react-router-dom";
import { Home, BookOpen, MessageCircle, User } from "lucide-react";

const NavbarLink = React.memo(({ to, children }) => {
  return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `${styles.navigation_item} ${isActive ? styles.navigation_item_active : ''}`
        }
      >
        {children}
      </NavLink>
  );
});

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavbarLink to="/home" className={styles.navigation_item}>
        <Home size={24} />
        <span className={styles.navigation_item_text}>Главная</span>
      </NavbarLink>
      <NavbarLink to="/learning" className={styles.navigation_item}>
        <BookOpen size={24} />
        <span className={styles.navigation_item_text}>Обучение</span>
      </NavbarLink>
      <NavbarLink to="/messages" className={styles.navigation_item}>
        <MessageCircle size={24} />
        <span className={styles.navigation_item_text}>Сообщения</span>
      </NavbarLink>
      <NavbarLink to="/profile" className={styles.navigation_item}>
        <User size={24} />
        <span className={styles.navigation_item_text}>Профиль</span>
      </NavbarLink>
    </nav>
  )
}
