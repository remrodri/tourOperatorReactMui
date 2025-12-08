import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import { UserProvider } from "../features/user/context/UserContext";
import { BookingProvider } from "../features/booking/context/BookingContext";
import { TouristProvider } from "../features/tourist/context/TouristContext";
import { TourPackageProvider } from "../features/tourPackage/context/TourPackageContext";
import { DateRangeProvider } from "../features/dateRange/context/DateRangeContext";
import { TouristDestinationProvider } from "../features/touristDestination/context/TouristDestinationContext";
import { CancellationPolicyProvider } from "../features/cancellationPolicy/context/CancellationPolicyContext";
import { TourTypeProvider } from "../features/tourType/context/TourTypeContext";
import FadeContent from "../Animations/FadeContent/FadeContent";
import { PaymentProvider } from "../features/payment/context/PaymentContext";
import { AppBarStyle } from "./mainLayout/style/MainStyles";

const BookingPage = () => {
  const style: AppBarStyle = useOutletContext<AppBarStyle>();
  return (
    <FadeContent
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box
        sx={{
          display: "flex",
          p: "10px",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            background: style.background,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            backdropFilter: style.backdropFilter,
            border: style.border,
            display: "flex",
          }}
        >
          <TourTypeProvider>
            <CancellationPolicyProvider>
              <TouristDestinationProvider>
                <DateRangeProvider>
                  <TourPackageProvider>
                    <TouristProvider>
                      <BookingProvider>
                        <PaymentProvider>
                          <UserProvider>
                            <Outlet />
                          </UserProvider>
                        </PaymentProvider>
                      </BookingProvider>
                    </TouristProvider>
                  </TourPackageProvider>
                </DateRangeProvider>
              </TouristDestinationProvider>
            </CancellationPolicyProvider>
          </TourTypeProvider>
        </Box>
      </Box>
    </FadeContent>
  );
};
export default BookingPage;
