import type { BookingStatus } from "./BookingType";

const CANONICAL_BOOKING_STATUSES: readonly BookingStatus[] = [
  "pending",
  "confirmed",
  "cancelled",
  "completed",
];

export const normalizeBookingStatus = (status: unknown): BookingStatus => {
  if (status === "paid") {
    return "confirmed";
  }

  if (
    typeof status === "string" &&
    CANONICAL_BOOKING_STATUSES.includes(status as BookingStatus)
  ) {
    return status as BookingStatus;
  }

  return "pending";
};
