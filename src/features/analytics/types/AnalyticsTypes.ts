export interface AnalyticsFilters {
  from?: string;
  to?: string;
  tourPackageId?: string;
  destinationId?: string;
  dateRangeId?: string;
}

export interface AnalyticsCapability {
  status: "planned";
  task: string;
  description: string;
}

export interface AnalyticsModuleMetadata {
  module: "analytics";
  contractVersion: string;
  release: string;
  status: "foundation";
  generatedAt: string;
  scope: string;
}

export interface AnalyticsMeta extends AnalyticsModuleMetadata {
  period: {
    from: string | null;
    to: string | null;
  };
  filters: AnalyticsFilters;
}

export type AnalyticsAllowedRole = "administrador" | "operador de ventas";

export interface AnalyticsFoundationData {
  filters: AnalyticsFilters;
  capabilities: {
    descriptive: AnalyticsCapability;
    predictive: AnalyticsCapability;
  };
  access: {
    roles: AnalyticsAllowedRole[];
  };
  privacy: {
    dataOrigin: "simulated";
    aggregatesOnly: true;
    includesPii: false;
    calculationLayer: "backend";
  };
}

export interface AnalyticsApiEnvelope {
  statusCode: number;
  message: string;
  data: AnalyticsFoundationData;
  meta: AnalyticsMeta;
  warnings: string[];
}

export interface AnalyticsOverview extends AnalyticsFoundationData {
  metadata: AnalyticsMeta;
  warnings: string[];
}
