import React from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DishesHead = () => {
  const navigate = useNavigate();
  return (
    <>
      <ChevronLeft 
        color={"#686868"}
        onClick={() => navigate(-1)}/>
      <h2>Список блюд</h2>
      {/* <img src="" alt="1" /> */}
    </>
  );
};

export default DishesHead;