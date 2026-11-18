// import { PaymentType } from "./PaymentType";

import { PaymentType } from "./PaymentType";

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface BookingType {
  id: string;

  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;

  touristIds: string[];

  totalPrice: number;

  payments?: PaymentType[];

  notes: string;

  status: BookingStatus;

  paymentProofFolder: string;

  createdAt: string;

  attendance?: {
    touristId: string;
    status: "present" | "absent";
  }[];

  cancellationFee?: number;
  refundAmount?: number;
  refundedAt?: Date;

  bookingCode?: string;
}
