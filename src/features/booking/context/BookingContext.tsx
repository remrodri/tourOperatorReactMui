import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { BookingType } from "../types/BookingType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../userManagement/types/User";
import {
  createBookingRequest,
  getAllBookingsRequest,
} from "../service/bookingService";
import { useNewSnackbar } from "../../../context/SnackbarContext";

type BookingContextType = {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;
  createBooking: (booking: Partial<BookingType>) => Promise<void>;
  getBookingById: (id: string) => BookingType | undefined;
  updateBookingStatus: (
    id: string,
    status: BookingType["status"]
  ) => Promise<void>;
  updateBooking: (id: string, booking: Partial<BookingType>) => Promise<void>;
};

const BookingContext = createContext<BookingContextType | null>(null);

export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a bookingProvider");
  }
  return context;
};

type BookingProviderProps = {
  children: ReactNode;
};

export const BookingProvider: React.FC<BookingProviderProps> = ({
  children,
}) => {
  // const [bookings, setBookings] = useState<BookingType[]>([]);
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useNewSnackbar();

  const updateBooking = async (id: string, booking: Partial<BookingType>) => {
    console.log("update::: ", id, booking);
  };

  const getBookings = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      // console.log("response::: ", response.data);
      const bookingData = response.data ? response.data : response;
      const transformedBookings = bookingData.map(transformApiBooking);
      // setBookings(response.data);
      setBookings(transformedBookings);
      setError(null);
    } catch (error) {
      console.error("Error fetching bookings", error);
      setError("Failed to fetch bookings");
      showSnackbar("Error al obtener las Reservas", "error");
    } finally {
      setLoading(false);
    }
  };

  // Transform API response to match BookingType format
  const transformApiBooking = (apiBooking: any): BookingType => {
    return {
      id: apiBooking.id,
      tourPackageId: apiBooking.tourPackageId,
      dateRangeId: apiBooking.dateRangeId,
      sellerId: apiBooking.sellerId,
      mainTouristId: apiBooking.mainTouristId,
      mainTourist: apiBooking.mainTourist,
      additionalTouristIds: apiBooking.additionalTouristIds,
      additionalTourists: apiBooking.additionalTourists,
      totalPrice: apiBooking.totalPrice,
      paymentIds: apiBooking.paymentIds,
      payments: apiBooking.payments,
      notes: apiBooking.notes,
      status: apiBooking.status,
    };
    // return {
    //   id: apiBooking.id,
    //   tourPackageId: apiBooking.tourPackageId,
    //   dateRangeId: apiBooking.dateRangeId,
    //   sellerId: apiBooking.sellerId,
    //   mainTouristId: apiBooking.mainTouristId,
    //   additionalTouristIds: apiBooking.additionalTouristIds || [],
    //   totalPrice: apiBooking.totalPrice,
    //   paymentIds: apiBooking.paymentIds || [],
    //   // Initialize with empty arrays if detailed objects aren't available yet
    //   payments: Array.isArray(apiBooking.payments) ? apiBooking.payments : [],
    //   additionalTourists: Array.isArray(apiBooking.additionalTourists)
    //     ? apiBooking.additionalTourists
    //     : [],
    //   notes: apiBooking.notes || "",
    //   status: apiBooking.status,
    // };
  };

  const createBooking = async (
    booking: Partial<BookingType>
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      // console.log("booking::: ", booking);
      const seller: User = jwtDecode(TokenService.getToken() as string);
      const bookingToCreate: BookingType = {
        additionalTourists: booking.additionalTourists,
        dateRangeId: booking.dateRangeId as string,
        mainTourist: booking.mainTourist,
        notes: booking.notes,
        payments: booking.payments as PaymentInfoType[],
        sellerId: seller.id,
        status: booking.status as BookingType["status"],
        totalPrice: booking.totalPrice as number,
        tourPackageId: booking.tourPackageId as string,
      };
      const response = await createBookingRequest(bookingToCreate);

      setBookings((prevBookings) => [...prevBookings, response.data]);
      showSnackbar("Creado con exito", "success");
    } catch (error) {
      // setError(
      //   error instanceof Error
      //     ? error.message
      //     : "ocurrio un error mientras se creaba la reserva"
      // );
      console.error("Error al crear la reserva: ", error);
      showSnackbar("Error al crear la reserva", "error");
      // throw error;
    } finally {
      setLoading(false);
    }
  };

  const getBookingById = (id: string): BookingType | undefined => {
    return bookings.find((booking) => booking.id === id);
  };

  const updateBookingStatus = async (
    id: string,
    status: BookingType["status"]
  ): Promise<void> => {};

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        createBooking,
        getBookingById,
        updateBookingStatus,
        updateBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
export default BookingContext;
