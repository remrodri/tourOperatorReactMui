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
import { usePaymentContext } from "../../payment/context/PaymentContext";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { useDateRangeContext } from "../../dateRange/context/DateRangeContext";
import { useUserContext } from "../../userManagement/context/UserContext";

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
  const { getDateRangeById } = useDateRangeContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const { getTourTypeInfoById } = useTourTypeContext();
  const { getCancellationPolicyInfoById } = useCancellationConditionContext();
  const { getPaymentInfoByIds } = usePaymentContext();
  const { getTouristInfoByIds } = useTouristContext();
  const { getUsersById } = useUserContext();
  const [cancellationPolicy, setCancellationPolicy] =
    useState<CancellationPolicy | null>(null);
  const [tourType, setTourType] = useState<TourType | null>(null);
  const [touristDestination, setTouristDestination] =
    useState<TouristDestinationType | null>(null);
  const [payments, setPayments] = useState<PaymentInfoType[]>([]);
  const [tourists, setTourists] = useState<TouristType[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeType | null>(null);
  const [guides, setGuides] = useState<User[]>([]);

  const getGuides = () => {
    const dateRange = getDateRangeById(booking.dateRangeId)
    const guides = getUsersById(dateRange?.guides||[]);
    setGuides(guides);
  };

  const getDateRange = (id: string) => {
    const dateRange = getDateRangeById(id);
    setDateRange(dateRange);
  };

  const getTourists = (mainTouristId: string, additionalTourists: string[]) => {
    const touristIds = [
      ...(booking.additionalTouristIds || []),
      booking.mainTouristId,
    ].filter((id): id is string => id !== undefined);

    if (!touristIds) {
      setTourists([]);
    }
    const touristInfos = getTouristInfoByIds(touristIds || []);
    setTourists(touristInfos);
  };

  const getPayments = (ids: string[]) => {
    const payments = getPaymentInfoByIds(ids);
    setPayments(payments);
  };

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
    getPayments(booking.paymentIds || []);
    getTourists(
      booking.mainTouristId || "",
      booking.additionalTouristIds || []
    );
    getDateRange(booking.dateRangeId || "");
    getGuides();
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
      // paymentsInfo={paymentsInfo}
      dateRangeInfo={dateRangeInfo}
      tourPackageInfo={tourPackageInfo}
      balance={balance}
      cancellationPolicy={cancellationPolicy}
      tourType={tourType}
      touristDestination={touristDestination}
      payments={payments}
      tourists={tourists}
      dateRange={dateRange}
      guides={guides}
    />
  );
};
export default MoreInfoDialogContainer;
