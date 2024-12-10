import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../pages/mainLayout/MainLayout";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";
import RegisterContainer from "../features/userManagement/components/register/RegisterContainer";
import UserShowcase from "../features/userManagement/components/showcase/UserShowcase";
import UserShowcasePage from "../pages/UserShowcasePage";

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
          children: [
            {
              path: "nuevo",
              element: <RegisterContainer />,
            },
            {
              path: "usuarios",
              element: <UserShowcasePage />,
              children: [
                {
                  path: "",
                  element:<UserShowcase/>
              },
                {
                  path: "editar/:userId",
                  element: <RegisterContainer />,
                }
              ]
            },
          ],
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
