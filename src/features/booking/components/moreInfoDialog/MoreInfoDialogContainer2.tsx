import MoreInfoDialog2 from "./MoreInfoDialog2";
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

interface MoreInfoDialogContainer2Props {
  open: boolean;
  handleClose: () => void;
  booking: BookingType;
  balance: number;
}

const MoreInfoDialogContainer2: React.FC<MoreInfoDialogContainer2Props> = ({
  open,
  handleClose,
  booking,
  balance,
}) => {
  const { getDateRangeInfoById } = useDateRangeContext();
  const { getTourPackageInfoById } = useTourPackageContext();
  const { getCancellationPolicyInfoById, cancellationPolicy } =
    useCancellationConditionContext();
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

  const getSellerInfo = (id: string) => {
    const seller = getUserById(id);
    setSellerInfo(seller);
  };

  const getTourPackageInfo = (id: string) => {
    const tourPackage = getTourPackageInfoById(id);
    setTourPackageInfo(tourPackage);
  };

  const getCancellationPolicyInfo = (id: string) => {
    const cp = getCancellationPolicyInfoById(id);
    setCancellationPolicyInfo(cp);
  };

  const getTourType = (id: string) => {
    const tt = getTourTypeInfoById(id);
    setTourType(tt);
  };

  const getTouristDestination = (id: string) => {
    const td = getTouristDestinationInfoById(id);
    setTouristDestination(td);
  };

  const getPayments = (payments: PaymentType[]) => {
    setPayments(payments);
  };

  const getTourists = (tourists: string[]) => {
    const touristsInfo = getTouristInfoByIds(tourists);
    setTourists(touristsInfo);
  };

  const getDateRange = (id: string) => {
    const dateRange = getDateRangeInfoById(id);
    setDateRange(dateRange);
  };

  const getGuides = () => {
    const guides = dateRange?.guides
      ?.map((guideId) => getUserById(guideId))
      .filter((guide): guide is User => guide !== null);
    setGuides(guides ?? []);
  };

  useEffect(() => {
    getTourPackageInfo(booking.tourPackageId ?? "");
    getTourists(booking.touristIds ?? []);
    getDateRange(booking.dateRangeId ?? "");
    getGuides();
    getSellerInfo(booking.sellerId ?? "");
    getCancellationPolicyInfo(tourPackageInfo?.cancellationPolicy ?? "");
    getTourType(tourPackageInfo?.tourType ?? "");
    getTouristDestination(tourPackageInfo?.touristDestination ?? "");
    getPayments(booking.payments ?? []);
  }, [booking, tourPackageInfo]);

  return (
    <MoreInfoDialog2
      open={open}
      handleClose={handleClose}
      booking={booking}
      dateRangeInfo={getDateRangeInfoById(booking.dateRangeId)}
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

export default MoreInfoDialogContainer2;
