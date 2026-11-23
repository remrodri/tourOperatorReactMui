import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsProvider, useAnalytics } from "../context/AnalyticsContext";
import * as analyticsService from "../service/analyticsService";
import type {
  AnalyticsOverview,
  AnalyticsSummaryResource,
} from "../types/AnalyticsTypes";

vi.mock("../service/analyticsService");

const overview: AnalyticsOverview = {
  filters: {},
  capabilities: {
    descriptive: { status: "planned", task: "T-809", description: "ok" },
    predictive: { status: "planned", task: "T-812", description: "ok" },
  },
  access: { roles: ["administrador", "operador de ventas"] },
  privacy: {
    dataOrigin: "simulated",
    aggregatesOnly: true,
    includesPii: false,
    calculationLayer: "backend",
  },
  metadata: {
    module: "analytics",
    contractVersion: "1.0.0",
    release: "t808-v1",
    status: "foundation",
    generatedAt: "2026-11-23T00:00:00.000Z",
    scope: "foundation",
    period: { from: null, to: null },
    filters: {},
  },
  warnings: [],
};

const summaryResource = (tourists: number): AnalyticsSummaryResource => ({
  data: {
    summary: {
      departures: 1,
      tourists,
      bookings: 1,
      averageGroupSize: tourists,
      averageGroupSizeStatus: "available",
      reservedRevenue: 100,
      registeredPayments: 80,
      pendingBalance: 20,
      pendingBalanceStatus: "pending",
      capacity: 10,
      availableSlots: 10 - tourists,
      occupancy: tourists * 10,
      capacityStatus: "valid",
      invalidCapacityDepartures: 0,
      overcapacityDepartures: 0,
      overpaidDepartures: 0,
    },
  },
  metadata: overview.metadata,
  warnings: [],
});

const deferred = <T,>() => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <AnalyticsProvider>{children}</AnalyticsProvider>
);

describe("AnalyticsContext", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(analyticsService.getAnalyticsOverview).mockResolvedValue(overview);
    vi.mocked(analyticsService.getAnalyticsErrorMessage).mockImplementation(
      (error, fallback = "fallback") =>
        error instanceof Error ? error.message : fallback,
    );
  });

  it("stores a typed summary and its loading state", async () => {
    vi.mocked(analyticsService.getAnalyticsSummary).mockResolvedValue(
      summaryResource(4),
    );
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    await waitFor(() => expect(result.current.overview).toEqual(overview));

    await act(async () => {
      await result.current.fetchSummary({ destinationId: "destination-1" });
    });

    expect(result.current.summary).toEqual({
      data: summaryResource(4),
      loading: false,
      error: null,
    });
  });

  it("keeps the newest summary when responses arrive out of order", async () => {
    const first = deferred<AnalyticsSummaryResource>();
    const second = deferred<AnalyticsSummaryResource>();
    vi.mocked(analyticsService.getAnalyticsSummary)
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise);
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    await waitFor(() => expect(result.current.overview).toEqual(overview));

    act(() => {
      void result.current.fetchSummary({ dateRangeId: "old" });
      void result.current.fetchSummary({ dateRangeId: "new" });
    });
    await act(async () => second.resolve(summaryResource(8)));
    await waitFor(() =>
      expect(result.current.summary.data?.data.summary.tourists).toBe(8),
    );
    await act(async () => first.resolve(summaryResource(2)));

    expect(result.current.summary.data?.data.summary.tourists).toBe(8);
    expect(result.current.summary.loading).toBe(false);
  });

  it("exposes a controlled error without discarding prior data", async () => {
    vi.mocked(analyticsService.getAnalyticsSummary)
      .mockResolvedValueOnce(summaryResource(5))
      .mockRejectedValueOnce(new Error("Resumen no disponible"));
    const { result } = renderHook(() => useAnalytics(), { wrapper });
    await waitFor(() => expect(result.current.overview).toEqual(overview));

    await act(async () => result.current.fetchSummary());
    await act(async () => result.current.fetchSummary());

    expect(result.current.summary.data?.data.summary.tourists).toBe(5);
    expect(result.current.summary.error).toBe("Resumen no disponible");
    expect(result.current.summary.loading).toBe(false);
  });
});
