import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { UserProvider } from "../features/userManagement/context/UserContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { AppBarStyle } from "./mainLayout/style/MainStyles";

const TourPackagePage: React.FC = () => {
  const style: AppBarStyle = useOutletContext();
  return (
    <FadeContent
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box
        sx={{
          // height: "calc(100dvh - 5.4rem)",
          p: "10px",
          // display: "flex",
        }}
      >
        <Box
          sx={{
            // flexGrow: 1,
            background: style.background,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            backdropFilter: style.backdropFilter,
            border: style.border,
            // display: "flex",
          }}
        >
          <DateRangeProvider>
            <TouristProvider>
              <BookingProvider>
                <UserProvider>
                  <TouristDestinationProvider>
                      <TourTypeProvider>
                        <TourPackageProvider>
                          <Outlet />
                        </TourPackageProvider>
                      </TourTypeProvider>
                  </TouristDestinationProvider>
                </UserProvider>
              </BookingProvider>
            </TouristProvider>
          </DateRangeProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};
export default TourPackagePage;
