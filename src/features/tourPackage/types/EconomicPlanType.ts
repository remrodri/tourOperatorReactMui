export type EconomicPlanSource = "manual" | "simulated";

export interface EconomicFixedCosts {
  transportation: number;
  guide: number;
  administration: number;
  fixedLodging: number;
  other: number;
}

export interface EconomicVariableCostsPerTourist {
  food: number;
  tickets: number;
  lodging: number;
  insurance: number;
  other: number;
}

/**
 * Snapshot returned by the backend (T-1202). Dates arrive as ISO strings.
 */
export interface EconomicPlanType {
  currency: "BOB";
  fixedCosts: EconomicFixedCosts;
  variableCostsPerTourist: EconomicVariableCostsPerTourist;
  pricePerTourist: number;
  operationalMinimum?: number;
  planningStartedAt: string;
  decisionDeadline: string;
  source: EconomicPlanSource;
  version: string;
  updatedAt: string;
}

/**
 * Payload sent to the backend. Currency, version and updatedAt are assigned by
 * the server, so they are intentionally omitted here.
 */
export interface EconomicPlanPayload {
  fixedCosts: EconomicFixedCosts;
  variableCostsPerTourist: EconomicVariableCostsPerTourist;
  pricePerTourist: number;
  operationalMinimum?: number;
  planningStartedAt: string;
  decisionDeadline: string;
  source?: EconomicPlanSource;
}

export type EconomicEvaluationStatus =
  | "available"
  | "economic-data-missing"
  | "non-positive-contribution"
  | "capacity-insufficient";

export interface EconomicEvaluationType {
  status: EconomicEvaluationStatus;
  fixedCostsTotal: number | null;
  variableCostPerTourist: number | null;
  contributionMarginPerTourist: number | null;
  economicMinimum: number | null;
  operationalMinimum: number | null;
  finalMinimum: number | null;
}
