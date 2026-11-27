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
        attention: {
          priority: 2,
          lifecycle: "prospective",
          label: "Revisión prioritaria",
          finalMinimum: 8,
          missingTourists: 3,
          urgency: "priority-action",
          decisionDeadline: "2026-11-25T00:00:00.000Z",
        },
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
  economics: { data: null, loading: false, error: null },
  predictionMetrics: { data: null, loading: false, error: null },
  fetchOverview,
  fetchSummary,
  fetchDepartures,
  fetchDeparture: vi.fn(),
  fetchFilterCatalog,
  fetchTrends: vi.fn(),
  fetchPrediction: vi.fn(),
  fetchEconomics: vi.fn(),
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
    expect(screen.queryByText("DATOS SIMULADOS")).not.toBeInTheDocument();
    expect(screen.getByText("Turistas confirmados")).toBeInTheDocument();
    expect(screen.getAllByText("5").length).toBeGreaterThan(0);
    expect(screen.getByText("Uyuni cultural")).toBeInTheDocument();
    expect(screen.getByText("Salar de Uyuni")).toBeInTheDocument();
    expect(screen.getByText(/Consulta generada el/)).toBeInTheDocument();
    expect(screen.queryByText("Indica cuándo se preparó la consulta, no la fecha de las salidas.")).not.toBeInTheDocument();
    expect(screen.queryByText(/Consulta reservas, ocupación y disponibilidad/)).not.toBeInTheDocument();
    fireEvent.mouseOver(
      screen.getByLabelText("¿Qué ofrece Planificación analítica?"),
    );
    expect(
      await screen.findByText(/Consulta reservas, ocupación y disponibilidad/),
    ).toBeInTheDocument();
    fireEvent.mouseOver(screen.getByLabelText("¿Qué significa Consulta generada?"));
    expect(
      await screen.findByText(
        "Indica cuándo se preparó la consulta, no la fecha de las salidas.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Actualizado/)).not.toBeInTheDocument();
    expect(screen.queryByText("Datos ficticios: registros simulados.")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Ver detalle de Uyuni cultural/ }),
    ).toBeInTheDocument();

    await waitFor(() => expect(fetchSummary).toHaveBeenCalledWith());
    expect(fetchDepartures).toHaveBeenCalledWith({ limit: 20, order: "attention" });
    expect(screen.getByText("Revisión prioritaria")).toBeInTheDocument();
    expect(screen.getByLabelText("Indicadores principales")).toBeInTheDocument();
    expect(screen.getByLabelText("Indicadores financieros secundarios")).not.toBeVisible();
    fireEvent.click(screen.getByText("Información financiera secundaria"));
    expect(screen.getByLabelText("Indicadores financieros secundarios")).toBeVisible();
    expect(fetchFilterCatalog).toHaveBeenCalledWith();
  });

  it("validates and applies a complete departure date period", async () => {
    render(<AnalyticsFoundation />);
    await waitFor(() => expect(fetchSummary).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText("Salida desde"), {
      target: { value: "01/11/2026" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));
    expect(
      screen.getByText("Debes indicar ambas fechas del periodo o dejar las dos vacías."),
    ).toBeInTheDocument();
    expect(fetchSummary).toHaveBeenCalledTimes(1);

    fireEvent.change(screen.getByLabelText("Salida hasta"), {
      target: { value: "30/11/2026" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Aplicar filtros" }));

    expect(fetchSummary).toHaveBeenLastCalledWith({
      from: "2026-11-01",
      to: "2026-11-30",
    });
    expect(fetchDepartures).toHaveBeenLastCalledWith({
      from: "2026-11-01",
      to: "2026-11-30",
      limit: 20,
      order: "attention",
    });
  });

  it("offers calendar selectors and clears an end date earlier than a new start date", async () => {
    render(<AnalyticsFoundation />);
    await waitFor(() => expect(fetchSummary).toHaveBeenCalledTimes(1));

    expect(screen.getAllByRole("button", { name: "Choose date" })).toHaveLength(2);
    expect(screen.getByText("Selecciona la fecha inicial.")).toBeInTheDocument();
    expect(screen.getByText("Selecciona primero la fecha inicial.")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText("Salida desde"), {
      target: { value: "01/11/2026" },
    });
    fireEvent.change(screen.getByLabelText("Salida hasta"), {
      target: { value: "10/11/2026" },
    });
    fireEvent.change(screen.getByLabelText("Salida desde"), {
      target: { value: "20/11/2026" },
    });

    expect(screen.getByLabelText("Salida hasta")).toHaveValue("");
    expect(screen.getByText("Debe ser igual o posterior a la fecha inicial.")).toBeInTheDocument();
    expect(fetchSummary).toHaveBeenCalledTimes(1);
  });

  it("changes the list order and paginates without loading every departure", async () => {
    vi.mocked(useAnalytics).mockReturnValue(
      contextValue({
        departures: {
          data: {
            ...departuresResource,
            data: {
              ...departuresResource.data,
              pagination: { limit: 20, hasMore: true, nextCursor: "next-page" },
            },
          },
          loading: false,
          error: null,
        },
      }),
    );
    render(<AnalyticsFoundation />);
    await waitFor(() => expect(fetchDepartures).toHaveBeenCalledWith({ limit: 20, order: "attention" }));

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Ordenar salidas" }));
    fireEvent.click(screen.getByRole("option", { name: "Fecha más próxima" }));
    expect(fetchDepartures).toHaveBeenLastCalledWith({ limit: 20, order: "chronological" });

    fireEvent.click(screen.getByRole("button", { name: "Siguiente" }));
    expect(fetchDepartures).toHaveBeenLastCalledWith({
      limit: 20,
      order: "chronological",
      cursor: "next-page",
    });
    expect(screen.getByText("Página 2")).toBeInTheDocument();
  });

  it("filters destination, package and departure in sequence and clears lower selections", async () => {
    vi.mocked(useAnalytics).mockReturnValue(
      contextValue({
        filterCatalog: {
          data: {
            destinations: [
              { id: "destination-1", name: "Salar de Uyuni" },
              { id: "destination-2", name: "Incachaca" },
            ],
            packages: [
              { id: "package-1", name: "Uyuni cultural" },
              { id: "package-2", name: "Incachaca Full Day" },
            ],
            departures: [
              {
                id: "departure-1",
                startDate: "2026-11-28T00:00:00.000Z",
                tourPackage: { id: "package-1", name: "Uyuni cultural" },
                destination: { id: "destination-1", name: "Salar de Uyuni" },
              },
              {
                id: "departure-2",
                startDate: "2026-12-11T00:00:00.000Z",
                tourPackage: { id: "package-2", name: "Incachaca Full Day" },
                destination: { id: "destination-2", name: "Incachaca" },
              },
            ],
          },
          loading: false,
          error: null,
        },
      }),
    );

    render(<AnalyticsFoundation />);

    expect(screen.getByLabelText("Paquete turístico")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
    expect(screen.getByLabelText("Salida")).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Destino" }));
    fireEvent.click(screen.getByRole("option", { name: "Incachaca" }));

    expect(screen.getByLabelText("Paquete turístico")).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
    fireEvent.mouseDown(screen.getByLabelText("Paquete turístico"));
    expect(screen.getByRole("option", { name: "Incachaca Full Day" })).toBeInTheDocument();
    expect(screen.queryByRole("option", { name: "Uyuni cultural" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("option", { name: "Incachaca Full Day" }));

    expect(screen.getByLabelText("Salida")).not.toHaveAttribute(
      "aria-disabled",
      "true",
    );
    fireEvent.mouseDown(screen.getByLabelText("Salida"));
    const incachacaDeparture = screen.getByRole("option", {
      name: /11 dic 2026.*Incachaca Full Day/i,
    });
    expect(incachacaDeparture).toBeInTheDocument();
    fireEvent.click(incachacaDeparture);

    fireEvent.mouseDown(screen.getByRole("combobox", { name: "Destino" }));
    fireEvent.click(screen.getByRole("option", { name: "Salar de Uyuni" }));
    expect(screen.getByRole("combobox", { name: "Paquete turístico" })).not.toHaveTextContent("Incachaca Full Day");
    expect(screen.getByRole("combobox", { name: "Salida" })).toHaveAttribute("aria-disabled", "true");
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
    expect(screen.getByText("Ajusta o limpia los filtros para consultar otras salidas.")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("offers a retry when summary loading fails", () => {
    vi.mocked(useAnalytics).mockReturnValue(
      contextValue({
        summary: { data: null, loading: false, error: "Resumen no disponible" },
      }),
    );
    render(<AnalyticsFoundation />);

    expect(screen.getByText("No pudimos actualizar la información")).toBeInTheDocument();
    expect(screen.queryByText("Resumen no disponible")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(fetchSummary).toHaveBeenLastCalledWith({});
    expect(fetchDepartures).toHaveBeenLastCalledWith({ limit: 20, order: "attention" });
  });
});
