import { TouristType } from "./TouristType";
export interface UpdateBookingType{
    tourists:TouristType[];
    totalPrice:number;
    notes:string;
    status:string;
}