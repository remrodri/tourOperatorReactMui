import { DateRangeType } from "./DateRangeType";
import { TourItineraryType } from "./DayItineraryType";

export interface TourPackageFormValues {
  id?: string;
  name: string;
  tourType: string;
  touristDestination: string;
  duration: number | ""; // permitimos "" mientras el usuario borra
  dateRanges: DateRangeType[];
  price: number | ""; // idem
  itinerary: TourItineraryType | null;
}
