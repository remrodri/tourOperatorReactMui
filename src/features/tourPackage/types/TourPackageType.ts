import { ActivityType } from "./ActivityType";

export interface TourPackageType {
  id: string;
  name: string;
  tourType: string;
  cancellationPolicy: string;
  touristDestination: string;
  duration: number;
  selectedDates: string[];
  blockedDates: string[];
  price: number;
  activities: ActivityType[];
}
