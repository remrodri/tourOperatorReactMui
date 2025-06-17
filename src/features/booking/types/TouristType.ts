export interface TouristType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ci?: string;
  nationality: string;
  dateOfBirth: string;
  passportNumber?: string;
  documentType: string;
  bookingIds?:string[]
}
