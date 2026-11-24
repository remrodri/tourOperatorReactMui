export interface AnalyticsFilters {
  from?: string;
  to?: string;
  tourPackageId?: string;
  destinationId?: string;
  dateRangeId?: string;
}

export interface AnalyticsDeparturesQuery extends AnalyticsFilters {
  limit?: number;
  cursor?: string;
}

export type AnalyticsTrendGranularity = "day" | "week" | "month";

export interface AnalyticsTrendsQuery {
  dateRangeId: string;
  from?: string;
  to?: string;
  granularity?: AnalyticsTrendGranularity;
  tourPackageId?: string;
  destinationId?: string;
}

export type AnalyticsPredictionHorizon = 7 | 14 | 30;
export type AnalyticsAllowedRole = "administrador" | "operador de ventas";

export interface AnalyticsCapability {
  status: "planned";
  task: string;
  description: string;
}

export interface AnalyticsModuleMetadata {
  module: "analytics";
  contractVersion: string;
  release: string;
  status: "foundation" | "descriptive" | "predictive" | "economic";
  generatedAt: string;
  scope?: string;
}

export interface AnalyticsMeta extends AnalyticsModuleMetadata {
  period: { from: string | null; to: string | null };
  filters: AnalyticsFilters;
  dataOrigin?: "simulated";
}

export interface AnalyticsApiEnvelope<
  TData = AnalyticsFoundationData,
  TMeta = AnalyticsMeta,
> {
  statusCode: number;
  message: string;
  data: TData;
  meta: TMeta;
  warnings: string[];
}

export interface AnalyticsResource<TData, TMeta> {
  data: TData;
  metadata: TMeta;
  warnings: string[];
}

export interface AnalyticsFoundationData {
  filters: AnalyticsFilters;
  capabilities: {
    descriptive: AnalyticsCapability;
    predictive: AnalyticsCapability;
  };
  access: { roles: AnalyticsAllowedRole[] };
  privacy: {
    dataOrigin: "simulated";
    aggregatesOnly: true;
    includesPii: false;
    calculationLayer: "backend";
  };
}

export type AnalyticsFoundationEnvelope = AnalyticsApiEnvelope<AnalyticsFoundationData, AnalyticsMeta>;
export type AnalyticsOverview = AnalyticsFoundationData & {
  metadata: AnalyticsMeta;
  warnings: string[];
};

export type AnalyticsCapacityStatus = "valid" | "invalid" | "overcapacity";
export type AnalyticsSummaryCapacityStatus = "valid" | "invalid" | "partial" | "no-data";
export type AnalyticsAverageGroupSizeStatus = "available" | "no-bookings";
export type AnalyticsPendingBalanceStatus = "pending" | "settled" | "overpaid" | "no-bookings";

export interface AnalyticsSummary {
  departures: number;
  tourists: number;
  bookings: number;
  averageGroupSize: number | null;
  averageGroupSizeStatus: AnalyticsAverageGroupSizeStatus;
  reservedRevenue: number;
  registeredPayments: number;
  pendingBalance: number;
  pendingBalanceStatus: AnalyticsPendingBalanceStatus;
  capacity: number | null;
  availableSlots: number | null;
  occupancy: number | null;
  capacityStatus: AnalyticsSummaryCapacityStatus;
  invalidCapacityDepartures: number;
  overcapacityDepartures: number;
  overpaidDepartures: number;
}

export interface AnalyticsDepartureReference {
  id: string;
  name: string | null;
}

export interface AnalyticsDeparture {
  id: string;
  startDate: string | null;
  endDate: string | null;
  state: string | null;
  dataOrigin: string | null;
  tourPackage: AnalyticsDepartureReference | null;
  destination: AnalyticsDepartureReference | null;
  capacity: number | null;
  tourists: number;
  bookings: number;
  averageGroupSize: number | null;
  averageGroupSizeStatus: AnalyticsAverageGroupSizeStatus;
  reservedRevenue: number;
  registeredPayments: number;
  pendingBalance: number;
  pendingBalanceStatus: AnalyticsPendingBalanceStatus;
  availableSlots: number | null;
  occupancy: number | null;
  capacityStatus: AnalyticsCapacityStatus;
}

