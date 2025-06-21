// import { BookingType } from "../../features/booking/types/BookingType";
// import { PaymentType } from "../../features/booking/types/PaymentType";


// // Agrega un nuevo pago a una reserva
// export const addPaymentToBookingHelper = (
//   bookings: BookingType[],
//   payment: PaymentType
// ): BookingType[] => {
//   return bookings.map((booking) => {
//     if (booking.id === payment.bookingId) {
//       return {
//         ...booking,
//         paymentIds: [...booking.paymentIds, payment.id!],
//       };
//     }
//     return booking;
//   });
// };

// // Transformar una reserva recibida del backend
// export const transformApiBooking = (apiBooking: any): BookingType => {
//   return {
//     id: apiBooking.id,
//     tourPackageId: apiBooking.tourPackageId,
//     dateRangeId: apiBooking.dateRangeId,
//     sellerId: apiBooking.sellerId,
//     touristIds: apiBooking.touristIds,
//     totalPrice: apiBooking.totalPrice,
//     paymentIds: apiBooking.paymentIds,
//     notes: apiBooking.notes,
//     status: apiBooking.status,
//     paymentProofFolder: apiBooking.paymentProofFolder,
//   };
// };
