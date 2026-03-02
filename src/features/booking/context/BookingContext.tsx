/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
  // useMemo,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

import { TokenService } from "../../../utils/tokenService";
import { useNewSnackbar } from "../../../context/SnackbarContext";
import { useTouristContext } from "../../tourist/context/TouristContext";

import type { UserType } from "../../userManagement/types/UserType";
import type { BookingType } from "../types/BookingType";
import type { TouristType } from "../types/TouristType";
import type { PaymentType } from "../types/PaymentType";
import type { UpdateBookingType } from "../types/UpdateBookingType";
import type { BookingFormValues } from "../components/bookingForm/BookingFormContainer";

import {
  cancelBookingRequest,
  createBookingRequest,
  getAllBookingsRequest,
  updateAttendanceRequest,
  updateBookingRequest,
} from "../service/bookingService";

import type { Group } from "../../guide/context/GuideContext";

interface BookingContextType {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;

  // (Opcional pero útil, estilo UserContext)
  fetchBookings: () => void;

  getBookingById: (id: string) => BookingType | null;

  createBooking: (
    booking: BookingFormValues,
    touristsBySearch: TouristType[],
  ) => Promise<BookingType | null>;

  updateBooking: (booking: any) => Promise<BookingType | null>;

  cancelBooking: (
    bookingId: string,
    cancellationFee: number,
    refundAmount: number,
    refundedAt: Date,
  ) => Promise<BookingType | null>;

  updateAttendance: (data: any) => Promise<Group[] | null>;

  addPaymentToBooking: (payment: PaymentType) => void;

  setBookings: (bookings: BookingType[]) => void;

  getTouristCounterByDateRangeId: (dateRangeId: string) => number;

  getBookingsByDateRangeId: (
    dateRangeId: string,
    bookings: BookingType[],
    tourPackageId: string,
  ) => BookingType[];
}

type AttendanceItem = { touristId: string; status: "present" | "absent" };

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (ctx === undefined) {
    throw new Error("useBookingContext debe ser usado con un BookingProvider");
  }
  return ctx;
};

// ✅ Helper por si API devuelve _id en vez de id
const getBookingId = (b: any) => b?.id ?? b?._id;

export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { showSnackbar } = useNewSnackbar();
  const { addTouristFromBooking } = useTouristContext();

  
