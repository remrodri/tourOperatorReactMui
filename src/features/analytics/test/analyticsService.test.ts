import AxiosMockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { axiosPrivate } from "../../../config/axiosConfig";
import {
  getAnalyticsDeparture,
  getAnalyticsDepartures,
  getAnalyticsEconomics,
  getAnalyticsErrorMessage,
  getAnalyticsFilterCatalog,
  getAnalyticsOverview,
  getAnalyticsPrediction,
  getAnalyticsPredictionMetrics,
  getAnalyticsSummary,
  getAnalyticsTrends,
} from "../service/analyticsService";
import type {
  AnalyticsApiEnvelope,
  AnalyticsFoundationData,
  AnalyticsMeta,
  AnalyticsOverview,
} from "../types/AnalyticsTypes";

const meta: AnalyticsMeta = {
  module: "analytics",
  contractVersion: "1.0.0",
  release: "t808-v1",
  status: "foundation",
  generatedAt: "2026-11-18T00:00:00.000Z",
  scope: "Base de contratos para analítica descriptiva y predictiva",
  period: { from: null, to: null },
  filters: {},
};

const foundationData: AnalyticsFoundationData = {
  filters: {},
  capabilities: {
    descriptive: {
      status: "planned",
      task: "T-809",
      description: "Pendiente de implementación.",
    },
    predictive: {
      status: "planned",
      task: "T-812",
      description: "Pendiente de implementación.",
    },
  },
  access: { roles: ["administrador", "operador de ventas"] },
  privacy: {
    dataOrigin: "simulated",
    aggregatesOnly: true,
    includesPii: false,
    calculationLayer: "backend",
  },
};

const warnings = ["Módulo base T-808."];

const envelope: AnalyticsApiEnvelope = {
  statusCode: 200,
  message: "Analytics foundation retrieved successfully",
  data: foundationData,
  meta,
  warnings,
};

const overview: AnalyticsOverview = {
  ...foundationData,
  metadata: meta,
  warnings,
};

let mock: AxiosMockAdapter;

