import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { PaymentInfoType } from "../../booking/types/PaymentInfoType";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { createPaymentRequest, getAllPaymentsRequest } from "../service/paymentService";

type PaymentContextType = {
  payments: PaymentInfoType[];
  loading: boolean;
  error: string | null;
  // paymentFound: (id: string) => PaymentInfoType;
  getPaymentsById: (ids: string[]) => Promise<void>;
  paymentsFound: PaymentInfoType[];
  getPaymentInfoByIds: (ids: string[]) => PaymentInfoType[];
  getTotalPaid: (PaymentsId: string[]) => number;
  addPaymentFromBooking: (payment: any) => void;
  createPayment: (payment: PaymentInfoType) => Promise<void>;
};

const PaymentContext = createContext<PaymentContextType | null>(null);

export const usePaymentContext = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePaymentContext must be used within a paymentProvider");
  }
  return context;
};

type PaymentProviderProps = {
  children: ReactNode;
};

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [paymentsFound, setPaymentsFound] = useState<PaymentInfoType[]>([]);
  const [payments, setPayments] = useState<PaymentInfoType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();

  const createPayment = async (payment: PaymentInfoType): Promise<void> => {
    setLoading(true);
    try {
      const paymentData = await createPaymentRequest(payment);
      const transformedPayment = transformApiPayment(paymentData);
      setPayments((prevPayments) => [...prevPayments, transformedPayment]);
      setError(null);
    } catch (error) {
      console.error("Error creating payment", error);
      setError("Failed to create payment");
      showSnackbar("Error al crear pago", "error");
    } finally {
      setLoading(false);
    }
  };

  const addPaymentFromBooking = (payment: any) => {
    setPayments((prevPayments) => [...prevPayments, payment]);
  };

  const getTotalPaid = (paymentIds: string[]): number => {
    const total = paymentIds.reduce((acc, id) => {
      const payment = payments.find((p) => p.id === id);
      if (!payment) {
        return acc;
      }
      return acc + payment.amount;
    }, 0);
    return total;
  };

  const getPaymentInfoByIds = (ids: string[]): PaymentInfoType[] => {
    return ids
      .map((id) => payments.find((p) => p.id === id))
      .filter((p): p is PaymentInfoType => p !== undefined);
  };

  const getPaymentsById = async (ids: string[]): Promise<void> => {
    // const payment = payments.find((payment) => payment.id === id);
    // if (!payment) {
    //   throw new Error("Payment not found");
    // }
    // return payment;
    // console.log("payments::: ", payments);
    // console.log("ids::: ", ids);

    const paymentsInfoFound = ids.map((id) =>
      payments.find((payment) => payment.id === id)
    );
    setPaymentsFound(paymentsInfoFound as PaymentInfoType[]);
    // return [];
  };

  const fetchPayments = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAllPaymentsRequest();
      const paymentData = response.data ? response.data : response;
      const transformedPayments = paymentData.map(transformApiPayment);
      setPayments(transformedPayments);
      setError(null);
    } catch (error) {
      console.error("Error fetching payments", error);
      setError("Failed to fetch payments");
      showSnackbar("Error al cargar pagos", "error");
    } finally {
      setLoading(false);
    }
  };

  const transformApiPayment = (paymentData: any): PaymentInfoType => {
    return {
      id: paymentData.id,
      amount: paymentData.amount,
      paymentDate: paymentData.paymentDate,
      paymentMethod: paymentData.paymentMethod,
      transactionId: paymentData.transactionId,
      bookingId: paymentData.bookingId,
    };
  };
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <PaymentContext.Provider
      value={{
        payments,
        loading,
        error,
        getPaymentsById,
        paymentsFound,
        getPaymentInfoByIds,
        getTotalPaid,
        addPaymentFromBooking,
        createPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
export default PaymentContext;
