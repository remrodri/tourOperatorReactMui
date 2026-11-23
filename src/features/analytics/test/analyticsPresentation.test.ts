import { describe, expect, it } from "vitest";
import {
  analyticsMetricHelp,
  formatAnalyticsDate,
  formatAnalyticsPercent,
  predictionRangeHelp,
  predictionStatePresentation,
  predictorPresentation,
  presentAnalyticsWarning,
} from "../utils/analyticsPresentation";

describe("analytics presentation dictionary T-1103", () => {
  it("translates known warning codes without exposing the code", () => {
    const message = presentAnalyticsWarning(
      "PARTIAL_BUCKET: el primer intervalo no está completo.",
    );

    expect(message?.title).toBe("El primer o último periodo está incompleto");
    expect(JSON.stringify(message)).not.toContain("PARTIAL_BUCKET");
    expect(message?.action).toContain("cautela");
  });

  it("preserves useful counts while translating capacity warnings", () => {
    const message = presentAnalyticsWarning(
      "OVERCAPACITY: 2 salida(s) superan la capacidad registrada.",
    );

    expect(message?.description).toContain("2 salidas");
    expect(JSON.stringify(message)).not.toContain("OVERCAPACITY");
  });

  it("hides fictitious-data provenance from the demonstration UI", () => {
    expect(
      presentAnalyticsWarning("Datos ficticios: registros simulados."),
    ).toBeNull();
  });

  it("uses a safe plain-language fallback for unknown technical warnings", () => {
    const message = presentAnalyticsWarning("NEW_INTERNAL_CODE: detail");
    expect(message?.title).toBe("Revisa esta información");
    expect(JSON.stringify(message)).not.toContain("NEW_INTERNAL_CODE");
    expect(JSON.stringify(message)).not.toContain("detail");
  });

  it("explains predictive states, methods and uncertainty in plain language", () => {
    expect(predictionStatePresentation["stale-model"].title).toContain(
      "actualizarse",
    );
    expect(predictorPresentation["regression-tree"]).not.toContain(
      "regression",
    );
    expect(predictionRangeHelp.description).toContain("No indica una probabilidad");
  });

  it("recognizes the unprefixed MAE warning returned by the backend", () => {
    const message = presentAnalyticsWarning(
      "La banda usa ±MAE histórico de prueba; no es un intervalo probabilístico.",
    );

    expect(message).toEqual(predictionRangeHelp);
    expect(JSON.stringify(message)).not.toContain("MAE");
  });

  it("provides all eight summary explanations", () => {
    expect(Object.keys(analyticsMetricHelp)).toHaveLength(8);
    expect(analyticsMetricHelp.availableSlots).toContain("personas adicionales");
  });

  it("formats missing and invalid values without technical output", () => {
    expect(formatAnalyticsDate(null)).toBe("Fecha no disponible");
    expect(formatAnalyticsDate("not-a-date")).toBe("Fecha no disponible");
    expect(formatAnalyticsPercent(null)).toBe("No se puede calcular");
    expect(formatAnalyticsPercent(35.71)).toContain("35,71");
  });
});

