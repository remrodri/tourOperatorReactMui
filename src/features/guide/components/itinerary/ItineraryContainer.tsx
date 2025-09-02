// import Itinerary from "./Itinerary";
// import { useGuideContext2 } from "../../context/GuideContext2";

import { Box } from "@mui/material";
import Itinerary from "./Itinerary";
import { useGuideContext2 } from "../../context/GuideContext2";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useEffect, useState } from "react";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";

// const ItineraryContainer: React.FC = () => {
//   const { loading, tourPackage } = useGuideContext2();
//   // console.log('tourPackage::: ', tourPackage);
//   return <Itinerary loading={loading} tourPackage={tourPackage||null} />;
// };
// export default ItineraryContainer;

const ItineraryContainer: React.FC = () => {
  // console.log('currentTourPackageId::: ', currentTourPackageId);
  const { getTourPackageInfoById } = useTourPackageContext();
  const [tourPackage, setTourPackage] = useState<TourPackageType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  useEffect(() => { 
    setLoading(true);
    const currentTourPackageId = localStorage.getItem("currentTourPackage");
    console.log('currentTourPackageId::: ', currentTourPackageId);
    if (currentTourPackageId) {
      const tourPackage = getTourPackageInfoById(currentTourPackageId);
      console.log('tourPackage::: ', tourPackage);
      setTourPackage(tourPackage);
      setLoading(false);
    }
  }, [getTourPackageInfoById])

  return (
    <Box>
      <Itinerary tourPackage={tourPackage||null} loading={loading}/>
    </Box>
  );
};

export default ItineraryContainer;
