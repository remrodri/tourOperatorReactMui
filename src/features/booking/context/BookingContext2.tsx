import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookingType } from "../types/BookingType";
import {
  createBookingRequest,
  getAllBookingsRequest,
  updateBookingRequest,
} from "../service/bookingService";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { BookingFormValues } from "../bookingForm2/BookingFormContainer";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../userManagement/types/User";
import { v4 as uuidv4 } from "uuid";
import { TouristType } from "../types/TouristType";
import { PaymentType } from "../types/PaymentType";
import { UpdateBookingType } from "../types/UpdateBookingType";

interface BookingContextType2 {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;
  getBookingById: (id: string) => BookingType | null;
  createBooking: (booking: BookingFormValues) => Promise<void>;
  updateBooking: (booking: any) => Promise<void>;
  setBookings: (bookings: BookingType[]) => void;
  addPaymentToBooking: (payment: PaymentType) => void;
}

const BookingContext = createContext<BookingContextType2 | null>(null);

export const useBookingContext2 = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext2 must be used within a BookingProvider2");
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider2: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();
  const { addTouristFromBooking } = useTouristContext();

  const addPaymentToBooking = (payment: PaymentType) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === payment.bookingId) {
          // Verificamos si ya existe ese pago para evitar duplicados
          const alreadyExists = booking.payments.some((p) => p.id === payment.id);
          if (!alreadyExists) {
            return {
              ...booking,
              payments: [...booking.payments, payment],
            };
          }
        }
        return booking;
      })
    );
  };

  const createBooking = async (booking: BookingFormValues): Promise<void> => {
    const token = TokenService.getToken();
    if (!token) {
      showSnackbar("Error al crear la reserva", "error");
      return;
    }

    const seller: User = jwtDecode(token);
    const tourists = [...booking.additionalTourists, booking.mainTourist];
    const paymentProofFolder = uuidv4();

    const formData = new FormData();
    formData.append("tourPackageId", booking.tourPackageId);
    formData.append("dateRangeId", booking.dateRangeId);
    formData.append("sellerId", seller.id);
    formData.append("status", "pending");
    formData.append("totalPrice", booking.totalPrice.toString());
    formData.append("notes", booking.notes || "");
    formData.append("paymentProofImage", booking.firstPayment.paymentProofImage);
    formData.append("tourists", JSON.stringify(tourists));
    formData.append("paymentProofFolder", paymentProofFolder);
    formData.append("firstPayment", JSON.stringify({
      amount: booking.firstPayment.amount,
      paymentDate: booking.firstPayment.paymentDate,
      paymentMethod: booking.firstPayment.paymentMethod,
      sellerId: seller.id,
    }));

    setLoading(true);
    try {
      const response = await createBookingRequest(formData);
      if (!response || response.error) {
        setError(response?.error || "Error creating booking");
        return;
      }

      const newTourists = response.tourists.map((t: any) => addTouristFromBooking(t));
      const touristIds = newTourists.map((t: TouristType) => t.id);

      const newBooking: BookingType = transformApiBooking({
        ...response,
        touristIds,
      });

      setBookings((prev) => [...prev, newBooking]);
      showSnackbar("Reserva creada exitosamente", "success");
    } catch (error) {
      console.error("Error creating booking", error);
      setError("Failed to create booking");
      showSnackbar("Error al crear la reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (booking: any): Promise<void> => {
    setLoading(true);
    const tourists = [...booking.additionalTourists, booking.mainTourist];
    const bookingToUpdate: UpdateBookingType = {
      totalPrice: booking.totalPrice,
      notes: booking.notes,
      status: booking.status ?? "pending",
      tourists,
    };

    try {
      const response = await updateBookingRequest(booking.id, bookingToUpdate);
      if (!response || response.error) {
        setError(response?.error || "Error updating booking");
        return;
      }

      const updatedTouristIds = response.tourists.map((t: any) => addTouristFromBooking(t).id);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === response.id
            ? transformApiBooking({
                ...b,
                notes: booking.notes,
                status: booking.status,
                totalPrice: booking.totalPrice,
                touristIds: updatedTouristIds,
              })
            : b
        )
      );
      showSnackbar("Reserva actualizada exitosamente", "success");
    } catch (error) {
      console.error("Error updating booking", error);
      setError("Failed to update booking");
      showSnackbar("Error al actualizar la reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      const transformedBookings = response.map((b: any) => transformApiBooking(b));
      setBookings(transformedBookings);
      setError(null);
    } catch (error) {
      console.error("Error fetching bookings", error);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const getBookingById = (id: string): BookingType | null => {
    const bookingFound = bookings.find((b) => b.id === id);
    if (!bookingFound) {
      showSnackbar("No se encontró la reserva", "error");
      return null;
    }
    return bookingFound;
  };

  const transformApiBooking = (apiBooking: any): BookingType => ({
    id: apiBooking.id,
    tourPackageId: apiBooking.tourPackageId,
    dateRangeId: apiBooking.dateRangeId,
    sellerId: apiBooking.sellerId,
    touristIds: apiBooking.touristIds,
    totalPrice: apiBooking.totalPrice,
    payments: apiBooking.payments,
    notes: apiBooking.notes,
    status: apiBooking.status,
    paymentProofFolder: apiBooking.paymentProofFolder,
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        getBookingById,
        createBooking,
        updateBooking,
        addPaymentToBooking,
        setBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
