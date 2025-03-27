import { createBrowserRouter, Navigate } from "react-router-dom";


import { MobileLayout } from "../layouts/MobileLayout/MobileLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import { MessagesPage } from "../pages/MessagesPage/MessagesPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { DishesPage } from "../pages/DishesPage/DishesPage";

import CoursePage from "../pages/CoursePage/CoursePage";
import LessonPage from "../pages/LessonPage/LessonPage";
// import { TestPage } from "../pages/TestPage/TestPage";


export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MobileLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" replace /> },
      { path: "home", element: <HomePage /> },
      { path: "learning", element: <LearningPage /> },

      { path: "learning/courses/:courseId", element: <CoursePage /> },
      { path: "learning/courses/:courseId/:lessonId", element: <LessonPage /> },
      { path: "learning/dishes/:productId", element: <DishesPage /> },
      // { path: "learning/course/:courseId/lesson/:lessonId/test/:testId", element: <TestPage /> },

      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
]);
