import styles from "./Header.module.scss";

import { replace, useNavigate } from "react-router-dom";

import { ChevronLeft } from "lucide-react";

const Header = ({ title }) => {
    const navigate = useNavigate();

    return (
        <header className={styles.header}>
            <ChevronLeft
                size={25}
                color="#616161"
                className={styles.header_back_button}
                onClick={() => navigate(-1)}
            />
            <h1 className={styles.header_title}>{title}</h1>
        </header>
    );
};

export default Header;
