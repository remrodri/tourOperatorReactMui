import { useEffect, useState } from "react";
import { useTouristContext } from "../../../context/TouristContext";
import { useTourPackageContext } from "../../../../tourPackage/context/TourPackageContext";
// import { useBookingContext } from "../../../context/BookingContext";
// import { BookingType } from "../../../types/BookingType";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
// import { TouristType } from "../../../types/TouristType";
// import BookingFormContainer from "../../bookingForm/BookingFormContainer";
import PaymentFormContainer from "../../../../payment/components/paymentForm/PaymentFormContainer";
// import MoreInfoDialogContainer from "../../moreInfoDialogV2/MoreInfoDialogContainerV2";
import ConfirmationModal from "./ConfirmationModal";
import { useCancellationConditionContext } from "../../../../cancellationPolicy/context/CancellationPolicyContext";
import { useNewSnackbar } from "../../../../../context/SnackbarContext";
import BookingCardV2 from "./TouristCard";
// import { CancellationPolicy } from "../../../../cancellationPolicy/types/CancellationPolicy";
import PaymentProofDialogContainer from "../../../../payment/components/paymentProofDialog/PaymentProofDialogContainer";
import TouristCard from "./TouristCard";
import { TouristType } from "../../../../booking/types/TouristType";
import MoreInfoDialogContainer from "../../../moreInfoDialog/MoreInfoDialogContainer";
import EditFormContainer from "../../editForm/EditTouristFormContainer";
// import { PaymentType } from "../../../types/PaymentType";

interface TouristCardContainerProps {
  tourist: TouristType;
  index: number;
  // booking: BookingType;
  // index: number;
  role: string;
  // setBookingProof: (booking: BookingType | null) => void;
}

