import { Box } from "@mui/material";
import TouristDestination from "./TouristDestination";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import { useEffect, useState } from "react";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";

// const TouristDestinationContainer: React.FC = () => {
//   const { loading, touristDestination } = useGuideContext();
//   return (
//     <TouristDestination
//       loading={loading}
//       touristDestination={touristDestination}
//     />
//   );
// };
// export default TouristDestinationContainer;

const TouristDestinationContainer: React.FC = () => {
  const { getTouristDestinationInfoById, touristDestinations } =
    useTouristDestinationContext();
  const [touristDestinationInfo, setTouristDestinationInfo] =
    useState<TouristDestinationType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { getTourPackageInfoById } = useTourPackageContext();
  const [touristDestination, setTouristDestination] =
    useState<TouristDestinationType | null>(null);

  const getTouristDestination = () => {
    setLoading(true);
    const currentTourPackageId = localStorage.getItem("currentTourPackage");
    // console.log("currentTourPackageId::: ", currentTourPackageId);
    if (!currentTourPackageId) {
      return;
    }
    const tourPackage = getTourPackageInfoById(currentTourPackageId);
    // console.log("touristDestination::: ", tourPackage);
    if (tourPackage) {
      const touristDestination = getTouristDestinationInfoById(
        tourPackage.touristDestination
      );
      // console.log("touristDestination::: ", touristDestination);
      if (touristDestination) {
        setTouristDestination(touristDestination);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getTouristDestination();
  }, [touristDestinations]);

  return (
    <Box>
      <TouristDestination
        loading={loading}
        touristDestination={touristDestination}
      />
    </Box>
  );
};

export default TouristDestinationContainer;
