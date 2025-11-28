import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookingType } from "../types/BookingType";
import {
  cancelBookingRequest,
  createBookingRequest,
  getAllBookingsRequest,
  updateAttendanceRequest,
  updateBookingRequest,
} from "../service/bookingService";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { useTouristContext } from "../../tourist/context/TouristContext";
// import { BookingFormValues } from "../../bookingForm/BookingFormContainer";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../user/types/User";
import { v4 as uuidv4 } from "uuid";
import { TouristType } from "../types/TouristType";
import { PaymentType } from "../types/PaymentType";
import { UpdateBookingType } from "../types/UpdateBookingType";
import { Group } from "../../guide/context/GuideContext";
import { BookingFormValues } from "../components/bookingForm/BookingFormContainer";

interface BookingContextType {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;
  getBookingById: (id: string) => BookingType | null;
  createBooking: (
    booking: BookingFormValues,
    touristsBySearch: TouristType[]
  ) => Promise<BookingType | null>;
  updateBooking: (booking: any) => Promise<void>;
  setBookings: (bookings: BookingType[]) => void;
  addPaymentToBooking: (payment: PaymentType) => void;
  updateAttendance: (data: any) => Promise<void>;
  getTouristCounterByDateRangeId: (dateRangeId: string) => number;
  getBookingsByDateRangeId: (
    dateRangeId: string,
    bookings: BookingType[],
    tourPackageId: string
  ) => BookingType[];
  cancelBooking: (
    bookingId: string,
    cancellationFee: number,
    refundAmount: number,
    refundedAt: Date
  ) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | null>(null);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();
  const { addTouristFromBooking } = useTouristContext();
  // console.log('::: ', );

