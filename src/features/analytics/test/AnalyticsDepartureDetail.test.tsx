import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AnalyticsDepartureDetail from "../components/AnalyticsDepartureDetail";
import {
  type AnalyticsContextType,
  useAnalytics,
} from "../context/AnalyticsContext";
import type {
  AnalyticsDepartureResource,
  AnalyticsPredictionResource,
  AnalyticsTrendsResource,
} from "../types/AnalyticsTypes";

vi.mock("../context/AnalyticsContext", () => ({ useAnalytics: vi.fn() }));

const departureId = "departure-1";
const descriptiveMeta = {
  module: "analytics" as const,
  contractVersion: "1.2.0",
  release: "t810-v1",
  status: "descriptive" as const,
  generatedAt: "2026-11-23T00:00:00.000Z",
  scope: "trends",
  period: { from: null, to: null },
  filters: { dateRangeId: departureId },
  dataOrigin: "simulated" as const,
};

const departureResource: AnalyticsDepartureResource = {
  data: {
    departure: {
      id: departureId,
      startDate: "2026-12-20T00:00:00.000Z",
      endDate: "2026-12-21T00:00:00.000Z",
      state: "pending",
      dataOrigin: "simulated",
      tourPackage: { id: "package-1", name: "Uyuni 3D/2N" },
      destination: { id: "destination-1", name: "Salar de Uyuni" },
      capacity: 30,
      tourists: 18,
      bookings: 7,
      averageGroupSize: 2.57,
      averageGroupSizeStatus: "available",
      reservedRevenue: 12000,
      registeredPayments: 9000,
      pendingBalance: 3000,
      pendingBalanceStatus: "pending",
      availableSlots: 12,
      occupancy: 60,
      capacityStatus: "valid",
    },
  },
  metadata: descriptiveMeta,
  warnings: [],
};

const trendsResource: AnalyticsTrendsResource = {
  data: {
    departure: {
      id: departureId,
      startDate: "2026-12-20T00:00:00.000Z",
      endDate: "2026-12-21T00:00:00.000Z",
      state: "pending",
      dataOrigin: "simulated",
      capacity: 30,
      tourPackage: { id: "package-1", name: "Uyuni 3D/2N" },
      destination: { id: "destination-1", name: "Salar de Uyuni" },
    },
    state: "available",
    totals: { bookings: 2, tourists: 5, reservedRevenue: 3500, eventDays: 2 },
    series: {
      granularity: "week",
      timeZone: "UTC",
      points: [
        {
          intervalStart: "2026-10-01T00:00:00.000Z",
          intervalEnd: "2026-10-08T00:00:00.000Z",
          complete: true,
          observedDays: 7,
          bookings: 1,
          tourists: 2,
          reservedRevenue: 1000,
          cumulativeBookings: 1,
          cumulativeTourists: 2,
          cumulativeReservedRevenue: 1000,
          touristsPerDay: 0.29,
        },
        {
          intervalStart: "2026-10-08T00:00:00.000Z",
          intervalEnd: "2026-10-15T00:00:00.000Z",
          complete: true,
          observedDays: 7,
          bookings: 1,
          tourists: 3,
          reservedRevenue: 2500,
          cumulativeBookings: 2,
          cumulativeTourists: 5,
          cumulativeReservedRevenue: 3500,
          touristsPerDay: 0.43,
        },
      ],
    },
    rhythm: {
      window: {
        from: "2026-10-01T00:00:00.000Z",
        to: "2026-11-13T00:00:00.000Z",
        observedDays: 44,
        status: "open",
      },
      bookingsPerDay: 0.05,
      touristsPerDay: 0.11,
    },
  },
  metadata: {
    ...descriptiveMeta,
    granularity: "week",
    timeZone: "UTC",
    asOf: "2026-11-13T23:59:59.999Z",
    observation: {
      eventField: "booking.createdAt",
      fromInclusive: true,
      toInclusive: true,
      granularity: "week",
      timeZone: "UTC",
      maxPoints: 400,
      defaultWindowDays: 30,
      maxDefaultWindowDays: 365,
      asOfRule: "booking.createdAt <= asOf",
      cumulativeScope: "observation-window",
    },
  },
  warnings: [],
};

