import { BookingProvider } from "../../features/booking/context/BookingContext";
import { GuideProvider2 } from "../../features/guide/context/GuideContext2";
import { TouristProvider } from "../../features/tourist/context/TouristContext";
import { TouristDestinationProvider } from "../../features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "../../features/tourPackage/context/TourPackageContext";
import { UserProvider } from "../../features/userManagement/context/UserContext";
import GuidePage from "./GuidePage";

const guideBackground = "/src/assets/images/guide.webp";

const GuidePageContainer = () => {
  return (
    <TourPackageProvider>
      <TouristDestinationProvider>
        <TouristProvider>
          <BookingProvider>
            <UserProvider>
              <GuideProvider2>
                <GuidePage backgroundImg={guideBackground} />
              </GuideProvider2>
            </UserProvider>
          </BookingProvider>
        </TouristProvider>
      </TouristDestinationProvider>
    </TourPackageProvider>
  );
};

export default GuidePageContainer;