export interface AnalyticsDeparturePagination {
  limit: number;
  hasMore: boolean;
  nextCursor: string | null;
}

export interface AnalyticsFilterCatalog {
  packages: AnalyticsDepartureReference[];
  destinations: AnalyticsDepartureReference[];
  departures: Array<
    Pick<
      AnalyticsDeparture,
      "id" | "startDate" | "tourPackage" | "destination"
    >
  >;
}

export type AnalyticsSummaryResource = AnalyticsResource<{ summary: AnalyticsSummary }, AnalyticsMeta>;
export type AnalyticsDeparturesResource = AnalyticsResource<{
  items: AnalyticsDeparture[];
  pagination: AnalyticsDeparturePagination;
}, AnalyticsMeta>;
export type AnalyticsDepartureResource = AnalyticsResource<{ departure: AnalyticsDeparture }, AnalyticsMeta>;

export type AnalyticsTrendState = "available" | "insufficient-history" | "no-activity";
export type AnalyticsTrendWindowStatus = "open" | "closed" | "indeterminate";

export interface AnalyticsTrendPoint {
  intervalStart: string;
  intervalEnd: string;
  complete: boolean;
  observedDays: number;
  bookings: number;
  tourists: number;
  reservedRevenue: number;
  cumulativeBookings: number;
  cumulativeTourists: number;
  cumulativeReservedRevenue: number;
  touristsPerDay: number;
}

export interface AnalyticsTrendData {
  departure: Pick<AnalyticsDeparture, "id" | "startDate" | "endDate" | "state" | "dataOrigin" | "capacity" | "tourPackage" | "destination">;
  state: AnalyticsTrendState;
  totals: { bookings: number; tourists: number; reservedRevenue: number; eventDays: number };
  series: { granularity: AnalyticsTrendGranularity; timeZone: "UTC"; points: AnalyticsTrendPoint[] };
  rhythm: {
    window: { from: string; to: string; observedDays: number; status: AnalyticsTrendWindowStatus };
    bookingsPerDay: number;
    touristsPerDay: number;
  };
}

export interface AnalyticsTrendsMeta extends AnalyticsMeta {
  granularity: AnalyticsTrendGranularity;
  timeZone: "UTC";
  asOf: string;
  observation: {
    eventField: "booking.createdAt";
    fromInclusive: true;
    toInclusive: true;
    granularity: AnalyticsTrendGranularity;
    timeZone: "UTC";
    maxPoints: number;
    defaultWindowDays: number;
    maxDefaultWindowDays: number;
    asOfRule: "booking.createdAt <= asOf";
    cumulativeScope: "observation-window";
  };
}

export type AnalyticsTrendsResource = AnalyticsResource<AnalyticsTrendData, AnalyticsTrendsMeta>;

export type AnalyticsPredictor = "baseline-accumulated" | "baseline-historical-remaining" | "ridge" | "regression-tree";
export type AnalyticsPredictionState = "available" | "no-data" | "insufficient-history" | "invalid-capacity" | "stale-model";

export interface AnalyticsPredictiveMetrics {
  count: number;
  mae: number;
  rmse: number;
  wape: number | null;
  actualTotal: number;
  predictedTotal: number;
}

export interface AnalyticsPredictionData {
  state: AnalyticsPredictionState;
  departureId: string;
  cutoffDate: string | null;
  cutoffAt: string | null;
  horizonDays: AnalyticsPredictionHorizon;
  confirmedTourists: number | null;
  predictedFinalTourists: number | null;
  predictionRange: { lower: number; upper: number; method: "test-mae-band" } | null;
  capacity: number | null;
  expectedOccupancy: number | null;
  predictor: AnalyticsPredictor | null;
  modelVersion: string;
  datasetVersion: string;
  datasetHash: string;
  runHash: string;
  metrics: AnalyticsPredictiveMetrics | null;
  dataOrigin: "simulated";
  departureDataOrigin: string | null;
}