const predictiveMeta = {
  module: "analytics" as const,
  contractVersion: "1.3.0",
  release: "t814-v1",
  status: "predictive" as const,
  generatedAt: "2026-11-23T00:00:00.000Z",
  dataOrigin: "simulated" as const,
  asOf: "2026-11-13T23:59:59.999Z",
  modelGeneratedAt: "2026-11-23T00:00:00.000Z",
  staleAfterDays: 90,
};

const predictionResource = (
  state: AnalyticsPredictionResource["data"]["state"] = "available",
): AnalyticsPredictionResource => ({
  data: {
    state,
    departureId,
    cutoffDate: "2026-12-06",
    cutoffAt: "2026-12-06T00:00:00.000Z",
    horizonDays: 14,
    confirmedTourists: 18,
    predictedFinalTourists: state === "available" ? 25 : null,
    predictionRange:
      state === "available"
        ? { lower: 21, upper: 29, method: "test-mae-band" }
        : null,
    capacity: state === "invalid-capacity" ? null : 30,
    expectedOccupancy: state === "available" ? 83.33 : null,
    predictor: state === "available" ? "baseline-accumulated" : null,
    modelVersion: "t813-v1",
    datasetVersion: "t812-v1",
    datasetHash: "dataset-hash",
    runHash: "run-hash",
    metrics: null,
    dataOrigin: "simulated",
    departureDataOrigin: "simulated",
  },
  metadata: predictiveMeta,
  warnings: [],
});

const fetchDeparture = vi.fn<AnalyticsContextType["fetchDeparture"]>();
const fetchTrends = vi.fn<AnalyticsContextType["fetchTrends"]>();
const fetchPrediction = vi.fn<AnalyticsContextType["fetchPrediction"]>();
const fetchPredictionMetrics =
  vi.fn<AnalyticsContextType["fetchPredictionMetrics"]>();
const fetchEconomics = vi.fn<AnalyticsContextType["fetchEconomics"]>();

const contextValue = (
  predictionState: AnalyticsPredictionResource["data"]["state"] = "available",
): AnalyticsContextType => ({
  overview: null,
  loading: false,
  error: null,
  summary: { data: null, loading: false, error: null },
  departures: { data: null, loading: false, error: null },
  departure: { data: departureResource, loading: false, error: null },
  filterCatalog: { data: null, loading: false, error: null },
  trends: { data: trendsResource, loading: false, error: null },
  prediction: {
    data: predictionResource(predictionState),
    loading: false,
    error: null,
  },
  predictionMetrics: { data: null, loading: false, error: null },
  economics: { data: null, loading: false, error: null },
  fetchOverview: vi.fn(),
  fetchSummary: vi.fn(),
  fetchDepartures: vi.fn(),
  fetchDeparture,
  fetchFilterCatalog: vi.fn(),
  fetchTrends,
  fetchPrediction,
  fetchEconomics,
  fetchPredictionMetrics,
});

