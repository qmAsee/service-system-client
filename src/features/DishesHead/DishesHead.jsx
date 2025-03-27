import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Star } from "lucide-react";
import styles from "./DishesHead.module.scss";

const DishesHead = () => {
  const navigate = useNavigate();
  return (
    <>
      <ChevronLeft 
        color={"#686868"}
        onClick={() => navigate("/learning")}/>
      <h2>Список блюд</h2>
      <div className={styles.dishes_head_star}>
        <Star width={"16px"} height={"16px"} color="#fff" />
      </div>
    </>
  );
};

export default DishesHead;