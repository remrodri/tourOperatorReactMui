export interface TouristType {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ci?: string;
  // address?: string
  nationality: string;
  dateOfBirth?: string;
  // passportNumber?: string;
  // healthIssues?: string;
  additionalInformation?:string;
}