describe("AnalyticsDepartureDetail T-817", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAnalytics).mockReturnValue(contextValue());
  });

  it("shows observed trend and an available prediction", async () => {
    render(<AnalyticsDepartureDetail departureId={departureId} onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /Demanda y estimación/ }));

    expect(screen.getByRole("heading", { name: "Uyuni 3D/2N" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Evolución de turistas confirmados/ })).toBeInTheDocument();
    expect(screen.getByText("Total estimado al inicio")).toBeInTheDocument();
    expect(screen.getByText("Margen orientativo: entre 21 y 29 turistas")).toBeInTheDocument();
    expect(screen.getByText("Ocupación estimada: 83,33 %")).toBeInTheDocument();
    expect(
      screen.getByLabelText("¿Qué significa el margen orientativo?"),
    ).toBeInTheDocument();
    expect(screen.queryByText(/La decisión final corresponde a la persona responsable/)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(fetchDeparture).toHaveBeenCalledWith(departureId);
      expect(fetchTrends).toHaveBeenCalledWith({
        dateRangeId: departureId,
        granularity: "week",
      });
      expect(fetchPrediction).toHaveBeenCalledWith(departureId, 14);
      expect(fetchEconomics).toHaveBeenCalledWith(departureId, 14);
    });
  });

  it("changes horizon and trend granularity through labeled controls", async () => {
    render(<AnalyticsDepartureDetail departureId={departureId} onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: /Demanda y estimación/ }));

    fireEvent.click(screen.getByRole("button", { name: "30 días" }));
    fireEvent.click(screen.getByRole("button", { name: "Día" }));

    await waitFor(() => {
      expect(fetchPrediction).toHaveBeenCalledWith(departureId, 30);
      expect(fetchEconomics).toHaveBeenCalledWith(departureId, 30);
      expect(fetchTrends).toHaveBeenCalledWith({
        dateRangeId: departureId,
        granularity: "day",
      });
    });
  });

  it.each([
    ["insufficient-history", "Aún no hay suficiente información anterior"],
    ["stale-model", "La estimación necesita actualizarse"],
    ["invalid-capacity", "Falta registrar una capacidad válida"],
    ["no-data", "No se puede preparar una estimación"],
  ] as const)("shows the %s controlled state", (state, title) => {
    vi.mocked(useAnalytics).mockReturnValue(contextValue(state));
    render(<AnalyticsDepartureDetail departureId={departureId} onClose={vi.fn()} />);

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.queryByText("Total estimado al inicio")).not.toBeInTheDocument();
  });

  it("returns to the departure list using a keyboard-accessible button", () => {
    const onClose = vi.fn();
    render(<AnalyticsDepartureDetail departureId={departureId} onClose={onClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Volver a salidas" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("keeps the summary visible and reveals demand and costs progressively", () => {
    render(<AnalyticsDepartureDetail departureId={departureId} onClose={vi.fn()} />);

    const demandSection = screen.getByRole("button", { name: /Demanda y estimación/ });
    const economicSection = screen.getByRole("button", { name: /Costos y punto de equilibrio/ });

    expect(demandSection).toHaveAttribute("aria-expanded", "false");
    expect(economicSection).toHaveAttribute("aria-expanded", "false");
    expect(demandSection.tagName).toBe("BUTTON");
    expect(economicSection.tagName).toBe("BUTTON");
    expect(demandSection).toHaveAttribute("aria-controls", "demand-estimation-content");
    expect(economicSection).toHaveAttribute("aria-controls", "economic-planning-content");
    demandSection.focus();
    expect(demandSection).toHaveFocus();

    fireEvent.click(demandSection);
    fireEvent.click(economicSection);

    expect(demandSection).toHaveAttribute("aria-expanded", "true");
    expect(economicSection).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("img", { name: /Evolución de turistas confirmados/ })).toBeInTheDocument();
  });

  it("does not show warnings retained from a previously selected departure", () => {
    const value = contextValue();
    vi.mocked(useAnalytics).mockReturnValue({
      ...value,
      trends: {
        data: {
          ...trendsResource,
          data: {
            ...trendsResource.data,
            departure: {
              ...trendsResource.data.departure,
              id: "previous-departure",
            },
          },
          warnings: ["ADVERTENCIA_DE_LA_SALIDA_ANTERIOR"],
        },
        loading: true,
        error: null,
      },
    });

    render(<AnalyticsDepartureDetail departureId={departureId} onClose={vi.fn()} />);

    expect(
      screen.queryByText(/ADVERTENCIA_DE_LA_SALIDA_ANTERIOR/),
    ).not.toBeInTheDocument();
  });

  it("surfaces prediction metrics errors through the common retry", () => {
    const value = contextValue();
    vi.mocked(useAnalytics).mockReturnValue({
      ...value,
      predictionMetrics: {
        data: null,
        loading: false,
        error: "Métricas no disponibles",
      },
    });

    render(<AnalyticsDepartureDetail departureId={departureId} onClose={vi.fn()} />);

    expect(screen.getByText("No pudimos actualizar el detalle")).toBeInTheDocument();
    expect(screen.queryByText("Métricas no disponibles")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(fetchPredictionMetrics).toHaveBeenCalledTimes(2);
  });
});
