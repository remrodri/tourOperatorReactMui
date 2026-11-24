import type {
  EconomicEvaluationType,
  EconomicPlanPayload,
  EconomicPlanType,
} from "./EconomicPlanType";

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
  economicPlan?: EconomicPlanType;
  economicEvaluation?: EconomicEvaluationType;
  createdAt?: string;
  updatedAt?: string;
}

export type DateRangeWritePayload = Omit<
  DateRangeType,
  "economicPlan" | "economicEvaluation"
> & {
  economicPlan?: EconomicPlanPayload;
};
