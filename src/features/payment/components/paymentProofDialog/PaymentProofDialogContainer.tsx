import { useTouristContext } from "../../../tourist/context/TouristContext";
import { useBookingContext } from "../../../booking/context/BookingContext";
import PaymentProofDialog from "./PaymentProofDialog";
import { PaymentType } from "../../../booking/types/PaymentType";
// import { PaymentType } from "../../types/PaymentType";

interface Props {
  open: boolean;
  onClose: () => void;
  payment: PaymentType | null;
}

const PaymentProofDialogContainer: React.FC<Props> = ({
  open,
  onClose,
  payment,
}) => {
  const { getTouristInfoById } = useTouristContext();
  const { getBookingById } = useBookingContext();

  if (!payment) return null;

  const booking = getBookingById(payment.bookingId);
  const tourist = getTouristInfoById(payment.touristId!);

  return (
    <PaymentProofDialog
      open={open}
      onClose={onClose}
      payment={payment}
      booking={booking}
      tourist={tourist}
    />
  );
};

export default PaymentProofDialogContainer;
