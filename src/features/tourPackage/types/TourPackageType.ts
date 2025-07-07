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
  // dateRanges: DateRangeType[];
  dateRanges: {id:string}[];
  price: number;
  activities: ActivityType[];
  itinerary: TourItineraryType;
  status:string
}
