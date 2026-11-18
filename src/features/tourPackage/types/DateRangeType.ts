export type DateRangeDataOrigin = "legacy" | "simulated" | "manual";

export interface DateRangeType {
  id?: string;
  state?: string;
  dates?: string[];
  guides?: string[];
  tourPackageId?: string;
  startDate?: string;
  endDate?: string;
  capacity?: number;
  dataOrigin?: DateRangeDataOrigin;
  createdAt?: string;
  updatedAt?: string;
}
