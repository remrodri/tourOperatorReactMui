import MoreInfoDialog from "./MoreInfoDialogV2";
import { BookingType } from "../../types/BookingType";
import { useEffect, useState } from "react";
import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useCancellationConditionContext } from "../../../cancellationPolicy/context/CancellationPolicyContext";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { CancellationPolicy } from "../../../cancellationPolicy/types/CancellationPolicy";
import { TourType } from "../../../userManagement/types/TourType";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import { PaymentType } from "../../types/PaymentType";
import { TouristType } from "../../types/TouristType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { User } from "../../../userManagement/types/User";
import { useTourTypeContext } from "../../../tourType/context/TourTypeContext";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { usePaymentContext } from "../../../payment/context/PaymentContext";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useUserContext } from "../../../userManagement/context/UserContext";

interface MoreInfoDialogContainerProps {
  open: boolean;
  handleClose: () => void;
  booking: BookingType;
  balance: number;
}

const MoreInfoDialogContainer: React.FC<MoreInfoDialogContainerProps> = ({
  open,
  handleClose,
  booking,
  balance,
}) => {
  console.log('booking::: ', booking);
  const { getDateRangeInfoById } = useDateRangeContext();
  const { getTourPackageInfoById } = useTourPackageContext();
  const { getCancellationPolicyInfoById } = useCancellationConditionContext();
  const { getTourTypeInfoById } = useTourTypeContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const { getTouristInfoByIds } = useTouristContext();
  const { getUserById } = useUserContext();

  const [tourPackageInfo, setTourPackageInfo] =
    useState<TourPackageType | null>(null);
  const [cancellationPolicyInfo, setCancellationPolicyInfo] =
    useState<CancellationPolicy | null>(null);
  const [tourType, setTourType] = useState<TourType | null>(null);
  const [touristDestination, setTouristDestination] =
    useState<TouristDestinationType | null>(null);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [tourists, setTourists] = useState<TouristType[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeType | null>(null);
  const [guides, setGuides] = useState<User[]>([]);
  const [sellerInfo, setSellerInfo] = useState<User | null>(null);

  // --- carga inicial en base al booking ---
  useEffect(() => {
    if (booking.tourPackageId) {
      const tp = getTourPackageInfoById(booking.tourPackageId);
      setTourPackageInfo(tp);
    }
    if (booking.touristIds?.length) {
      const ts = getTouristInfoByIds(booking.touristIds);
      setTourists(ts);
    }
    if (booking.dateRangeId) {
      const dr = getDateRangeInfoById(booking.dateRangeId);
      setDateRange(dr);
      if (dr?.guides) {
        const gds = dr.guides
          .map((guideId) => getUserById(guideId))
          .filter((g): g is User => g !== null);
        setGuides(gds);
      }
    }
    if (booking.sellerId) {
      const seller = getUserById(booking.sellerId);
      setSellerInfo(seller);
    }
    if (booking.payments?.length) {
      setPayments(booking.payments);
    }
  }, [booking]);

  // --- carga dependiente de tourPackageInfo ---
  useEffect(() => {
    if (!tourPackageInfo) return;

    if (tourPackageInfo.cancellationPolicy) {
      const cp = getCancellationPolicyInfoById(
        tourPackageInfo.cancellationPolicy
      );
      setCancellationPolicyInfo(cp);
    }
    if (tourPackageInfo.tourType) {
      const tt = getTourTypeInfoById(tourPackageInfo.tourType);
      setTourType(tt);
    }
    if (tourPackageInfo.touristDestination) {
      const td = getTouristDestinationInfoById(
        tourPackageInfo.touristDestination
      );
      setTouristDestination(td);
    }
  }, [tourPackageInfo]);

  return (
    <MoreInfoDialog
      open={open}
      handleClose={handleClose}
      booking={booking}
      dateRangeInfo={dateRange}
      tourPackageInfo={tourPackageInfo}
      cancellationPolicy={cancellationPolicyInfo}
      tourType={tourType}
      touristDestination={touristDestination}
      payments={payments}
      tourists={tourists}
      dateRange={dateRange}
      guides={guides}
      sellerInfo={sellerInfo}
    />
  );
};

export default MoreInfoDialogContainer;
