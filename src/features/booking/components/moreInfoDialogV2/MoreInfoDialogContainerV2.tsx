
import { useEffect, useState } from "react";
import MoreInfoDialog from "./MoreInfoDialogV2";
import { BookingType } from "../../types/BookingType";
import { useDateRangeContext } from "../../../dateRange/context/DateRangeContext";
import { useTourPackageContext } from "../../../tourPackage/context/TourPackageContext";
import { useTourTypeContext } from "../../../tourType/context/TourTypeContext";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { usePaymentContext } from "../../../payment/context/PaymentContext";
import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useUserContext } from "../../../user/context/UserContext";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { TourType } from "../../../user/types/TourType";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import { PaymentType } from "../../types/PaymentType";
import { TouristType } from "../../types/TouristType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { User } from "../../../user/types/User";

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
  const { getDateRangeInfoById } = useDateRangeContext();
  const { getTourPackageInfoById } = useTourPackageContext();
  const { getTourTypeInfoById } = useTourTypeContext();
  const { getTouristDestinationInfoById } = useTouristDestinationContext();
  const { getTouristInfoByIds } = useTouristContext();
  const { getUserById } = useUserContext();

  const [tourPackageInfo, setTourPackageInfo] = useState<TourPackageType | null>(null);
  const [tourType, setTourType] = useState<TourType | null>(null);
  const [touristDestination, setTouristDestination] = useState<TouristDestinationType | null>(null);
  const [payments, setPayments] = useState<PaymentType[]>([]);
  const [tourists, setTourists] = useState<TouristType[]>([]);
  const [dateRange, setDateRange] = useState<DateRangeType | null>(null);
  const [guides, setGuides] = useState<User[]>([]);
  const [sellerInfo, setSellerInfo] = useState<User | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Cargar datos principales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!booking) return;

        // Tour Package
        if (booking.tourPackageId) {
          const tp = await getTourPackageInfoById(booking.tourPackageId);
          setTourPackageInfo(tp);
        }

        // Tourists
        if (booking.touristIds?.length) {
          const ts = await getTouristInfoByIds(booking.touristIds);
          setTourists(ts);
        }

        // Date Range + Guides
        if (booking.dateRangeId) {
          const dr = await getDateRangeInfoById(booking.dateRangeId);
          setDateRange(dr);
          if (dr?.guides) {
            const gds = dr.guides
              .map((guideId) => getUserById(guideId))
              .filter((g): g is User => g !== null);
            setGuides(gds);
          }
        }

        // Seller
        if (booking.sellerId) {
          const seller = await getUserById(booking.sellerId);
          setSellerInfo(seller);
        }

        // Payments
        if (booking.payments?.length) {
          setPayments(booking.payments);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar la información.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [booking]);

  // ✅ Cargar datos dependientes de tourPackageInfo
  useEffect(() => {
    const loadExtraData = async () => {
      if (!tourPackageInfo) return;

      try {
        if (tourPackageInfo.tourType) {
          const tt = await getTourTypeInfoById(tourPackageInfo.tourType);
          setTourType(tt);
        }

        if (tourPackageInfo.touristDestination) {
          const td = await getTouristDestinationInfoById(tourPackageInfo.touristDestination);
          setTouristDestination(td);
        }
      } catch (err) {
        console.error(err);
        setError("Error al cargar datos adicionales.");
      }
    };

    loadExtraData();
  }, [tourPackageInfo]);

  if (loading) return <div>Cargando información...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MoreInfoDialog
      open={open}
      handleClose={handleClose}
      booking={booking}
      dateRangeInfo={dateRange}
      tourPackageInfo={tourPackageInfo}
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