// si TouristWithStatus tiene { id | _id } y status
const toAttendance = (group: any[]): AttendanceItem[] => {
  return (group ?? [])
    .map((t) => ({
      touristId: t.touristId ?? t.id ?? t._id,  // <-- aquí está la clave
      status: t.status,                          // "present" | "absent"
    }))
    .filter((x) => Boolean(x.touristId) && (x.status === "present" || x.status === "absent"));
};


  // ✅ Transform robusto
  const transformApiBooking = useCallback(
    (apiBooking: any): BookingType => ({
      id: getBookingId(apiBooking),
      tourPackageId: apiBooking.tourPackageId,
      dateRangeId: apiBooking.dateRangeId,
      sellerId: apiBooking.sellerId,
      touristIds: apiBooking.touristIds ?? [],
      totalPrice: apiBooking.totalPrice,
      payments: apiBooking.payments ?? [],
      notes: apiBooking.notes ?? "",
      status: apiBooking.status ?? "pending",
      paymentProofFolder: apiBooking.paymentProofFolder,
      createdAt: apiBooking.createdAt,
      attendance: apiBooking.attendance,
      cancellationFee: apiBooking.cancellationFee,
      refundAmount: apiBooking.refundAmount,
      refundedAt: apiBooking.refundedAt,
      bookingCode: apiBooking.bookingCode,
    }),
    [],
  );

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      if (!response) {
        setError("No se pudieron cargar las reservas");
        setBookings([]);
        return;
      }
      const transformed = response.map((b: any) => transformApiBooking(b));
      setBookings(transformed);
      setError(null);
    } catch (e) {
      console.error("Error fetching bookings", e);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, [transformApiBooking]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const getBookingById = useCallback(
    (id: string): BookingType | null => {
      const found = bookings.find((b) => getBookingId(b) === id) ?? null;
      if (!found) {
        showSnackbar("No se encontró la reserva", "error");
      }
      return found;
    },
    [bookings, showSnackbar],
  );

  const getBookingsByDateRangeId = useCallback(
    (dateRangeId: string, list: BookingType[], tourPackageId: string) =>
      list.filter(
        (b) =>
          b.dateRangeId === dateRangeId && b.tourPackageId === tourPackageId,
      ),
    [],
  );

  const getTouristCounterByDateRangeId = useCallback(
    (dateRangeId: string): number => {
      if (!dateRangeId) return 0;
      return bookings.reduce((counter, b) => {
        if (b.dateRangeId === dateRangeId) {
          return counter + (b.touristIds?.length ?? 0);
        }
        return counter;
      }, 0);
    },
    [bookings],
  );

  const addPaymentToBooking = useCallback((payment: PaymentType) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (getBookingId(b) !== payment.bookingId) return b;

        const payments = b.payments ?? [];
        const alreadyExists = payments.some((p) => p.id === payment.id);
        if (alreadyExists) return b;

        return { ...b, payments: [...payments, payment] };
      }),
    );
  }, []);

  const updateAttendance = useCallback(
    async (data: any): Promise<Group[] | null> => {
      setLoading(true);
      try {
        const attendanceList = await updateAttendanceRequest(data);
        if (!attendanceList) {
          setError("Failed to update attendance");
          showSnackbar("Error al actualizar la asistencia", "error");
          return null;
        }

        // Se asume que attendanceList es Group[]
        setBookings((prev) =>
          prev.map((b) => {
            const a = (attendanceList as Group[]).find(
              (x) => x.bookingId === getBookingId(b),
            );

            if (!a) return b;

            return {
              ...b,
              attendance: toAttendance(a.group as any[]),
            };
          }),
        );

        showSnackbar("Asistencia actualizada exitosamente", "success");
        setError(null);
        return attendanceList as Group[];
      } catch (e) {
        console.error("Error updating attendance", e);
        setError("Failed to update attendance");
        showSnackbar("Error al actualizar la asistencia", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar],
  );

  const createBooking = useCallback(
    async (
      booking: BookingFormValues,
      touristsBySearch: TouristType[],
    ): Promise<BookingType | null> => {
      setLoading(true);
      setError(null);

      const token = TokenService.getToken();
      if (!token) {
        setError("Error al crear la reserva (sin token)");
        showSnackbar("Error al crear la reserva", "error");
        setLoading(false);
        return null;
      }

      let seller: UserType;
      try {
        seller = jwtDecode<UserType>(token);
      } catch {
        setError("Token inválido");
        showSnackbar("Error al crear la reserva", "error");
        setLoading(false);
        return null;
      }

      // Construimos turistas
      const tourists: TouristType[] = [];
      if (booking.mainTourist) tourists.push(booking.mainTourist);
      if (booking.additionalTourists?.length)
        tourists.push(...booking.additionalTourists);
      if (touristsBySearch?.length) tourists.push(...touristsBySearch);

      const paymentProofFolder = uuidv4();

      const formData = new FormData();
      formData.append("tourPackageId", booking.tourPackageId);
      formData.append("dateRangeId", booking.dateRangeId);
      formData.append("sellerId", seller.id);
      formData.append("status", "pending");
      formData.append("totalPrice", booking.totalPrice.toString());
      formData.append("notes", booking.notes || "");
      formData.append("tourists", JSON.stringify(tourists));
      formData.append("paymentProofFolder", paymentProofFolder);

      // Imagen
      if (booking.firstPayment?.paymentProofImage) {
        formData.append(
          "paymentProofImage",
          booking.firstPayment.paymentProofImage,
        );
      }

      // Primer pago
      formData.append(
        "firstPayment",
        JSON.stringify({
          amount: booking.firstPayment.amount,
          paymentDate: booking.firstPayment.paymentDate,
          paymentMethod: booking.firstPayment.paymentMethod,
          sellerId: seller.id,
        }),
      );

      try {
        const response = await createBookingRequest(formData);
        if (!response) {
          setError("Error creating booking");
          showSnackbar("Error al crear la reserva", "error");
          return null;
        }

        // El backend te devuelve tourists => los agregamos/normalizamos y guardamos ids
        const newTourists =
          (response as any).tourists?.map((t: any) =>
            addTouristFromBooking(t),
          ) ?? [];
        const touristIds = newTourists.map((t: TouristType) => t.id);

        const newBooking = transformApiBooking({
          ...response,
          touristIds,
        });

        setBookings((prev) => [...prev, newBooking]);
        showSnackbar("Reserva creada exitosamente", "success");
        return newBooking;
      } catch (e) {
        console.error("Error creating booking", e);
        setError("Failed to create booking");
        showSnackbar("Error al crear la reserva", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [addTouristFromBooking, showSnackbar, transformApiBooking],
  );

  const updateBooking = useCallback(
    async (booking: any): Promise<BookingType | null> => {
      setLoading(true);
      setError(null);

      // Ojo: booking.additionalTourists puede ser undefined
      const tourists = [
        ...(booking.additionalTourists ?? []),
        booking.mainTourist,
      ].filter(Boolean);

      const bookingToUpdate: UpdateBookingType = {
        totalPrice: booking.totalPrice,
        notes: booking.notes,
        status: booking.status ?? "pending",
        tourists,
      };

      try {
        const response = await updateBookingRequest(
          getBookingId(booking),
          bookingToUpdate,
        );
        if (!response || (response as any).error) {
          const msg = (response as any)?.error || "Error updating booking";
          setError(msg);
          showSnackbar("Error al actualizar la reserva", "error");
          return null;
        }

        const updatedTouristIds =
          (response as any).tourists?.map(
            (t: any) => addTouristFromBooking(t).id,
          ) ?? [];

        const updated = transformApiBooking({
          ...response,
          touristIds: updatedTouristIds,
        });

        setBookings((prev) =>
          prev.map((b) =>
            getBookingId(b) === getBookingId(response) ? updated : b,
          ),
        );

        showSnackbar("Reserva actualizada exitosamente", "success");
        return updated;
      } catch (e) {
        console.error("Error updating booking", e);
        setError("Failed to update booking");
        showSnackbar("Error al actualizar la reserva", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [addTouristFromBooking, showSnackbar, transformApiBooking],
  );

  const cancelBooking = useCallback(
    async (
      bookingId: string,
      cancellationFee: number,
      refundAmount: number,
      refundedAt: Date,
    ): Promise<BookingType | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await cancelBookingRequest(
          bookingId,
          cancellationFee,
          refundAmount,
          refundedAt,
        );

        if (!response) {
          setError("Error canceling booking");
          showSnackbar("Error al cancelar la reserva", "error");
          return null;
        }

        const updated = transformApiBooking(response);

        setBookings((prev) =>
          prev.map((b) =>
            getBookingId(b) === getBookingId(response) ? updated : b,
          ),
        );

        showSnackbar("Reserva cancelada exitosamente", "success");
        return updated;
      } catch (e) {
        console.error("Error canceling booking", e);
        setError("Failed to cancel booking");
        showSnackbar("Error al cancelar la reserva", "error");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [showSnackbar, transformApiBooking],
  );

  // Ejemplo de derivado (opcional, estilo useMemo como en UserProvider)
  // const pendingBookings = useMemo(
  //   () => bookings.filter((b) => b.status === "pending"),
  //   [bookings],
  // );

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        fetchBookings,
        getBookingById,
        createBooking,
        updateBooking,
        cancelBooking,
        updateAttendance,
        addPaymentToBooking,
        setBookings,
        getTouristCounterByDateRangeId,
        getBookingsByDateRangeId,
        // si quieres exponer pendingBookings también, lo agregas al tipo y aquí:
        // pendingBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
