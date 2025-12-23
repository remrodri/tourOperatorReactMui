import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import UserManagementPage from "../pages/UserManagementPage";
import SecuritySetupPage from "../pages/SecuritySetupPage";
import PasswordFormContainer from "../features/securitySetup/components/passwordForm/PasswordFormContainer";
import SecurityAnswerContainer from "../features/securitySetup/components/securityAnswerForm/SecurityAnswerContainer";
import EmailFormContainer from "../features/securitySetup/components/ResetPassword/emailForm/EmailFormContainer";
import SecurityAnswerFormContainer from "../features/securitySetup/components/ResetPassword/securityAnswerForm/SecurityAnswerFormContainer";
import TourPackagePage from "../pages/TourPackagePage";
import TourPackageShowcaseContainer from "../features/tourPackage/components/showcase/TourPackageShowcaseContainer";
import TouristDestinationShowcaseContainer from "../features/touristDestination/components/showcase/TouristDestinationShowcaseContainer";
import UserShowcaseContainer from "../features/user/components/showcase/UserShowcaseContainer";
import BookingPage from "../pages/BookingPage";
import BookingShowcaseContainer from "../features/booking/components/showcase/BookingShowcaseContainer";
import ReportsPage from "../pages/ReportsPage";
import DashboardContainer from "../features/reports/dashboard/DashboardContainer";
import GuidePageContainer from "../pages/Guide/GuidePageContainer";
import GuideDrawerContainer from "../pages/Guide/GuideDrawerContainer";
import TouristListContainer from "../features/guide/components/touristList/TouristListContainer";
import TourPackageContainer from "../features/guide/components/tourPackage/TourPackageContainer";
import TouristDestinationContainer from "../features/guide/components/touristDestination/TouristDestinationContainer";
import ItineraryContainer from "../features/guide/components/itinerary/ItineraryContainer";
import GuidePerfilContainer from "../features/guide/components/perfil/GuidePerfilContainer";
import MainLayout from "../pages/mainLayout/MainLayout";
import GuideDateRangeSelectorContainer from "../features/guide/components/dateRangeSelector/GuideDateRangeSelectorContainer";
import TouristPage from "../pages/TouristPage";
import TouristShowcaseContainer from "../features/tourist/components/showcase/TouristShowcaseContainer";
import TouristDestinationPage from "../pages/TouristDestinationPage";
import TourTypePage from "../pages/TourTypePage";
import TourTypeShowcaseContainer from "../features/tourType/components/showcase/TourTypeShowcaseContainer";
import Page from "../pages/NotFoundPage";
import HomePageContainer from "../pages/home/HomePageContainer";

export const AppRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomePageContainer />,
    },
    {
      path: "/iniciar-sesion",
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
      // element: <MainLayoutSplashScreen />,
      element: <MainLayout />,

      children: [
        {
          path: "personal",
          element: <UserManagementPage />,
          children: [
            {
              path: "",
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
              path: "",
              element: <TourPackageShowcaseContainer />,
            },
          ],
        },
        {
          path: "destinos-turisticos",
          element: <TouristDestinationPage />,
          children: [
            {
              path: "",
              element: <TouristDestinationShowcaseContainer />,
            },
          ],
        },
        {
          path: "tipos-de-tour",
          element: <TourTypePage />,
          children: [
            {
              path: "",
              element: <TourTypeShowcaseContainer />,
            },
          ],
        },
        {
          path: "/reservas",
          element: <BookingPage />,
          children: [{ path: "", element: <BookingShowcaseContainer /> }],
        },
        {
          path: "reportes",
          element: <ReportsPage />,
          children: [{ path: "", element: <DashboardContainer /> }],
        },
        {
          path: "turistas",
          element: <TouristPage />,
          children: [
            {
              path: "",
              element: <TouristShowcaseContainer />,
            },
          ],
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
              path: "fechas-asignadas",
              element: <GuideDateRangeSelectorContainer />,
            },
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
    {
      path: "*",
      element: <Page />,
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
