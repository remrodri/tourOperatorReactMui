import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AnalyticsFoundation from "../components/AnalyticsFoundation";
import {
  type AnalyticsContextType,
  useAnalytics,
} from "../context/AnalyticsContext";
import type {
  AnalyticsDeparturesResource,
  AnalyticsOverview,
  AnalyticsSummaryResource,
} from "../types/AnalyticsTypes";

vi.mock("../context/AnalyticsContext", () => ({ useAnalytics: vi.fn() }));

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

const descriptiveMeta = {
  ...overview.metadata,
  contractVersion: "1.1.0",
  release: "t809-v1",
  status: "descriptive" as const,
  dataOrigin: "simulated" as const,
};

const summaryResource: AnalyticsSummaryResource = {
  data: {
    summary: {
      departures: 1,
      tourists: 5,
      bookings: 2,
      averageGroupSize: 2.5,
      averageGroupSizeStatus: "available",
      reservedRevenue: 3500,
      registeredPayments: 3043,
      pendingBalance: 457,
      pendingBalanceStatus: "pending",
      capacity: 14,
      availableSlots: 9,
      occupancy: 35.71,
      capacityStatus: "valid",
      invalidCapacityDepartures: 0,
      overcapacityDepartures: 0,
      overpaidDepartures: 0,
    },
  },
  metadata: descriptiveMeta,
  warnings: ["Datos ficticios: registros simulados."],
};

const departuresResource: AnalyticsDeparturesResource = {
  data: {
    items: [
      {
        id: "departure-1",
        startDate: "2026-11-28T00:00:00.000Z",
        endDate: "2026-11-29T00:00:00.000Z",
        state: "pending",
        dataOrigin: "simulated",
        tourPackage: { id: "package-1", name: "Uyuni cultural" },
        destination: { id: "destination-1", name: "Salar de Uyuni" },
        capacity: 14,
        tourists: 5,
        bookings: 2,
        averageGroupSize: 2.5,
        averageGroupSizeStatus: "available",
        reservedRevenue: 3500,
        registeredPayments: 3043,
        pendingBalance: 457,
        pendingBalanceStatus: "pending",
        availableSlots: 9,
        occupancy: 35.71,
        capacityStatus: "valid",
      },
    ],
    pagination: { limit: 100, hasMore: false, nextCursor: null },
  },
  metadata: descriptiveMeta,
  warnings: [],
};

const emptySummary: AnalyticsSummaryResource = {
  ...summaryResource,
  data: {
    summary: {
      ...summaryResource.data.summary,
      departures: 0,
      tourists: 0,
      bookings: 0,
      averageGroupSize: null,
      averageGroupSizeStatus: "no-bookings",
      capacity: null,
      availableSlots: null,
      occupancy: null,
      capacityStatus: "no-data",
    },
  },
};

const fetchOverview = vi.fn<AnalyticsContextType["fetchOverview"]>();
const fetchSummary = vi.fn<AnalyticsContextType["fetchSummary"]>();
const fetchDepartures = vi.fn<AnalyticsContextType["fetchDepartures"]>();
const fetchFilterCatalog = vi.fn<AnalyticsContextType["fetchFilterCatalog"]>();

const contextValue = (
  overrides: Partial<AnalyticsContextType> = {},
): AnalyticsContextType => ({
  overview,
  loading: false,
  error: null,
  summary: { data: summaryResource, loading: false, error: null },
  departures: { data: departuresResource, loading: false, error: null },
  departure: { data: null, loading: false, error: null },
  filterCatalog: {
    data: {
      packages: [{ id: "package-1", name: "Uyuni cultural" }],
      destinations: [{ id: "destination-1", name: "Salar de Uyuni" }],
      departures: [
        {
          id: "departure-1",
          startDate: "2026-11-28T00:00:00.000Z",
          tourPackage: { id: "package-1", name: "Uyuni cultural" },
          destination: { id: "destination-1", name: "Salar de Uyuni" },
        },
      ],
    },
    loading: false,
    error: null,
  },
  trends: { data: null, loading: false, error: null },
  prediction: { data: null, loading: false, error: null },
  predictionMetrics: { data: null, loading: false, error: null },
  fetchOverview,
  fetchSummary,
  fetchDepartures,
  fetchDeparture: vi.fn(),
  fetchFilterCatalog,
  fetchTrends: vi.fn(),
  fetchPrediction: vi.fn(),
  fetchPredictionMetrics: vi.fn(),
  ...overrides,
});

describe("AnalyticsFoundation T-816", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAnalytics).mockReturnValue(contextValue());
  });

  it("renders simulated summary indicators and aggregated departures", async () => {
    render(<AnalyticsFoundation />);

    expect(screen.getByRole("heading", { name: "Planificación analítica" })).toBeInTheDocument();
    expect(screen.getByText("DATOS SIMULADOS")).toBeInTheDocument();
    expect(screen.getByText("Turistas vigentes")).toBeInTheDocument();
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
    expect(screen.getByText("Uyuni cultural")).toBeInTheDocument();
    expect(screen.getByText("Salar de Uyuni")).toBeInTheDocument();
    expect(screen.getByText("Datos ficticios: registros simulados.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ver detalle de Uyuni cultural/ }),
    ).toBeInTheDocument();

    await waitFor(() => expect(fetchSummary).toHaveBeenCalledWith());
    expect(fetchDepartures).toHaveBeenCalledWith({ limit: 100 });
    expect(fetchFilterCatalog).toHaveBeenCalledWith();
  });

  it("validates and applies a complete departure date period", async () => {
    render(<AnalyticsFoundation />);
    await waitFor(() => expect(fetchSummary).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText("Desde"), {
      target: { value: "2026-11-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));
    expect(
      screen.getByText("Debes indicar ambas fechas del periodo o dejar las dos vacías."),
    ).toBeInTheDocument();
    expect(fetchSummary).toHaveBeenCalledTimes(1);

    fireEvent.change(screen.getByLabelText("Hasta"), {
      target: { value: "2026-11-30" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));

    expect(fetchSummary).toHaveBeenLastCalledWith({
      from: "2026-11-01",
      to: "2026-11-30",
    });
    expect(fetchDepartures).toHaveBeenLastCalledWith({
      from: "2026-11-01",
      to: "2026-11-30",
      limit: 100,
    });
  });

  it("shows an explicit empty state for filters without results", () => {
    vi.mocked(useAnalytics).mockReturnValue(
      contextValue({
        summary: { data: emptySummary, loading: false, error: null },
        departures: {
          data: {
            ...departuresResource,
            data: {
              items: [],
              pagination: { limit: 100, hasMore: false, nextCursor: null },
            },
          },
          loading: false,
          error: null,
        },
      }),
    );

    render(<AnalyticsFoundation />);

    expect(screen.getByText("Sin resultados para los filtros")).toBeInTheDocument();
    expect(screen.getByText(/No se inventaron valores/)).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("offers a retry when summary loading fails", () => {
    vi.mocked(useAnalytics).mockReturnValue(
      contextValue({
        summary: { data: null, loading: false, error: "Resumen no disponible" },
      }),
    );
    render(<AnalyticsFoundation />);

    expect(screen.getByText("Resumen no disponible")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(fetchSummary).toHaveBeenLastCalledWith({});
    expect(fetchDepartures).toHaveBeenLastCalledWith({ limit: 100 });
  });
});