export interface AnalyticsPredictiveMeta extends AnalyticsModuleMetadata {
  status: "predictive";
  dataOrigin: "simulated";
  asOf: string;
  modelGeneratedAt: string;
  staleAfterDays: number;
}

export type AnalyticsPredictionResource = AnalyticsResource<AnalyticsPredictionData, AnalyticsPredictiveMeta>;

export type AnalyticsEconomicStatus =
  | "economic-data-missing"
  | "non-positive-contribution"
  | "capacity-insufficient"
  | "below-break-even"
  | "expected-viable"
  | "break-even-reached";

export type AnalyticsEconomicUrgency =
  | "not-applicable"
  | "achieved"
  | "monitor"
  | "commercial-action"
  | "priority-action"
  | "decision-required";

export interface AnalyticsEconomicRecommendation {
  urgency: AnalyticsEconomicUrgency;
  asOf: string;
  planningStartedAt: string | null;
  decisionDeadline: string | null;
  timeFractionRemaining: number | null;
  title: string;
  explanation: string;
  actionsToEvaluate: string[];
  automaticDecision: false;
  thresholds: { monitor: number; priority: number };
}

export interface AnalyticsEconomicData {
  departureId: string;
  predictionState: AnalyticsPredictionState;
  predictionHorizonDays: AnalyticsPredictionHorizon;
  status: AnalyticsEconomicStatus;
  currency: "BOB" | null;
  confirmedTourists: number;
  predictedFinalTourists: number | null;
  fixedCostsTotal: number | null;
  variableCostPerTourist: number | null;
  contributionMarginPerTourist: number | null;
  economicMinimum: number | null;
  operationalMinimum: number | null;
  finalMinimum: number | null;
  missingConfirmedTourists: number | null;
  confirmedResult: number | null;
  estimatedResult: number | null;
  predictionUsed: boolean;
  recommendation: AnalyticsEconomicRecommendation;
}

export interface AnalyticsEconomicMeta extends AnalyticsModuleMetadata {
  status: "economic";
  dataOrigin: "simulated";
}

export type AnalyticsEconomicResource = AnalyticsResource<
  AnalyticsEconomicData,
  AnalyticsEconomicMeta
>;

export interface AnalyticsPredictionMetricItem {
  horizonDays: AnalyticsPredictionHorizon;
  recommendedPredictor: AnalyticsPredictor;
  recommendationReason: string;
  validation: AnalyticsPredictiveMetrics;
  test: AnalyticsPredictiveMetrics;
  candidate: {
    model: "ridge" | "regression-tree";
    configuration: Record<string, number>;
    validation: AnalyticsPredictiveMetrics;
    test: AnalyticsPredictiveMetrics;
    stableImprovement: boolean;
  };
  baselines: {
    accumulated: { validation: AnalyticsPredictiveMetrics; test: AnalyticsPredictiveMetrics };
    historicalRemaining: { validation: AnalyticsPredictiveMetrics; test: AnalyticsPredictiveMetrics };
  };
}

export interface AnalyticsPredictionMetricsData {
  state: "available" | "stale-model";
  modelVersion: string;
  datasetVersion: string;
  datasetHash: string;
  runHash: string;
  selectionMetric: "mae";
  secondaryMetrics: ["rmse", "wape"];
  horizons: AnalyticsPredictionMetricItem[];
}

export type AnalyticsPredictionMetricsResource = AnalyticsResource<AnalyticsPredictionMetricsData, AnalyticsPredictiveMeta>;

export interface AnalyticsResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
