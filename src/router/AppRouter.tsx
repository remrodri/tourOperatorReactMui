import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserManagementPage from "../pages/UserManagementPage";
import SecuritySetupPage from "../pages/SecuritySetupPage";
import PasswordFormContainer from "../features/securitySetup/components/passwordForm/PasswordFormContainer";
import SecurityAnswerContainer from "../features/securitySetup/components/securityAnswerForm/SecurityAnswerContainer";
import EmailFormContainer from "../features/securitySetup/components/ResetPassword/emailForm/EmailFormContainer";
import SecurityAnswerFormContainer from "../features/securitySetup/components/ResetPassword/securityAnswerForm/SecurityAnswerFormContainer";
import TourPackagePage from "../pages/TourPackagePage";
import TourPackageShowcaseContainer from "../features/tourPackage/showcase/TourPackageShowcaseContainer";
import TourTypeContainer from "../features/tourType/showcase/TourTypeShowcaseContainer";
import CancellationPolicyShowcaseContainer from "../features/cancellationPolicy/showcase/CancellationPolicyShowcaseContainer";
import TouristDestinationShowcaseContainer from "../features/touristDestination/showcase/TouristDestinationShowcaseContainer";
import UserShowcaseContainer from "../features/userManagement/components/showcase/UserShowcaseContainer";
import BookingPage from "../pages/BookingPage";
import BookingShowcaseContainer from "../features/booking/showcase/BookingShowcaseContainer";
import ReportsPage from "../pages/ReportsPage";
import DashboardContainer from "../features/reports/dashboard/DashboardContainer";
import GuidePageContainer from "../pages/Guide/GuidePageContainer";
import GuideDrawerContainer from "../pages/Guide/GuideDrawerContainer";
import TouristListContainer from "../features/guide/touristList/TouristListContainer";
import TourPackageContainer from "../features/guide/tourPackage/TourPackageContainer";
import TouristDestinationContainer from "../features/guide/touristDestination/TouristDestinationContainer";
import ItineraryContainer from "../features/guide/itinerary/ItineraryContainer";
import GuidePerfilContainer from "../features/guide/perfil/GuidePerfilContainer";
import MainLayoutSplashScreen from "../pages/mainLayout/MainLayoutSplashScreen";

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
      path: "/",
      element: <MainLayoutSplashScreen />,

      children: [
        {
          path: "gestion-de-usuarios",
          element: <UserManagementPage />,
          children: [
            {
              path: "usuarios",
              element: <UserShowcaseContainer />,
              children: [],
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
        {
          path: "reservas",
          element: <BookingPage />,
          children: [{ path: "todos", element: <BookingShowcaseContainer /> }],
        },
        {
          path: "reportes",
          element: <ReportsPage />,
          children: [{ path: "dashboard", element: <DashboardContainer /> }],
        },
      ],
    },
    {
      path: "guia-de-turismo",
      element: <GuidePageContainer />,
      children: [
        {
          path: "",
          element: <GuideDrawerContainer />,
          children: [
            {
              path: "turistas",
              element: <TouristListContainer />,
            },
            {
              path: "paquete-turistico",
              element: <TourPackageContainer />,
            },
            {
              path: "destino-turistico",
              element: <TouristDestinationContainer />,
            },
            {
              path: "itinerario",
              element: <ItineraryContainer />,
            },
            {
              path: "perfil",
              element: <GuidePerfilContainer />,
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
