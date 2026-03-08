/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";

import { jwtDecode } from "jwt-decode";
import { v4 as uuidv4 } from "uuid";

import { TokenService } from "../../../utils/tokenService";
import { useTouristContext } from "../../tourist/context/TouristContext";

import type { UserType } from "../../userManagement/types/UserType";
import type { BookingType } from "../types/BookingType";
import type { TouristType } from "../types/TouristType";
import type { PaymentType } from "../types/PaymentType";
// import type { UpdateBookingType } from "../types/UpdateBookingType";
import type { BookingFormValues } from "../components/bookingForm/BookingFormContainer";
import type { Group } from "../../guide/context/GuideContext";

import {
  cancelBookingRequest,
  createBookingRequest,
  getAllBookingsRequest,
  updateAttendanceRequest,
  // updateBookingRequest,
} from "../service/bookingService";

/* ============================
   Types
============================ */
interface BookingContextType {
  bookings: BookingType[];
  loading: boolean;
  error: string | null;

  fetchBookings: () => void;
  getBookingById: (id: string) => BookingType | null;

  createBooking: (
    booking: BookingFormValues,
    touristsBySearch: TouristType[],
  ) => Promise<BookingType | null>;

  // updateBooking: (booking: any) => Promise<BookingType | null>;

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

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error(
      "useBookingContext debe ser usado dentro de BookingProvider",
    );
  }
  return ctx;
};

/* ============================
   Helpers
============================ */
const getBookingId = (b: any) => b?.id ?? b?._id;

/** ✅ FILTRO REAL DE TURISTAS VÁLIDOS */
const isValidTourist = (t?: Partial<TouristType> | null): t is TouristType => {
  if (!t) return false;

  return Boolean(
    t.firstName?.trim() ||
    t.lastName?.trim() ||
    t.ci?.trim() ||
    t.passportNumber?.trim(),
  );
};

type AttendanceItem = {
  touristId: string;
  status: "present" | "absent";
};

const toAttendance = (group: any[]): AttendanceItem[] =>
  (group ?? [])
    .map((t) => ({
      touristId: t.touristId ?? t.id ?? t._id,
      status: t.status,
    }))
    .filter(
      (x) =>
        Boolean(x.touristId) &&
        (x.status === "present" || x.status === "absent"),
    );

