import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../pages/mainLayout/MainLayout";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";
import RegisterContainer from "../features/userManagement/components/register/UserFormContainer";
import UserShowcase from "../features/userManagement/components/showcase/UserShowcase";
import UserShowcasePage from "../pages/UserShowcasePage";
import SecuritySetupPage from "../pages/SecuritySetupPage";
import PasswordFormContainer from "../features/securitySetup/components/passwordForm/PasswordFormContainer";
import SecurityAnswerContainer from "../features/securitySetup/components/securityAnswerForm/SecurityAnswerContainer";
import EmailFormContainer from "../features/securitySetup/components/ResetPassword/emailForm/EmailFormContainer";
import SecurityAnswerFormContainer from "../features/securitySetup/components/ResetPassword/securityAnswerForm/SecurityAnswerFormContainer";
import TourPackagePage from "../pages/TourPackagePage";
import TourPackageShowcase from "../features/tourPackage/components/showcase/TourPackageShowcase";
import TourPackageShowcaseContainer from "../features/tourPackage/components/showcase/TourPackageShowcaseContainer";
import TourPackageformContainer from "../features/tourPackage/register/TourPackageFormContainer";
import TourType from "../features/tourType/TourTypeShowcase";
import TourTypeContainer from "../features/tourType/TourTypeShowcaseContainer";
import CancellationPolicyShowcaseContainer from "../features/cancellationPolicy/showcase/CancellationPolicyShowcaseContainer";

export const AppRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "configuracion-de-seguridad",
      element: <SecuritySetupPage />,
      children: [
        {
          path: "actualizar-contraseña",
          element: <PasswordFormContainer />,
        },

        {
          path: "preguntas-de-seguridad",
          element: <SecurityAnswerContainer />,
        },
        {
          path: "restablecer-contraseña",
          element: <EmailFormContainer />,
        },
        {
          path: "respuesta-de-seguridad/:userId",
          element: <SecurityAnswerFormContainer />,
        },
        {
          path: "actualizar-contraseña/:userId",
          element: <PasswordFormContainer />,
        },
      ],
    },
    {
      path: "home",
      element: <MainLayout />,
      children: [
        {
          path: "",
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
                  element: <UserShowcase />,
                },
                {
                  path: "editar/:userId",
                  element: <RegisterContainer />,
                },
              ],
            },
          ],
        },
        {
          path: "paquetes-turisticos",
          element: <TourPackagePage />,
          children: [
            {
              path: "ver-todos",
              element: <TourPackageShowcaseContainer />,
            },
            {
              path: "nuevo",
              element: <TourPackageformContainer />,
            },
            {
              path: "tipo-de-tour",
              element: <TourTypeContainer />,
            },
            {
              path: "politicas",
              element: <CancellationPolicyShowcaseContainer />,
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
