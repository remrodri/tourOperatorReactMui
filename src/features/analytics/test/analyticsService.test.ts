import AxiosMockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { axiosPrivate } from "../../../config/axiosConfig";
import {
  getAnalyticsErrorMessage,
  getAnalyticsOverview,
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
});
