import { PaymentType } from "./PaymentType";
import { TouristType } from "./TouristType";
import type { BookingStatus } from "./BookingType";

export interface BookingCreatedResponse {
  id: string;
  tourists: TouristType[];
  payments: PaymentType[];
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  status: BookingStatus;
  totalPrice: number;
  notes: string;
  paymentProofFolder: string;
  attendance: {
    touristId: string;
    status: "present" | "absent";
  }[];
  cancellationFee?: number;
  refundAmount?: number;
  refundedAt?: Date;
  bookingCode: string;
}
