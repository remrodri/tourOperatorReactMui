import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../pages/mainLayout/MainLayout";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";

export const AppRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "gestion-de-usuarios",
          element: <UserManagementPage />,
          
        },
      ],
    },
  ],

  {
    future: {
      // v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
