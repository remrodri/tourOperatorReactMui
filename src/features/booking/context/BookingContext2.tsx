import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { BookingType } from "../types/BookingType";
import { createBookingRequest, getAllBookingsRequest, updateBookingRequest } from "../service/bookingService";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { useTouristContext } from "../../tourist/context/TouristContext";
import { usePaymentContext } from "../../payment/context/PaymentContext";
import { BookingFormValues } from '../bookingForm2/BookingFormContainer';
import { TokenService } from "../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { User } from "../../userManagement/types/User";
import { v4 as uuidv4 } from 'uuid';
import { TouristType } from "../types/TouristType";
import { PaymentType } from "../types/PaymentType";

interface BookingContextType2 {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;
  getBookingById: (id: string) => BookingType | null;
  createBooking:(booking:BookingFormValues)=>Promise<void>
  updateBooking:(booking:any)=>Promise<void>
}

const BookingContext2 = createContext<BookingContextType2 | null>(null);

export const useBookingContext2 = () => {
  const context = useContext(BookingContext2);
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
  const {addTouristFromBooking} = useTouristContext();
  const {addPaymentFromBooking} = usePaymentContext();

  const createBooking = async (booking:BookingFormValues): Promise<void> => {
    const token = TokenService.getToken();
    if (!token) {
      showSnackbar("Error al crear la reserva", "error");
      return;
    }
    const seller:User = jwtDecode(token)
    const tourists = [...booking.additionalTourists,booking.mainTourist]
    const paymentProofFolder=uuidv4()
    const formData = new FormData();
    formData.append("tourPackageId",booking.tourPackageId);
    formData.append("dateRangeId",booking.dateRangeId);
    formData.append("sellerId",seller.id);
    formData.append("status","pending");
    formData.append("totalPrice",booking.totalPrice.toString());
    formData.append("notes",booking.notes ||"");
    formData.append("paymentProofImage",booking.firstPayment.paymentProofImage);
    formData.append("tourists",JSON.stringify(tourists));
    formData.append("paymentProofFolder",paymentProofFolder);
    formData.append("firstPayment",JSON.stringify({
      amount:booking.firstPayment.amount,
      paymentDate:booking.firstPayment.paymentDate,
      paymentMethod: booking.firstPayment.paymentMethod,
      sellerId:seller.id,
    }))
    // for (const [key,value] of formData.entries()) {
    //   console.log(`${key}: `,value);
    // }
    setLoading(true);
    try {
      const response = await createBookingRequest(formData);
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

      const tourists = response.tourists.map((tourist:any)=>addTouristFromBooking(tourist));
      const payments = response.payments.map((payment:any)=>addPaymentFromBooking(payment));

      // response.tourists.forEach((tourist:any)=>{
      //   addTouristFromBooking(tourist);
      // })

      // response.payments.forEach((payment:any)=>{
      //   addPaymentFromBooking(payment);
      // })

      const touristIds = tourists.map((tourist:TouristType)=>tourist.id);
      const paymentIds = payments.map((payment:PaymentType)=>payment.id);

      const apiBooking:BookingType = transformApiBooking({
        id: response.id,
        tourPackageId: response.tourPackageId,
        dateRangeId: response.dateRangeId,
        sellerId: response.sellerId,
        touristIds:touristIds,
        totalPrice: response.totalPrice,
        paymentIds: paymentIds,
        notes: response.notes,
        status: response.status,
        paymentProofFolder:response.paymentProofFolder
      });
      setBookings([...bookings, apiBooking]);
      showSnackbar("Reserva creada exitosamente", "success");
      setLoading(false);
    } catch (error) {
      console.error("Error creating booking", error);
      setError("Failed to create booking");
      showSnackbar("Error al crear la reserva", "error");
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = async (booking:any): Promise<void> => {
    setLoading(true);
    try {
      const response = await updateBookingRequest(booking.id!, booking);
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
    setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      const transformedBookings = response.map((booking:any)=>transformApiBooking(booking));
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
    const bookingFound = bookings.find((booking) => booking.id === id);
    if (!bookingFound) {
      showSnackbar("No se encontro la reserva", "error");
      return null;
    }
    return bookingFound;
  };

const transformApiBooking = (apiBooking: any): BookingType => {
  const booking:BookingType = {
    id: apiBooking.id,
    tourPackageId: apiBooking.tourPackageId,
    dateRangeId: apiBooking.dateRangeId,
    sellerId: apiBooking.sellerId,
    touristIds:apiBooking.touristIds,
    totalPrice: apiBooking.totalPrice,
    paymentIds: apiBooking.paymentIds,
    notes: apiBooking.notes,
    status: apiBooking.status,
    paymentProofFolder:apiBooking.paymentProofFolder
  };
  return booking;
}

useEffect(()=>{
  fetchBookings();
},[])

return (
  <BookingContext2.Provider
    value={{
      bookings,
      loading,
      error,
      getBookingById,
      createBooking,
      updateBooking
    }}
  >
    {children}
  </BookingContext2.Provider>
)
}
