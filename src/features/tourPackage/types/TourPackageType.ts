import { ActivityType } from "./ActivityType";
import { TourItineraryType } from "./DayItineraryType";
import { DateRangeType} from "./DateRangeType";

export interface TourPackageType {
  id: string;
  name: string;
  tourType: string;
  cancellationPolicy: string;
  touristDestination: string;
  duration: number;
  // selectedDates: string[];
  dateRanges: DateRangeType[];
  // dateRanges: string[];
  // blockedDates: string[];
  price: number;
  /** @deprecated Use itinerary field instead which organizes activities by day */
  activities: ActivityType[];
  itinerary: TourItineraryType;
  status:string
}