  const cancelBooking = async (
    bookingId: string,
    cancellationFee: number,
    refundAmount: number,
    refundedAt: Date
  ): Promise<void> => {
    setLoading(true);
    try {
      const response = await cancelBookingRequest(
        bookingId,
        cancellationFee,
        refundAmount,
        refundedAt
      );
      if (!response || response.error) {
        setError(response?.error || "Error canceling booking");
        return;
      }
      const updatedBookings = bookings.map((booking) =>
        booking.id === response.id
          ? {
              ...booking,
              cancellationFee: response.cancellationFee,
              refundAmount: response.refundAmount,
              refundedAt: response.refundedAt,
              status: response.status,
            }
          : booking
      );
      setBookings(updatedBookings);
      showSnackbar("Reserva cancelada exitosamente", "success");
    } catch (error) {
      console.error("Error canceling booking", error);
      setError("Failed to cancel booking");
      showSnackbar("Error al cancelar la reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const getBookingsByDateRangeId = (
    dateRangeId: string,
    bookings: BookingType[],
    tourPackageId: string
  ): BookingType[] => {
    const bookingsByDateRangeId = bookings.filter(
      (booking) =>
        booking.dateRangeId === dateRangeId &&
        booking.tourPackageId === tourPackageId
    );
    return bookingsByDateRangeId;
  };

  const getTouristCounterByDateRangeId = (dateRangeId: string): number => {
    if (!dateRangeId) {
      return 0;
    }
    const touristCounter = bookings.reduce((counter, booking) => {
      if (booking.dateRangeId === dateRangeId) {
        return counter + booking.touristIds.length;
      }
      return counter;
    }, 0);
    return touristCounter;
  };

  const updateAttendance = async (data: any): Promise<any> => {
    setLoading(true);
    try {
      const attendanceList = await updateAttendanceRequest(data);
      const updatedBookings = attendanceList.map((attendance: Group) => {
        const booking = bookings.find(
          (b: BookingType) => b.id === attendance.bookingId
        );
        if (booking) {
          return {
            ...booking,
            attendance: attendance.group,
          };
        }
        return booking;
      });
      setBookings(updatedBookings);
      showSnackbar("Asistencia actualizada exitosamente", "success");
    } catch (error) {
      console.error("Error updating attendance", error);
      setError("Failed to update attendance");
      showSnackbar("Error al actualizar la asistencia", "error");
    } finally {
      setLoading(false);
    }
  };

  const addPaymentToBooking = (payment: PaymentType) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) => {
        if (booking.id === payment.bookingId) {
          // Verificamos si ya existe ese pago para evitar duplicados
          const alreadyExists = booking.payments.some(
            (p) => p.id === payment.id
          );
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

  const createBooking = async (
    booking: BookingFormValues,
    touristsBySearch: TouristType[]
  ): Promise<BookingType | null> => {
    let res = null;
    setError("");
    setLoading(true);
    const token = TokenService.getToken();
    if (!token) {
      showSnackbar("Error al crear la reserva", "error");
      setError("Error al crear la reserva");
      return res;
    }

    const seller: User = jwtDecode(token);
    // const tourists = [...booking.additionalTourists, booking.mainTourist];
    let tourists: TouristType[] = [];
    if (booking.mainTourist) {
      tourists.push(booking.mainTourist);
    }
    if (booking.additionalTourists) {
      tourists = [...booking.additionalTourists];
    }
    if (touristsBySearch) {
      tourists.push(...touristsBySearch);
    }
    console.log("tourists::: ", tourists);
    const paymentProofFolder = uuidv4();

    const formData = new FormData();
    formData.append("tourPackageId", booking.tourPackageId);
    formData.append("dateRangeId", booking.dateRangeId);
    formData.append("sellerId", seller.id);
    formData.append("status", "pending");
    formData.append("totalPrice", booking.totalPrice.toString());
    formData.append("notes", booking.notes || "");
    formData.append(
      "paymentProofImage",
      booking.firstPayment.paymentProofImage
    );
    formData.append("tourists", JSON.stringify(tourists));
    formData.append("paymentProofFolder", paymentProofFolder);
    formData.append(
      "firstPayment",
      JSON.stringify({
        amount: booking.firstPayment.amount,
        paymentDate: booking.firstPayment.paymentDate,
        paymentMethod: booking.firstPayment.paymentMethod,
        sellerId: seller.id,
      })
    );

    setLoading(true);
    try {
      const response = await createBookingRequest(formData);
      if (!response || response.error) {
        setError(response?.error || "Error creating booking");
        setLoading(false);
        showSnackbar("Error al crear la reserva", "error");
        return res;
      }

      const newTourists = response.tourists.map((t: any) =>
        addTouristFromBooking(t)
      );
      const touristIds = newTourists.map((t: TouristType) => t.id);

      const newBooking: BookingType = transformApiBooking({
        ...response,
        touristIds,
      });

      setBookings((prev) => [...prev, newBooking]);
      showSnackbar("Reserva creada exitosamente", "success");
      setLoading(false);
      // return newBooking;
      res = newBooking;
    } catch (error) {
      console.error("Error creating booking", error);
      setError("Failed to create booking");
      showSnackbar("Error al crear la reserva", "error");
    } finally {
      setLoading(false);
      return res;
    }
  };

  const updateBooking = async (booking: any): Promise<void> => {
    console.log("booking::: ", booking);
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
      console.log("response::: ", response);
      if (!response || response.error) {
        setError(response?.error || "Error updating booking");
        return;
      }

      const updatedTouristIds = response.tourists.map(
        (t: any) => addTouristFromBooking(t).id
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.id === response.id
            ? transformApiBooking({
                ...b,
                notes: response.notes,
                status: response.status,
                totalPrice: response.totalPrice,
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
      const transformedBookings = response.map((b: any) =>
        transformApiBooking(b)
      );
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
    createdAt: apiBooking.createdAt,
    attendance: apiBooking.attendance,
    cancellationFee: apiBooking.cancellationFee,
    refundAmount: apiBooking.refundAmount,
    refundedAt: apiBooking.refundedAt,
    bookingCode: apiBooking.bookingCode,
  });

  useEffect(() => {
    fetchBookings();
    console.log("::: ");
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
        updateAttendance,
        setBookings,
        getTouristCounterByDateRangeId,
        getBookingsByDateRangeId,
        cancelBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
