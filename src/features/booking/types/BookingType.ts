import { PaymentInfoType } from "./PaymentInfoType";
import { TouristType } from "./TouristType";

export interface BookingType {
  id?: string;
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  mainTouristId?: string;
  mainTourist?: TouristType;
  additionalTouristIds?: string[];
  additionalTourists?: TouristType[];
  totalPrice: number;
  paymentIds: string[];
  payments: PaymentInfoType[];
  notes?: string;
  status: "pending" | "paid" | "cancelled" | "completed";
}
