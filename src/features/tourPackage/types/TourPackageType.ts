import { ActivityType } from "./ActivityType";
import { TourItineraryType } from "./DayItineraryType";

export interface TourPackageType {
  id: string;
  name: string;
  tourType: string;
  cancellationPolicy: string;
  touristDestination: string;
  duration: number;
  selectedDates: string[];
  // blockedDates: string[];
  price: number;
  /** @deprecated Use itinerary field instead which organizes activities by day */
  activities: ActivityType[];
  itinerary: TourItineraryType;
}
