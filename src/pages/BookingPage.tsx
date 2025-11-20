import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
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

const BookingPage = () => {
  return (
    <FadeContent
      // blur={true}
      duration={200}
      easing="ease-out"
      initialOpacity={0.6}
      className="w-full"
    >
      <Box
        sx={{
          display: "flex",
          // flexGrow: 1,
          height: "100%",
          // width: "calc(100vw - 83px)",
          p: "10px",
          // background: "rgba(86, 101, 115, 0.4)",
          // flexGrow: 1,
          // flexWrap: "wrap",
          // height: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            background: "rgba(86, 101, 115, 0.4)",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(86, 101, 115, 0.5)",
            height: "100%",
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
