import { createBrowserRouter, Navigate } from "react-router-dom";


import { MobileLayout } from "../layouts/MobileLayout/MobileLayout";
import { MobileLayoutWithoutNavigation } from "../layouts/MobileLayoutWithoutNavigation/MobileLayoutWithoutNavigation";

import { HomePage } from "../pages/HomePage/HomePage";
import { LearningPage } from "../pages/LearningPage/LearningPage";
import { MessagesPage } from "../pages/MessagesPage/MessagesPage";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import { DishesPage } from "../pages/DishesPage/DishesPage";
import { TestPage } from "../pages/TestPage/TestPage";
import { QuestionPage } from "../pages/QuestionPage/QuestionPage";

import CoursePage from "../pages/CoursePage/CoursePage";
import LessonPage from "../pages/LessonPage/LessonPage";

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
      { path: "learning/courses/:courseId/test/:testId", element: <TestPage /> },
      { path: "learning/dishes/:productId", element: <DishesPage /> },
    
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  }, {
    path: "/",
    element: <MobileLayoutWithoutNavigation />,
    children: [
      { path: "learning/courses/:courseId/test/:testId/:questionId", element: <QuestionPage /> },
    ],
  }
]);
