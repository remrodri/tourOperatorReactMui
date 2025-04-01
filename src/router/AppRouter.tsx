import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../pages/mainLayout/MainLayout";
import UserManagementPage from "../pages/UserManagementPage";
import HomePage from "../pages/HomePage";
import RegisterContainer from "../features/userManagement/components/register/UserFormContainer";
import SecuritySetupPage from "../pages/SecuritySetupPage";
import PasswordFormContainer from "../features/securitySetup/components/passwordForm/PasswordFormContainer";
import SecurityAnswerContainer from "../features/securitySetup/components/securityAnswerForm/SecurityAnswerContainer";
import EmailFormContainer from "../features/securitySetup/components/ResetPassword/emailForm/EmailFormContainer";
import SecurityAnswerFormContainer from "../features/securitySetup/components/ResetPassword/securityAnswerForm/SecurityAnswerFormContainer";
import TourPackagePage from "../pages/TourPackagePage";
import TourPackageShowcaseContainer from "../features/tourPackage/showcase/TourPackageShowcaseContainer";
import TourTypeContainer from "../features/tourType/TourTypeShowcaseContainer";
import CancellationPolicyShowcaseContainer from "../features/cancellationPolicy/showcase/CancellationPolicyShowcaseContainer";
import TouristDestinationShowcaseContainer from "../features/touristDestination/showcase/TouristDestinationShowcaseContainer";
import UserShowcaseContainer from "../features/userManagement/components/showcase/UserShowcaseContainer";

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
            // {
            //   path: "nuevo",
            //   element: <RegisterContainer />,
            // },
            {
              path: "usuarios",
              element: <UserShowcaseContainer />,
              children: [
                // {
                //   path: "",
                //   element: <UserShowcase />,
                // },
                // {
                //   path: "editar/:userId",
                //   element: <RegisterContainer />,
                // },
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
            // {
            //   path: "nuevo",
            //   element: <TourPackageformContainer />,
            // },
            {
              path: "tipo-de-tour",
              element: <TourTypeContainer />,
            },
            {
              path: "politicas",
              element: <CancellationPolicyShowcaseContainer />,
            },
            {
              path: "destinos",
              element: <TouristDestinationShowcaseContainer />,
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
