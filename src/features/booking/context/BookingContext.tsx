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
  createBooking2Request,
  createBookingRequest,
  getAllBookingsRequest,
  updateBookingRequest
} from "../service/bookingService";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { usePaymentContext } from "../../payment/context/PaymentContext";
import { CreateBookingType } from "../types/CreateBookingType";
import { BookingFormValues } from "../bookingForm/BookingFormContainer2";
import { TouristType } from "../types/TouristType";

type BookingContextType = {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;
  getBookingById: (id: string) => BookingType | null;
  updateBookingStatus: (
    id: string,
    status: BookingType["status"]
  ) => Promise<void>;
  updateBooking: (booking: Partial<BookingType>) => Promise<void>;
  createBooking2:(booking:BookingFormValues)=>Promise<void>
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
  const { addPaymentFromBooking,getPaymentInfoByIds, payments } = usePaymentContext();
  const { tourists,addTouristFromBooking, getTouristInfoByIds, updateTourist,getTouristInfoById,fetchTourists } = useTouristContext();


  const updateBooking = async (booking: Partial<BookingType>) => {
    setLoading(true);
    try {
      const response = await updateBookingRequest(booking.id!, booking);
      // console.log('response::: ', response);
      if (!response) {
        console.warn("response is null");
        setError("Error updating booking");
        setLoading(false);
        return;
      }
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      showSnackbar("Reserva actualizada exitosamente", "success");
      updateTourist(response.mainTourist);
      if (response.additionalTourists&&response.additionalTourists.length>0) {
        for (const tourist of response.additionalTourists) {
          updateTourist(tourist);
        }
      }
      setBookings((prevBookings:BookingType[]) =>
        prevBookings.map((prevBooking:BookingType) =>
        {
          return prevBooking.id === response.id 
          ? {...prevBooking, 
            id:response.id, 
            // tourPackageId:response.tourPackageId, 
            dateRangeId:response.dateRangeId, 
            sellerId:response.sellerId, 
            // mainTouristId:response.mainTouristId, 
            mainTourist:response.mainTourist, 
            additionalTouristIds:response.additionalTourists.map((tourist: TouristType) => tourist.id), 
            // additionalTourists:getTouristInfoByIds(response.additionalTouristIds), 
            additionalTourists:response.additionalTourists,
            totalPrice:response.totalPrice, 
            // paymentIds:response.paymentIds, 
            // payments:response.payments, 
            notes:response.notes, 
            status:response.status}
          : prevBooking
        }
        )
      );
      // console.log('bookings::: ', bookings);
      setLoading(false);
    } catch (error) {
      console.error("Error updating booking", error);
      setError("Failed to update booking");
      showSnackbar("Error al actualizar la reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async (): Promise<void> => {
    // setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      // console.log('response::: ', response);
      
      const transformedBookings = response.map((booking:any)=>transformApiBooking(booking));
      // console.log('transformedBookings::: ', transformedBookings);
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
    const additionalTourists = apiBooking.additionalTouristIds.map((id:string)=>getTouristInfoById(id))
    const mainTourist = getTouristInfoById(apiBooking.mainTouristId)
    // console.log('additionalTourists::: ', additionalTourists);
    // console.log('apiBooking::: ', apiBooking);
    const booking:BookingType = {
      id: apiBooking.id,
      tourPackageId: apiBooking.tourPackageId,
      dateRangeId: apiBooking.dateRangeId,
      sellerId: apiBooking.sellerId,
      mainTouristId: apiBooking.mainTouristId,
      mainTourist:mainTourist!,
      additionalTouristIds: apiBooking.additionalTouristIds,
      // additionalTourists: apiBooking.additionalTourists,
      additionalTourists: additionalTourists,
      totalPrice: apiBooking.totalPrice,
      paymentIds: apiBooking.paymentIds,
      // payments: apiBooking.payments,
      payments: getPaymentInfoByIds(apiBooking.paymentIds),
      notes: apiBooking.notes,
      status: apiBooking.status,
    };
    // console.log('booking::: ', booking);
    return booking;
  };

  const createBooking2 = async (booking: BookingFormValues): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      // console.log("booking::: ", booking);
      const seller: User = jwtDecode(TokenService.getToken() as string);
      const bookingToCreate:CreateBookingType={
        tourPackageId:booking.tourPackageId,
        dateRangeId:booking.dateRangeId,
        sellerId:seller.id,
        mainTourist:booking.mainTourist,
        additionalTourists:booking.additionalTourists,
        totalPrice:booking.totalPrice,
        payments:[booking.firstPayment],
        notes:booking.notes??"",
        status:"pending"
      }
      // console.log('bookingToCreate::: ', bookingToCreate);
      const response = await createBooking2Request(bookingToCreate);
      console.log('response::: ', response);
      if (!response) {
        console.warn("response is null");
        setError("Error creating booking");
        setLoading(false);
        return;
      }
      if (response.error) {
        setError(response.error);
        setLoading(false);
        return;
      }
      showSnackbar("Reserva creada exitosamente", "success");
      setLoading(false);

      response.mainTourist && addTouristFromBooking(response.mainTourist);
      if (
        response.additionalTourists &&
        response.additionalTourists.length > 0
      ) {
        for (const tourist of response.additionalTourists) {
          addTouristFromBooking(tourist);
        }
      }
      if (response.payments && response.payments.length > 0) {
        for (const payment of response.payments) {
          addPaymentFromBooking(payment);
        }
      }

      const additionalTouristIds = () => {
        if (
          response.additionalTourists &&
          response.additionalTourists.length > 0
        ) {
          return response.additionalTourists
            .map((tourist: TouristType) => tourist.id)
            .filter((id: string) => id !== undefined);
        } else {
          return [];
        }
      };

      const paymentIds = () => {
        if (response.payments && response.payments.length > 0) {
          return response.payments
            .map((payment: PaymentInfoType) => payment.id)
            .filter((id: string) => id !== undefined);
        } else {
          return [];
        }
      };

      const apiBooking: BookingType = {
        id: response.id ?? "",
        tourPackageId: response.tourPackageId,
        dateRangeId: response.dateRangeId,
        sellerId: response.sellerId,
        mainTouristId: response.mainTouristId,
        mainTourist: response.mainTourist,
        additionalTouristIds: additionalTouristIds(),
        additionalTourists: response.additionalTourists,
        totalPrice: response.totalPrice,
        paymentIds: paymentIds(),
        payments: response.payments,
        notes: response.notes,
        status: response.status,
      };
      setBookings((prevBookings) => [...prevBookings, apiBooking]);
      // formik.resetForm();
      showSnackbar("Reserva creada exitosamente", "success");


    } catch (error) {
      console.error("Error creating booking", error);
      setError("Failed to create booking");
      showSnackbar("Error al crear la reserva", "error");
    } finally {
      setLoading(false);
    }
  };



  const getBookingById = (id: string): BookingType | null => {
    return bookings.find((booking) => booking.id === id) || null;
  };

  const updateBookingStatus = async (
    id: string,
    status: BookingType["status"]
  ): Promise<void> => {};

  useEffect(() => {
    fetchBookings();
    // fetchTourists();
  }, [tourists,payments]);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        getBookingById,
        updateBookingStatus,
        updateBooking,
        createBooking2,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
export default BookingContext;
