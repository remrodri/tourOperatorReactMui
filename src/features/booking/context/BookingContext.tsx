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
import { TourType } from "../../userManagement/types/TourType";
import { usePaymentContext } from "../../payment/context/PaymentContext";
import { CreateBookingType } from "../types/CreateBookingType";
import { BookingFormValues } from "../bookingForm/BookingFormContainer2";

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
  const { fetchTourists } = useTouristContext();
  const { addPaymentFromBooking } = usePaymentContext();
  const { addTouristFromBooking, getTouristInfoByIds, updateTourist } = useTouristContext();

  const updateBooking = async (booking: Partial<BookingType>) => {
    setLoading(true);
    try {
      // console.log('booking::: ', booking);
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
      updateTourist(booking.mainTourist!);
      if (booking.additionalTourists&&booking.additionalTourists.length>0) {
        for (const tourist of booking.additionalTourists) {
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
            additionalTouristIds:response.additionalTourists.map((tourist: TourType) => tourist.id), 
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
      setLoading(false);
    } catch (error) {
      console.error("Error updating booking", error);
      setError("Failed to update booking");
      showSnackbar("Error al actualizar la reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      // console.log("response::: ", response.data);
      const bookingData = response.data ? response.data : response;
      const transformedBookings = bookingData.map(transformApiBooking);
      console.log('transformedBookings::: ', transformedBookings);
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
      // additionalTourists: apiBooking.additionalTourists,
      additionalTourists: getTouristInfoByIds(apiBooking.additionalTouristIds),
      totalPrice: apiBooking.totalPrice,
      paymentIds: apiBooking.paymentIds,
      payments: apiBooking.payments,
      notes: apiBooking.notes,
      status: apiBooking.status,
    };
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
            .map((tourist: TourType) => tourist.id)
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
      console.log("response::: ", response);
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
          response.aditionalTourists &&
          response.additionalTourists.length > 0
        ) {
          return response.additionalTourists
            .map((tourist: TourType) => tourist.id)
            .filter((id: string) => id !== undefined);
        } else {
          return [];
        }
      };

      const paymentIds = () => {
        if (response.payments && response.payments.length > 0) {
          return (
            response.payments
              .map((payment: PaymentInfoType) => payment.id)
              .filter((id: string) => id !== undefined) || []
          );
        } else {
          return [];
        }
      };

      const apiBooking: BookingType = {
        id: response.id ?? "",
        tourPackageId: response.tourPackageId,
        dateRangeId: response.dateRangeId,
        sellerId: response.sellerId,
        mainTouristId: response.mainTourist.id,
        //   additionalTouristIds: apiBooking.additionalTouristIds || [],
        additionalTouristIds: additionalTouristIds(),
        totalPrice: response.totalPrice,
        //   paymentIds: apiBooking.paymentIds || [],
        paymentIds: paymentIds(),
        notes: response.notes,
        status: response.status,
        //   // Initialize with empty arrays if detailed objects aren't available yet
        //   payments: Array.isArray(apiBooking.payments) ? apiBooking.payments : [],
        //   additionalTourists: Array.isArray(apiBooking.additionalTourists)
        //     ? apiBooking.additionalTourists
        //     : [],
        //   notes: apiBooking.notes || "",
        //   status: apiBooking.status,
      };

      // setBookings((prevBookings) => [...prevBookings, response]);
      setBookings((prevBookings) => [...prevBookings, apiBooking]);
      showSnackbar("Creado con exito", "success");
      // await fetchTourists();
      // setLoading(false);
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
        createBooking2,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
export default BookingContext;
