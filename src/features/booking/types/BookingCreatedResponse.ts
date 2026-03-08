import { PaymentType } from "./PaymentType";
import { TouristType } from "./TouristType";

export interface BookingCreatedResponse {
  id: string;
  tourists: TouristType[];
  payments: PaymentType[];
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  status: "pending" | "paid" | "cancelled" | "completed";
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
