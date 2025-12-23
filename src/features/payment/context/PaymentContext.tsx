import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { PaymentType } from "../../booking/types/PaymentType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { createPaymentRequest } from "../service/paymentService";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../../../utils/tokenService";
import { User } from "../../user/types/User";
import { useBookingContext } from "../../booking/context/BookingContext";

/* =======================
   Types
======================= */

interface CreatePaymentInput {
  bookingId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  touristId: string;
  paymentProofImage: File | null;
  paymentProofFolder: string;
}

interface PaymentContextType {
  loading: boolean;
  error: string | null;
  createPayment: (payment: CreatePaymentInput) => Promise<PaymentType | null>;
  addPaymentToBooking: (payment: PaymentType) => void;
}

/* =======================
   Context
======================= */

const PaymentContext = createContext<PaymentContextType | null>(null);

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a PaymentProvider");
  }
  return context;
};

interface PaymentProviderProps {
  children: ReactNode;
}

/* =======================
   Provider
======================= */

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showSnackbar } = useNewSnackbar();
  const { addPaymentToBooking } = useBookingContext();

  /* =======================
     Helpers
  ======================= */

  const transformApiPayment = (data: any): PaymentType => ({
    id: data.id,
    amount: data.amount,
    paymentDate: data.paymentDate,
    paymentMethod: data.paymentMethod,
    bookingId: data.bookingId,
    sellerId: data.sellerId,
    touristId: data.touristId,
    paymentProofImage: data.paymentProofImage,
    paymentProofFolder: data.paymentProofFolder,
  });

  const buildFormData = (
    payment: CreatePaymentInput,
    sellerId: string
  ): FormData => {
    const formData = new FormData();

    formData.append("bookingId", payment.bookingId);
    formData.append("sellerId", sellerId);
    formData.append("amount", payment.amount.toString());
    formData.append("paymentDate", payment.paymentDate);
    formData.append("paymentMethod", payment.paymentMethod);
    formData.append("touristId", payment.touristId);
    formData.append("paymentProofImage", payment.paymentProofImage);
    formData.append("paymentProofFolder", payment.paymentProofFolder);

    return formData;
  };

  /* =======================
     Actions
  ======================= */

  const createPayment = useCallback(
    async (payment: CreatePaymentInput): Promise<PaymentType | null> => {
      setLoading(true);
      setError(null);

      try {
        const token = TokenService.getToken();
        if (!token) {
          throw new Error("Token no encontrado");
        }

        const seller: User = jwtDecode(token);
        const formData = buildFormData(payment, seller.id);

        const paymentData = await createPaymentRequest(formData);
        const transformedPayment = transformApiPayment(paymentData);

        addPaymentToBooking(transformedPayment);
        showSnackbar("Pago registrado exitosamente", "success");

        return transformedPayment;
      } catch (err) {
        console.error("Error creating payment:", err);
        setError("Error al registrar el pago");
        showSnackbar("Error al registrar pago", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [addPaymentToBooking, showSnackbar]
  );

  /* =======================
     Provider value
  ======================= */

  return (
    <PaymentContext.Provider
      value={{
        loading,
        error,
        createPayment,
        addPaymentToBooking,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export default PaymentContext;
