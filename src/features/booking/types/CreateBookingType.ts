import { PaymentInfoType } from "./PaymentInfoType";
import { TouristType } from "./TouristType";

export interface CreateBookingType {
  tourPackageId: string;
  dateRangeId: string;
  sellerId: string;
  mainTourist: TouristType;
  additionalTourists: TouristType[];
  totalPrice: number;
  payments: PaymentInfoType[];
  notes: string;
  status: "pending" | "paid" | "cancelled" | "completed";    
}
