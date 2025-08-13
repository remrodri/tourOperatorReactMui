import { useEffect, useState } from "react";
import { useTouristContext } from "../../../../tourist/context/TouristContext";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
import { useBookingContext } from "../../../context/BookingContext";
import { BookingType } from "../../../types/BookingType";
import BookingCard from "./BookingCard";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../../types/TouristType";
import MoreInfoDialogContainer2 from "../../moreInfoDialog/MoreInfoDialogContainer2";
import BookingFormContainer from "../../bookingForm/BookingFormContainer";
import PaymentFormContainer from "../../../../payment/components/paymentForm/PaymentFormContainer";

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
  const { bookings } = useBookingContext();

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  const [tpInfo, setTpInfo] = useState<TourPackageType | null>(null);
  const [mainTouristInfo, setMainTouristInfo] = useState<TouristType | null>(
    null
  );
  const [balance, setBalance] = useState(0);
  const [localBooking, setLocalBooking] = useState<BookingType | null>(null);

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
        <MoreInfoDialogContainer2
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
    </>
  );
};

export default BookingCardContainer;
