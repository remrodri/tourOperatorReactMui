import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnalyticsEconomicPanel from "../components/AnalyticsEconomicPanel";
import type { AnalyticsEconomicResource } from "../types/AnalyticsTypes";

const resource = (status: AnalyticsEconomicResource["data"]["status"]): AnalyticsEconomicResource => ({
  data: {
    departureId: "departure-1",
    predictionState: "available",
    predictionHorizonDays: 14,
    status,
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

describe("AnalyticsEconomicPanel T-1207", () => {
  it("explains costs, minimums, results and the recommendation in plain language", () => {
    render(<AnalyticsEconomicPanel resource={resource("expected-viable")} loading={false} />);

    expect(screen.getByText("La estimación alcanzaría el mínimo")).toBeInTheDocument();
    expect(screen.getByText("Costos fijos planificados")).toBeInTheDocument();
    expect(screen.getByText("Mínimo final que debe cumplirse")).toBeInTheDocument();
    expect(screen.getByText("Resultado con reservas confirmadas")).toBeInTheDocument();
    expect(screen.getByText("Resultado estimado")).toBeInTheDocument();
    expect(screen.getByText("Acción comercial recomendada")).toBeInTheDocument();
    expect(screen.getByText(/Información analizada hasta:/)).toHaveTextContent("13 nov 2026");
    expect(screen.getByText(/Tiempo disponible en la fecha de referencia:/)).toHaveTextContent("7 días hasta la fecha límite");
    expect(screen.getByText(/no reemplaza un estado contable/i)).toBeInTheDocument();
    expect(screen.getByText(/no mantiene, reprograma ni cancela/i)).toBeInTheDocument();
    expect(screen.queryByText("expected-viable")).not.toBeInTheDocument();
  });

  it("shows a controlled explanation when the economic plan is missing", () => {
    const missing = resource("economic-data-missing");
    missing.data.fixedCostsTotal = null;
    missing.data.variableCostPerTourist = null;
    missing.data.contributionMarginPerTourist = null;
    missing.data.economicMinimum = null;
    missing.data.finalMinimum = null;
    missing.data.confirmedResult = null;
    missing.data.estimatedResult = null;
    missing.data.predictionUsed = false;

    render(<AnalyticsEconomicPanel resource={missing} loading={false} />);

    expect(screen.getByText("Falta completar la planificación económica")).toBeInTheDocument();
    expect(screen.queryByText("Costos fijos planificados")).not.toBeInTheDocument();
  });

  it("does not show estimated values when the prediction was not used", () => {
    const withoutPrediction = resource("below-break-even");
    withoutPrediction.data.predictionUsed = false;
    withoutPrediction.data.predictedFinalTourists = null;
    withoutPrediction.data.estimatedResult = null;

    render(<AnalyticsEconomicPanel resource={withoutPrediction} loading={false} />);

    expect(screen.queryByText("Turistas estimados al inicio")).not.toBeInTheDocument();
    expect(screen.queryByText("Resultado estimado")).not.toBeInTheDocument();
  });
});
