import { useEffect, useState } from "react";
import { useTouristContext } from "../../../../tourist/context/TouristContext";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
import { useBookingContext } from "../../../context/BookingContext";
import { BookingType } from "../../../types/BookingType";
import BookingCard from "./BookingCard";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../../types/TouristType";
import MoreInfoDialogContainer2 from "../../moreInfoDialog/MoreInfoDialogContainer";
import BookingFormContainer from "../../bookingForm/BookingFormContainer";
import PaymentFormContainer from "../../../../payment/components/paymentForm/PaymentFormContainer";
import MoreInfoDialogContainer from "../../moreInfoDialog/MoreInfoDialogContainer";
import ConfirmationModal from "./ConfirmationModal";
import { useCancellationConditionContext } from "../../../../cancellationPolicy/context/CancellationPolicyContext";
import { CancellationPolicy } from "../../../../cancellationPolicy/types/CancellationPolicy";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";

interface BookingCardContainerProps {
  booking: BookingType;
  index: number;
}

const BookingCardContainer: React.FC<BookingCardContainerProps> = ({
  booking,
  index,
}) => {
  const { getTourPackageInfoById } = useTourPackageContext();
  const { getTouristInfoById } = useTouristContext();
  const { bookings, cancelBooking } = useBookingContext();

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  const [tpInfo, setTpInfo] = useState<TourPackageType | null>(null);
  const [mainTouristInfo, setMainTouristInfo] = useState<TouristType | null>(
    null
  );
  const [balance, setBalance] = useState(0);
  const [localBooking, setLocalBooking] = useState<BookingType | null>(null);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const { getCancellationPolicyInfoById } = useCancellationConditionContext();

  const [loading, setLoading] = useState(false);
  const { showSnackbar } = useNewSnackbar();

  const handleClickConfirmation = () => {
    try {
    setLoading(true);
    // console.log("Cancelar booking con ID:", booking.id);
    console.log("booking::: ", booking);
    // const discount = booking.discount;
    const tourPackageInfo = getTourPackageInfoById(booking.tourPackageId);
    if (!tourPackageInfo) return;
    const cancellationPolicy: CancellationPolicy | null =
      getCancellationPolicyInfoById(tourPackageInfo?.cancellationPolicy);
    if (!cancellationPolicy) return;
    const refoundPercentage = cancellationPolicy.refoundPercentage;
    const totalPrice = booking.totalPrice;
    const totalPaid = booking.payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    const cancellationFee = totalPrice * (refoundPercentage * 0.01);
    console.log("cancellationFee::: ", cancellationFee);
    const refoundAmount = totalPaid - cancellationFee;
    if (refoundAmount < 0) {
      console.log("refoundAmount::: ", refoundAmount);
      cancelBooking(booking.id!, cancellationFee, 0, new Date());
    }else{
      cancelBooking(booking.id!, cancellationFee, refoundAmount, new Date());
    }
    showSnackbar("Reserva cancelada exitosamente", "success");
    setOpenConfirmation(false);
    // setLoading(false);
  } catch (error) {
    console.error("Error canceling booking", error);
    // setError("Failed to cancel booking");
    showSnackbar("Error al cancelar la reserva", "error");
  } finally {
    setLoading(false);
  }
};

  const handleClickClose = () => {
    setOpenConfirmation(false);
  };

  // Cargar datos de un booking dado
  const loadBookingData = (booking: BookingType) => {
    setLocalBooking(booking);
    setTpInfo(getTourPackageInfoById(booking.tourPackageId) ?? null);
    const mainTourist = booking.touristIds[0];
    setMainTouristInfo(getTouristInfoById(mainTourist) ?? null);
    calculateBalance(booking);
  };

  const calculateBalance = (booking: BookingType) => {
    const totalPaid = booking.payments.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    setBalance(booking.totalPrice - totalPaid);
  };

  // Escuchar cambios en bookings del contexto
  useEffect(() => {
    const updatedBooking = bookings.find((b) => b.id === booking.id);
    if (updatedBooking) {
      loadBookingData(updatedBooking);
    }
  }, [bookings]);

  const handleMenuOptions = (option: string) => {
    switch (option) {
      case "Ver detalles":
        setOpenMoreInfo(true);
        break;
      case "Editar":
        setOpenEditForm(true);
        break;
      case "Registrar pago":
        setOpenPaymentForm(true);
        break;
      case "Cancelar":
        setOpenConfirmation(true);
        break;
      default:
        console.warn("Opción inválida");
    }
  };

  return (
    <>
      {localBooking && (
        <BookingCard
          booking={localBooking}
          index={index}
          tpInfo={tpInfo}
          mainTouristInfo={mainTouristInfo}
          balance={balance}
          handleMenuOptions={handleMenuOptions}
        />
      )}
      {openMoreInfo && localBooking && (
        <MoreInfoDialogContainer
          open={openMoreInfo}
          handleClose={() => setOpenMoreInfo(false)}
          booking={localBooking}
          balance={balance}
        />
      )}
      {openEditForm && localBooking && (
        <BookingFormContainer
          open={openEditForm}
          handleClose={() => setOpenEditForm(false)}
          booking={localBooking}
        />
      )}
      {openPaymentForm && localBooking && (
        <PaymentFormContainer
          open={openPaymentForm}
          onClose={() => setOpenPaymentForm(false)}
          booking={localBooking}
          balance={balance}
        />
      )}
      {openConfirmation && (
        <ConfirmationModal
          open={openConfirmation}
          handleClick={handleClickClose}
          handleClickCancel={handleClickConfirmation}
        />
      )}
    </>
  );
};

export default BookingCardContainer;
