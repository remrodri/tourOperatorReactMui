import { Box } from "@mui/material";
import TouristDestination from "./TouristDestination";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import { useEffect, useState } from "react";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useGuideContext2 } from "../../context/GuideContext2";

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
  const { currentTourPackage } = useGuideContext2();

  const getTouristDestination = () => {
    console.log('currentTourPackage::: ', currentTourPackage);
    setLoading(true);
    // const currentTourPackageId = localStorage.getItem("currentTourPackage");
    // console.log("currentTourPackageId::: ", currentTourPackageId);
    if (!currentTourPackage) {
      return;
    }
    const tourPackage = getTourPackageInfoById(currentTourPackage);
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
