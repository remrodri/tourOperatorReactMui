import { SnackbarProvider } from "../../context/SnackbarContext";
import { BookingProvider } from "../../features/booking/context/BookingContext";
import { GuideProvider } from "../../features/guide/context/GuideContext";
import { TouristProvider } from "../../features/tourist/context/TouristContext";
import { TouristDestinationProvider } from "../../features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "../../features/tourPackage/context/TourPackageContext";
import { UserProvider } from "../../features/userManagement/context/UserContext";
import GuidePage from "./GuidePage";
import { DateRangeProvider } from "../../features/dateRange/context/DateRangeContext";

const guideBackground = "/src/assets/images/guide.webp";

const GuidePageContainer = () => {
  return (
    // <SnackbarProvider>
    <DateRangeProvider>
      <TourPackageProvider>
        <TouristDestinationProvider>
          <TouristProvider>
            <BookingProvider>
              <UserProvider>
                <GuideProvider>
                  <GuidePage backgroundImg={guideBackground} />
                </GuideProvider>
              </UserProvider>
            </BookingProvider>
          </TouristProvider>
        </TouristDestinationProvider>
      </TourPackageProvider>
    </DateRangeProvider>
    //  </SnackbarProvider>
  );
};

export default GuidePageContainer;
