import { PaymentType } from "./PaymentType";
import { TouristType } from "./TouristType";
export interface CreateBookingType{
    tourPackageId:string;
    dateRangeId:string;
    tourists:TouristType[];
    firstPayment:PaymentType;
    notes:string;
    totalPrice:number;
    sellerId:string;
    paymentProofFolder:string;
    status:string;
}
