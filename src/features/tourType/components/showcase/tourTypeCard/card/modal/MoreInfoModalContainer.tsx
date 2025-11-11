import { useEffect, useState } from "react";
import { useCancellationConditionContext } from "../../../../../../cancellationPolicy/context/CancellationPolicyContext";
// import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { useTouristDestinationContext } from "../../../../../../touristDestination/context/TouristDestinationContext";
import { useTourTypeContext } from "../../../../../context/TourTypeContext";

import TourPackageModal from "./MoreInfoModal";

interface MoreInfoModalContainerProps {
  handleClick: () => void;
  open: boolean;
  tourType: {
    name: string;
    description: string;
  };
}

const MoreInfoModalContainer: React.FC<MoreInfoModalContainerProps> = ({
  handleClick,
  open,
  tourType,
}) => {
  // console.log("tourType::: ", tourType);
  // const { getDateRangeById, fillDateRangesByIds } = useDateRangeContext();
  const { getCancellationPolicyById } = useCancellationConditionContext();
  const { getTouristDestinationById } = useTouristDestinationContext();
  const { getTourTypeNameById } = useTourTypeContext();
  // const cancellationPolicyName = getCancellationPolicyById(
  //   tourPackage.cancellationPolicy
  // );
  // const touristDetinationName = getTouristDestinationById(
  //   tourPackage.touristDestination
  // );
  // const [DateRangesFound, setDateRangesFound] = useState<DateRangeType[]>([]);

  // const getDateRanges = () => {
  //   const dateRangesFound = tourPackage.dateRanges.map((dr) =>
  //     getDateRangeById(dr)
  //   );
  //   return dateRangesFound;
  // };
  // useEffect(() => {
  //   getDateRanges();
  // }, []);
  // const tourTypeName = getTourTypeNameById(tourPackage.tourType);
  // const dateRangesFilled = fillDateRangesByIds(tourPackage.dateRanges);
  // const tp = {
  //   ...tourPackage,
  //   cancellationPolicy: cancellationPolicyName,
  //   touristDestination: touristDetinationName,
  //   tourType: tourTypeName,
  //   // dateRanges:dateRangesFilled
  // };

  // console.log("tp::: ", tp);
  return (
    <TourPackageModal
      handleClick={handleClick}
      open={open}
      tourType={tourType}
      // dateRangesFilled={dateRangesFilled}
    />
  );
};
export default MoreInfoModalContainer;
