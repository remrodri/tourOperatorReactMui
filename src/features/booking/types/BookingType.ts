import { PaymentType } from "./PaymentType";
import { TouristType } from "./TouristType";

export interface BookingType {
  id?: string;
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  touristIds:string[];
  totalPrice: number;
  // paymentIds: string[];
  payments:PaymentType[];
  notes: string;
  status: "pending" | "paid" | "cancelled" | "completed";
  paymentProofFolder:string;
  createdAt: string;
}
