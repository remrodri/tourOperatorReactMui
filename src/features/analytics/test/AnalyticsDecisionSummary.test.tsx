import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnalyticsDecisionSummary from "../components/AnalyticsDecisionSummary";
import type { AnalyticsEconomicResource } from "../types/AnalyticsTypes";

const resource = (): AnalyticsEconomicResource => ({
  data: {
    departureId: "departure-1",
    predictionState: "available",
    predictionHorizonDays: 14,
    status: "expected-viable",
    currency: "BOB",
    confirmedTourists: 6,
    predictedFinalTourists: 9,
    fixedCostsTotal: 2800,
    variableCostPerTourist: 150,
    contributionMarginPerTourist: 350,
    economicMinimum: 8,
    operationalMinimum: 6,
    finalMinimum: 8,
    missingConfirmedTourists: 2,
    confirmedResult: -700,
    estimatedResult: 350,
    predictionUsed: true,
    recommendation: {
      urgency: "commercial-action",
      asOf: "2026-11-13T23:59:59.999Z",
      planningStartedAt: "2026-11-01T00:00:00.000Z",
      decisionDeadline: "2026-11-20T00:00:00.000Z",
      timeFractionRemaining: 0.4,
      title: "Acción comercial recomendada",
      explanation: "Queda menos de la mitad del tiempo disponible.",
      actionsToEvaluate: ["Evaluar reforzar la difusión."],
      automaticDecision: false,
      thresholds: { monitor: 0.5, priority: 0.25 },
    },
  },
  metadata: {
    module: "analytics",
    contractVersion: "1.5.0",
    release: "t1206-v1",
    status: "economic",
    generatedAt: "2026-11-24T00:00:00.000Z",
    dataOrigin: "simulated",
  },
  warnings: [],
});

describe("AnalyticsDecisionSummary T-1302", () => {
  it("places the current administrative orientation and evidence in one block", () => {
    render(
      <AnalyticsDecisionSummary
        resource={resource()}
        loading={false}
        startDate="2026-12-20T00:00:00.000Z"
      />,
    );

    expect(screen.getByRole("heading", { name: "Resumen para decidir" })).toBeInTheDocument();
    expect(screen.getByText("Acción comercial recomendada")).toBeInTheDocument();
    expect(screen.getByText(/6 confirmados · mínimo 8 · faltan 2/)).toBeInTheDocument();
    expect(screen.getByText(/−.*700.*resultado insuficiente/)).toBeInTheDocument();
    expect(screen.getByText(/Acción para evaluar: Evaluar reforzar la difusión/)).toBeInTheDocument();
    expect(screen.getAllByText(/decisión final corresponde/)).toHaveLength(1);
  });

  it("turns a past departure into a retrospective reading without current actions", () => {
    render(
      <AnalyticsDecisionSummary
        resource={resource()}
        loading={false}
        startDate="2024-01-01T00:00:00.000Z"
      />,
    );

    expect(screen.getByText("Salida histórica")).toBeInTheDocument();
    expect(screen.getByText(/información disponible antes del inicio/)).toBeInTheDocument();
    expect(screen.getByText(/Corte histórico: 01 ene 2024/)).toBeInTheDocument();
    expect(screen.queryByText(/Acción para evaluar:/)).not.toBeInTheDocument();
  });

  it("keeps invalid economic information as the primary current state", () => {
    const missing = resource();
    missing.data.status = "economic-data-missing";
    missing.data.finalMinimum = null;
    missing.data.missingConfirmedTourists = null;
    missing.data.confirmedResult = null;
    missing.data.recommendation.urgency = "not-applicable";

    render(
      <AnalyticsDecisionSummary
        resource={missing}
        loading={false}
        startDate="2026-12-20T00:00:00.000Z"
      />,
    );

    expect(screen.getByText("Falta completar la planificación económica")).toBeInTheDocument();
    expect(screen.getByText(/Resultado planificado: no se puede calcular/)).toBeInTheDocument();
    expect(screen.getByText(/Acción para evaluar: Completa el precio, los costos y el mínimo operativo/)).toBeInTheDocument();
    expect(screen.queryByText(/reforzar la difusión/)).not.toBeInTheDocument();
  });
});