const TouristCardContainer: React.FC<TouristCardContainerProps> = ({
  tourist,
  index,
  // booking,
  // index,
  role,
  // setBookingProof,
}) => {
  // const { getTourPackageInfoById } = useTourPackageContext();
  // const { getTouristInfoById } = useTouristContext();
  // const { bookings, cancelBooking } = useBookingContext();

  const [openMoreInfo, setOpenMoreInfo] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };
  // const [openPaymentForm, setOpenPaymentForm] = useState(false);

  // const [currentBooking, setCurrentBooking] = useState<BookingType | null>(
  //   null
  // );

  // const [tpInfo, setTpInfo] = useState<TourPackageType | null>(null);
  // const [mainTouristInfo, setMainTouristInfo] = useState<TouristType | null>(
  //   null
  // );
  // const [balance, setBalance] = useState(0);
  // const [localBooking, setLocalBooking] = useState<BookingType | null>(null);

  // const [openConfirmation, setOpenConfirmation] = useState(false);
  // const { getCancellationPolicyInfoById } = useCancellationConditionContext();

  // const [loading, setLoading] = useState(false);
  // const { showSnackbar } = useNewSnackbar();

  // const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  // const openMenu = Boolean(anchor);

  // const [openPaymentProof, setOpenPaymentProof] = useState(false);
  // const [createdPayment, setCreatedPayment] = useState<PaymentType | null>(
  //   null
  // );

  // const handleOpenPaymentProof = () => {
  //   setOpenPaymentProof(true);
  // };

  // const handleClosePaymentProof = () => {
  //   setOpenPaymentProof(false);
  // };

  // const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchor(event.currentTarget);
  // };

  // const handleCloseMenu = () => {
  //   setAnchor(null);
  // };

  // const handleClickConfirmation = () => {
  //   // console.log("booking::: ", booking);
  //   cancelBooking(
  //     currentBooking?.id!,
  //     currentBooking?.cancellationFee!,
  //     currentBooking?.refundAmount!,
  //     new Date()
  //   );
  //   setOpenConfirmation(false);
  //   try {
  //     setLoading(true);
  //     // console.log("Cancelar booking con ID:", booking.id);
  //     // console.log("booking::: ", booking);
  //     // const discount = booking.discount;
  //     const tourPackageInfo = getTourPackageInfoById(booking.tourPackageId);
  //     // if (!tourPackageInfo) return;
  //     // const cancellationPolicy = getCancellationPolicyInfoById(
  //     //   tourPackageInfo?.cancellationPolicy!
  //     // );
  //     // if (!cancellationPolicy) return;
  //     // const refoundPercentage = cancellationPolicy?.refoundPercentage;
  //     const totalPrice = booking.totalPrice;
  //     const totalPaid = booking.payments.reduce(
  //       (acc, payment) => acc + payment.amount,
  //       0
  //     );
  //     // const cancellationFee = totalPrice * (refoundPercentage! * 0.01);
  //     // console.log("cancellationFee::: ", cancellationFee);
  //     // const refoundAmount = totalPaid - cancellationFee;
  //     // if (refoundAmount < 0) {
  //     // console.log("refoundAmount::: ", refoundAmount);
  //     // cancelBooking(booking.id!, cancellationFee, 0, new Date());
  //     // } else {
  //     // cancelBooking(booking.id!, cancellationFee, refoundAmount, new Date());
  //     // }
  //     showSnackbar("Reserva cancelada exitosamente", "success");
  //     setOpenConfirmation(false);
  //     // setLoading(false);
  //   } catch (error) {
  //     console.error("Error canceling booking", error);
  //     // setError("Failed to cancel booking");
  //     showSnackbar("Error al cancelar la reserva", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleClickClose = () => {
  //   setOpenConfirmation(false);
  // };

  // // Cargar datos de un booking dado
  // const loadBookingData = (booking: BookingType) => {
  //   setLocalBooking(booking);
  //   setTpInfo(getTourPackageInfoById(booking.tourPackageId) ?? null);
  //   const mainTourist = booking.touristIds[0];
  //   setMainTouristInfo(getTouristInfoById(mainTourist) ?? null);
  //   calculateBalance(booking);
  // };

  // const calculateBalance = (booking: BookingType) => {
  //   const totalPaid = booking.payments.reduce(
  //     (acc, payment) => acc + payment.amount,
  //     0
  //   );
  //   setBalance(booking.totalPrice - totalPaid);
  // };

  // // Escuchar cambios en bookings del contexto
  // useEffect(() => {
  //   setCurrentBooking(booking);
  //   const updatedBooking = bookings.find((b) => b.id === booking.id);
  //   if (updatedBooking) {
  //     loadBookingData(updatedBooking);
  //   }
  // }, [bookings]);

  const handleMenuOptions = (option: string) => {
    switch (option) {
      case "Ver detalles":
        // setOpenMoreInfo(true);
        console.log("Ver detalles::: ", option);
        setOpenMoreInfo(true);
        break;
      case "Editar":
        setOpenEditForm(true);
        console.log("Editar::: ", option);
        break;

      default:
        console.log("Opción inválida");
    }
  };

  return (
    <>
      {/* {localBooking && ( */}
      <TouristCard
        tourist={tourist}
        index={index}
        handleMenuOptions={handleMenuOptions}
        // booking={localBooking}
        // index={index}
        // tpInfo={tpInfo}
        // mainTouristInfo={mainTouristInfo}
        // balance={balance}
        // handleMenuOptions={handleMenuOptions}
        role={role}
      />
      {/* )} */}
      {openMoreInfo && (
        <MoreInfoDialogContainer
          open={openMoreInfo}
          handleClose={() => setOpenMoreInfo(false)}
          tourist={tourist}
          // booking={localBooking}
          // balance={balance}
        />
      )}

      {openEditForm && (
        <EditFormContainer
          open={openEditForm}
          handleClose={() => setOpenEditForm(false)}
          tourist={tourist}
        />
      )}
      {/*
      {openPaymentForm && localBooking && (
        <PaymentFormContainer
          open={openPaymentForm}
          onClose={() => setOpenPaymentForm(false)}
          booking={localBooking}
          balance={balance}
          handleOpenPaymentProof={handleOpenPaymentProof}
          setCreatedPayment={setCreatedPayment}
        />
      )}
      {openConfirmation && (
        <ConfirmationModal
          open={openConfirmation}
          handleClick={handleClickClose}
          handleClickCancel={handleClickConfirmation}
        />
      )}
      {openPaymentProof && localBooking && (
        <PaymentProofDialogContainer
          open={openPaymentProof}
          onClose={handleClosePaymentProof}
          // payment={localBooking.payments.at(-1)!}
          payment={createdPayment}
        />
      )} */}
    </>
  );
};

export default TouristCardContainer;
