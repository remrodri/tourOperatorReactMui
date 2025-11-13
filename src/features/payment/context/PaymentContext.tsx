import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaymentType } from "../../booking/types/PaymentType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { createPaymentRequest } from "../service/paymentService";
import { jwtDecode } from "jwt-decode";
import { TokenService } from "../../../utils/tokenService";
import { User } from "../../user/types/User";
import { useBookingContext } from "../../booking/context/BookingContext";

interface PaymentContextType {
  // payments: PaymentType[];
  loading: boolean;
  error: string | null;
  // paymentFound: (id: string) => PaymentInfoType;
  // getPaymentsById: (ids: string[]) => Promise<void>;
  // paymentsFound: PaymentType[];
  // getPaymentInfoByIds: (ids: string[]) => PaymentType[];
  // getTotalPaid: (PaymentsId: string[]) => number;
  createPayment: (payment: any) => Promise<void>;
  // getBalance: (paymentIds: string[],totalPrice:number) => number;
  // addPaymentFromBooking: (payment: any) => PaymentType;
  addPaymentToBooking: (payment: PaymentType) => void;
}

const PaymentContext = createContext<PaymentContextType | null>(null);

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a paymentProvider");
  }
  return context;
};

interface PaymentProviderProps {
  children: ReactNode;
  // addPaymentToBooking:(payment:PaymentType)=>void
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}: // addPaymentToBooking
PaymentProviderProps) => {
  // const [paymentsFound, setPaymentsFound] = useState<PaymentType[]>([]);
  // const [payments, setPayments] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();
  const { bookings, setBookings, addPaymentToBooking } = useBookingContext();

  // const addPaymentToBooking=(payment:PaymentType)=>{
  //   const bookingFound=bookings.find((booking)=>booking.id===payment.bookingId);
  //   if(!bookingFound){
  //     return;
  //   }
  //   bookingFound.payments.push(payment);
  //   setBookings([...bookings]);
  // }

  // const getBalance = (paymentIds: string[],totalPrice:number): number => {
  //   const totalPaid = paymentIds.reduce((acc, id) => {
  //     const payment = payments.find((p) => p.id === id);
  //     if (!payment) {
  //       return acc;
  //     }
  //     return acc + payment.amount;
  //   }, 0);
  //   return totalPrice-totalPaid;
  // };

  const createPayment = async (payment: any): Promise<void> => {
    setLoading(true);
    const token = TokenService.getToken();
    if (!token) {
      console.error("No token found");
      return;
    }
    const seller: User = jwtDecode(token);
    const formData = new FormData();
    formData.append("bookingId", payment.bookingId);
    formData.append("sellerId", seller.id);
    formData.append("amount", payment.amount.toString());
    formData.append("paymentDate", payment.paymentDate);
    formData.append("paymentMethod", payment.paymentMethod);
    formData.append("touristId", payment.touristId);
    formData.append("paymentProofImage", payment.paymentProofImage);
    formData.append("paymentProofFolder", payment.paymentProofFolder);
    try {
      // for (const [key,value] of formData.entries()) {
      //   console.log(`${key}: `,value);
      // }
      const paymentData = await createPaymentRequest(formData);
      const transformedPayment = transformApiPayment(paymentData);
      // setPayments((prevPayments) => [...prevPayments, transformedPayment]);
      addPaymentToBooking(transformedPayment);
      setError(null);
      showSnackbar("Pago registrado exitosamente", "success");
    } catch (error) {
      console.error("Error creating payment", error);
      setError("Failed to create payment");
      showSnackbar("Error al registrar pago", "error");
    } finally {
      setLoading(false);
    }
  };

  // const addPaymentFromBooking = (payment: any) => {
  //   const paymentData = transformApiPayment(payment);
  //   setPayments((prevPayments) => [...prevPayments, paymentData]);
  //   // addPaymentToBooking(paymentData);
  //   return paymentData;
  // };

  // const getTotalPaid = (paymentIds: string[]): number => {
  //   const total = paymentIds.reduce((acc, id) => {
  //     const payment = payments.find((p) => p.id === id);
  //     if (!payment) {
  //       return acc;
  //     }
  //     return acc + payment.amount;
  //   }, 0);
  //   return total;
  // };

  // const getPaymentInfoByIds = (ids: string[]): PaymentType[] => {
  //   return ids
  //     .map((id) => payments.find((p) => p.id === id))
  //     .filter((p): p is PaymentType => p !== undefined);
  // };

  // const getPaymentsById = async (ids: string[]): Promise<void> => {
  //   // const payment = payments.find((payment) => payment.id === id);
  //   // if (!payment) {
  //   //   throw new Error("Payment not found");
  //   // }
  //   // return payment;
  //   // console.log("payments::: ", payments);
  //   // console.log("ids::: ", ids);

  //   const paymentsInfoFound = ids.map((id) =>
  //     payments.find((payment) => payment.id === id)
  //   );
  //   setPaymentsFound(paymentsInfoFound as PaymentType[]);
  //   // return [];
  // };

  // const fetchPayments = async (): Promise<void> => {
  //   setLoading(true);
  //   try {
  //     const response = await getAllPaymentsRequest();
  //     const paymentData = response;
  //     const transformedPayments = paymentData.map(transformApiPayment);
  //     setPayments(transformedPayments);
  //     setError(null);
  //   } catch (error) {
  //     console.error("Error fetching payments", error);
  //     setError("Failed to fetch payments");
  //     showSnackbar("Error al cargar pagos", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const transformApiPayment = (paymentData: any): PaymentType => {
    return {
      id: paymentData.id,
      amount: paymentData.amount,
      paymentDate: paymentData.paymentDate,
      paymentMethod: paymentData.paymentMethod,
      bookingId: paymentData.bookingId,
      sellerId: paymentData.sellerId,
      touristId: paymentData.touristId,
      paymentProofImageURL: paymentData.paymentProofImageURL,
    };
  };
  useEffect(() => {
    // fetchPayments();
    // console.log('::: ', );
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        loading,
        error,
        // getPaymentsById,
        // paymentsFound,
        // getPaymentInfoByIds,
        // getTotalPaid,
        addPaymentToBooking,
        createPayment,
        // getBalance,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
export default PaymentContext;