describe("analytics service", () => {
  beforeEach(() => {
    mock = new AxiosMockAdapter(axiosPrivate);
  });

  afterEach(() => {
    mock.restore();
  });

  it("requests the analytics contract with only defined filters", async () => {
    mock.onGet("/analytics").reply(200, envelope);

    const result = await getAnalyticsOverview({
      from: "2026-01-01T00:00:00.000Z",
      tourPackageId: undefined,
    });

    expect(result).toEqual(overview);
    expect(mock.history.get[0].params).toEqual({
      from: "2026-01-01T00:00:00.000Z",
    });
  });

  it("deduplicates concurrent contract requests", async () => {
    mock.onGet("/analytics").reply(200, envelope);

    await Promise.all([getAnalyticsOverview(), getAnalyticsOverview()]);

    expect(mock.history.get).toHaveLength(1);
  });

  it("returns a controlled message for backend errors", async () => {
    expect.assertions(1);
    mock.onGet("/analytics").reply(403, {
      statusCode: 403,
      message: "No tienes permisos para acceder al módulo de analítica",
      data: null,
    });

    try {
      await getAnalyticsOverview();
    } catch (error) {
      expect(getAnalyticsErrorMessage(error)).toBe(
        "No tienes permisos para acceder al módulo de analítica",
      );
    }
  });

  it("uses the fallback for unknown errors", () => {
    expect(getAnalyticsErrorMessage(new Error("boom"))).toBe(
      "No se pudo cargar el módulo de analítica",
    );
  });

  it("uses typed descriptive routes and compacts their parameters", async () => {
    const summaryEnvelope = {
      statusCode: 200,
      message: "ok",
      data: { summary: { departures: 0 } },
      meta,
      warnings: [],
    };
    const departuresEnvelope = {
      statusCode: 200,
      message: "ok",
      data: { items: [], pagination: { limit: 20, hasMore: false, nextCursor: null } },
      meta,
      warnings: [],
    };
    mock.onGet("/analytics/summary").reply(200, summaryEnvelope);
    mock.onGet("/analytics/departures").reply(200, departuresEnvelope);
    mock.onGet("/analytics/departures/departure-1").reply(200, {
      ...departuresEnvelope,
      data: { departure: { id: "departure-1" } },
    });

    await getAnalyticsSummary({ from: "2026-01-01", destinationId: "" });
    await getAnalyticsDepartures({ limit: 25, cursor: undefined });
    await getAnalyticsDeparture("departure-1", { tourPackageId: "package-1" });

    expect(mock.history.get.map(({ url }) => url)).toEqual([
      "/analytics/summary",
      "/analytics/departures",
      "/analytics/departures/departure-1",
    ]);
    expect(mock.history.get[0].params).toEqual({ from: "2026-01-01" });
    expect(mock.history.get[1].params).toEqual({ limit: 25 });
    expect(mock.history.get[2].params).toEqual({ tourPackageId: "package-1" });
  });

  it("uses typed trends and predictive routes", async () => {
    mock.onGet("/analytics/trends").reply(200, {
      statusCode: 200,
      message: "ok",
      data: { state: "no-activity" },
      meta: { ...meta, granularity: "week", timeZone: "UTC", asOf: "2026-11-13" },
      warnings: [],
    });
    mock.onGet("/analytics/departures/departure-2/prediction").reply(200, {
      statusCode: 200,
      message: "ok",
      data: { state: "available", horizonDays: 14 },
      meta: { ...meta, status: "predictive" },
      warnings: [],
    });
    mock.onGet("/analytics/predictions/metrics").reply(200, {
      statusCode: 200,
      message: "ok",
      data: { state: "available", horizons: [] },
      meta: { ...meta, status: "predictive" },
      warnings: [],
    });

    await getAnalyticsTrends({
      dateRangeId: "departure-2",
      granularity: "week",
    });
    await getAnalyticsPrediction("departure-2", 14);
    await getAnalyticsPredictionMetrics();

    expect(mock.history.get[0].params).toEqual({
      dateRangeId: "departure-2",
      granularity: "week",
    });
    expect(mock.history.get[1].params).toEqual({ horizonDays: 14 });
    expect(mock.history.get[2].params).toEqual({});
  });

  it("requests the economic orientation for the selected horizon", async () => {
    mock.onGet("/analytics/departures/departure-2/economics").reply(200, {
      statusCode: 200,
      message: "ok",
      data: {
        departureId: "departure-2",
        predictionHorizonDays: 30,
        status: "below-break-even",
      },
      meta: {
        ...meta,
        contractVersion: "1.5.0",
        release: "t1206-v1",
        status: "economic",
        dataOrigin: "simulated",
      },
      warnings: [],
    });

    const result = await getAnalyticsEconomics("departure-2", 30);

    expect(mock.history.get[0].params).toEqual({ horizonDays: 30 });
    expect(result.data.departureId).toBe("departure-2");
  });

  it("builds complete filter options across departure pages", async () => {
    mock.onGet("/analytics/departures").reply((config) => {
      const secondPage = config.params?.cursor === "next-page";
      return [
        200,
        {
          statusCode: 200,
          message: "ok",
          data: {
            items: [
              {
                id: secondPage ? "departure-2" : "departure-1",
                startDate: secondPage ? "2026-12-01" : "2026-11-01",
                tourPackage: {
                  id: secondPage ? "package-2" : "package-1",
                  name: secondPage ? "Potosí" : "Uyuni",
                },
                destination: {
                  id: secondPage ? "destination-2" : "destination-1",
                  name: secondPage ? "Potosí" : "Salar de Uyuni",
                },
              },
            ],
            pagination: {
              limit: 100,
              hasMore: !secondPage,
              nextCursor: secondPage ? null : "next-page",
            },
          },
          meta,
          warnings: [],
        },
      ];
    });

    const catalog = await getAnalyticsFilterCatalog();

    expect(mock.history.get).toHaveLength(2);
    expect(mock.history.get[1].params).toEqual({
      limit: 100,
      cursor: "next-page",
    });
    expect(catalog.departures.map(({ id }) => id)).toEqual([
      "departure-1",
      "departure-2",
    ]);
    expect(catalog.packages.map(({ name }) => name)).toEqual(["Potosí", "Uyuni"]);
    expect(catalog.destinations).toHaveLength(2);
  });
});
