import { useEffect, useState } from "react";
import { useCancellationConditionContext } from "../../cancellationPolicy/context/CancellationPolicyContext";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { User } from "../../userManagement/types/User";
import { BookingType } from "../types/BookingType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { TouristType } from "../types/TouristType";
import MoreInfoDialog from "./MoreInfoDialog";
import { CancellationPolicy } from "../../cancellationPolicy/types/CancellationPolicy";
import { TourType } from "../../userManagement/types/TourType";
import { useTourTypeContext } from "../../tourType/context/TourTypeContext";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";

interface MoreIndfoDialogContainerProps {
  open: boolean;
  // handleOpenMoreInfoClick: () => void;
  // handleOpen: () => void;
  handleClose: () => void;
  booking: BookingType;
  sellerInfo: User | null;
  touristInfo: TouristType | null;
  paymentsInfo: PaymentInfoType[];
  dateRangeInfo: DateRangeType | null;
  tourPackageInfo: TourPackageType | null;
  balance: number;
}

const MoreInfoDialogContainer: React.FC<MoreIndfoDialogContainerProps> = ({
  open,
  // handleOpenMoreInfoClick,
  // handleOpen,
  handleClose,
  booking,
  sellerInfo,
  touristInfo,
  paymentsInfo,
  dateRangeInfo,
  tourPackageInfo,
  balance,
}) => {
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const { getTourTypeInfoById } = useTourTypeContext();
  const { getCancellationPolicyInfoById } = useCancellationConditionContext();
  const [cancellationPolicy, setCancellationPolicy] =
    useState<CancellationPolicy | null>(null);
  const [tourType, setTourType] = useState<TourType | null>(null);
  const [touristDestination, setTouristDestination] =
    useState<TouristDestinationType | null>(null);

  const getTouristDestination = (id: string) => {
    const touristDestination = getTouristDestinationInfoById(id);
    setTouristDestination(touristDestination);
  };

  const getTourType = (id: string) => {
    const tourType = getTourTypeInfoById(id);
    setTourType(tourType);
  };

  const getCancellationPolicy = (id: string) => {
    const cp = getCancellationPolicyInfoById(id);
    setCancellationPolicy(cp);
  };
  useEffect(() => {
    getTouristDestination(tourPackageInfo?.touristDestination || "");
    getCancellationPolicy(tourPackageInfo?.cancellationPolicy || "");
    getTourType(tourPackageInfo?.tourType || "");
  }, []);
  return (
    <MoreInfoDialog
      open={open}
      // handleOpenMoreInfoClick={handleOpenMoreInfoClick}
      // handleOpen={handleOpen}
      handleClose={handleClose}
      booking={booking}
      sellerInfo={sellerInfo}
      touristInfo={touristInfo}
      paymentsInfo={paymentsInfo}
      dateRangeInfo={dateRangeInfo}
      tourPackageInfo={tourPackageInfo}
      balance={balance}
      cancellationPolicy={cancellationPolicy}
      tourType={tourType}
      touristDestination={touristDestination}
    />
  );
};
export default MoreInfoDialogContainer;