/* ============================
   Provider
============================ */
export const BookingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { addTouristFromBooking } = useTouristContext();

  /* ============================
     Transform
  ============================ */
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

  /* ============================
     Fetch
  ============================ */
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllBookingsRequest();
      if (!response) {
        setBookings([]);
        setError("No se pudieron cargar las reservas");
        return;
      }

      setBookings(response.map(transformApiBooking));
      setError(null);
    } catch (e) {
      console.error(e);
      setError("Error al cargar reservas");
    } finally {
      setLoading(false);
    }
  }, [transformApiBooking]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  /* ============================
     Selectors
  ============================ */
  const getBookingById = useCallback(
    (id: string): BookingType | null =>
      bookings.find((b) => getBookingId(b) === id) ?? null,
    [bookings],
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
    (dateRangeId: string): number =>
      bookings.reduce(
        (count, b) =>
          b.dateRangeId === dateRangeId
            ? count + (b.touristIds?.length ?? 0)
            : count,
        0,
      ),
    [bookings],
  );

  /* ============================
     Payments
  ============================ */
  const addPaymentToBooking = useCallback((payment: PaymentType) => {
    setBookings((prev) =>
      prev.map((b) =>
        getBookingId(b) === payment.bookingId
          ? {
              ...b,
              payments: b.payments?.some((p) => p.id === payment.id)
                ? b.payments
                : [...(b.payments || []), payment],
            }
          : b,
      ),
    );
  }, []);

  /* ============================
     Attendance
  ============================ */
  const updateAttendance = useCallback(
    async (data: any): Promise<Group[] | null> => {
      setLoading(true);
      try {
        const attendanceList = await updateAttendanceRequest(data);
        if (!attendanceList) return null;

        setBookings((prev) =>
          prev.map((b) => {
            const found = attendanceList.find(
              (x: Group) => x.bookingId === getBookingId(b),
            );
            return found
              ? { ...b, attendance: toAttendance(found.group as any[]) }
              : b;
          }),
        );

        return attendanceList;
      } catch (e) {
        console.error(e);
        setError("Error al actualizar asistencia");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  /* ============================
     Create Booking (FIX CLAVE)
  ============================ */
  const createBooking = useCallback(
    async (
      booking: BookingFormValues,
      touristsBySearch: TouristType[],
    ): Promise<BookingType | null> => {
      setLoading(true);
      setError(null);

      const token = TokenService.getToken();
      if (!token) {
        setError("No hay token");
        setLoading(false);
        return null;
      }

      const seller = jwtDecode<UserType>(token);

      /** ✅ CONSTRUCCIÓN SEGURA */
      const tourists: TouristType[] = [
        booking.mainTourist,
        ...(booking.additionalTourists ?? []),
        ...(touristsBySearch ?? []),
      ].filter(isValidTourist);

      if (tourists.length === 0) {
        setError("La reserva debe tener al menos un turista válido");
        setLoading(false);
        return null;
      }

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

      if (booking.firstPayment?.paymentProofImage) {
        formData.append(
          "paymentProofImage",
          booking.firstPayment.paymentProofImage,
        );
      }

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
        if (!response) return null;

        // ✅ agregar turistas reales
        response.tourists.forEach(addTouristFromBooking);

        // ✅ construir booking usando touristIds reales
        const newBooking = transformApiBooking({
          ...response,
          touristIds: response.tourists.map((t) => t.id),
        });

        setBookings((prev) => [...prev, newBooking]);
        return newBooking;
      } catch (e) {
        console.error(e);
        setError("Error al crear la reserva");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [addTouristFromBooking, transformApiBooking],
  );

  /* ============================
     Update / Cancel
  ============================ */
  // const updateBooking = useCallback(
  //   async (booking: any): Promise<BookingType | null> => {
  //     setLoading(true);
  //     try {
  //       const tourists = [
  //         booking.mainTourist,
  //         ...(booking.additionalTourists ?? []),
  //       ].filter(isValidTourist);

  //       const bookingToUpdate: UpdateBookingType = {
  //         totalPrice: booking.totalPrice,
  //         notes: booking.notes,
  //         status: booking.status ?? "pending",
  //         tourists,
  //       };

  //       const response = await updateBookingRequest(
  //         getBookingId(booking),
  //         bookingToUpdate,
  //       );

  //       if (!response) return null;

  //       const updated = transformApiBooking({
  //         ...response,
  //         touristIds:
  //           response.tourists
  //             ?.filter(isValidTourist)
  //             .map((t: any) => addTouristFromBooking(t).id) ?? [],
  //       });

  //       setBookings((prev) =>
  //         prev.map((b) => (getBookingId(b) === updated.id ? updated : b)),
  //       );

  //       return updated;
  //     } catch (e) {
  //       console.error(e);
  //       setError("Error al actualizar la reserva");
  //       return null;
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [addTouristFromBooking, transformApiBooking],
  // );

  const cancelBooking = useCallback(
    async (
      bookingId: string,
      cancellationFee: number,
      refundAmount: number,
      refundedAt: Date,
    ): Promise<BookingType | null> => {
      setLoading(true);
      try {
        const response = await cancelBookingRequest(
          bookingId,
          cancellationFee,
          refundAmount,
          refundedAt,
        );

        if (!response) return null;

        const updated = transformApiBooking(response);

        setBookings((prev) =>
          prev.map((b) => (getBookingId(b) === updated.id ? updated : b)),
        );

        return updated;
      } catch (e) {
        console.error(e);
        setError("Error al cancelar la reserva");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [transformApiBooking],
  );

  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        error,
        fetchBookings,
        getBookingById,
        createBooking,
        // updateBooking,
        cancelBooking,
        updateAttendance,
        addPaymentToBooking,
        setBookings,
        getTouristCounterByDateRangeId,
        getBookingsByDateRangeId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
