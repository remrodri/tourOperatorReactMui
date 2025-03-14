import { ActivityType } from './ActivityType';

export interface DayItineraryType {
  dayNumber: number;
  activities: ActivityType[];
}

export interface TourItineraryType {
  days: DayItineraryType[];
}

