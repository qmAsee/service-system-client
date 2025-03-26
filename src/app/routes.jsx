import { createBrowserRouter, Navigate } from "react-router-dom";


import { MobileLayout } from "../layouts/MobileLayout/MobileLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import { MessagesPage } from "../pages/MessagesPage/MessagesPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { DishesPage } from "../pages/DishesPage/DishesPage";
export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MobileLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "learning", element: <LearningPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "dishes/:productId", element: <DishesPage /> },
    ],
  },
]);
