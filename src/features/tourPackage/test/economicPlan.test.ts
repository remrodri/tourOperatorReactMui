import { describe, expect, it } from "vitest";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { dateRangeSchema } from "../components/DateManager/DateSelectorForm/validation/dateRangeSchema";
import {
  buildEconomicPlanPayload,
  calculateEconomicPreview,
  emptyEconomicPlanFormValues,
  toEconomicPlanFormValues,
  type EconomicPlanFormValues,
} from "../components/DateManager/DateSelectorForm/economicPlanForm";
import type { EconomicPlanType } from "../types/EconomicPlanType";
import { extractDateRangeApiMessage } from "../service/DateRangeService";

dayjs.extend(customParseFormat);

const controlPlan = (
  overrides: Partial<EconomicPlanFormValues> = {},
): EconomicPlanFormValues => ({
  fixedCosts: {
    transportation: 2000,
    guide: 500,
    administration: 300,
    fixedLodging: 0,
    other: 0,
  },
  variableCostsPerTourist: {
    food: 100,
    tickets: 50,
    lodging: 0,
    insurance: 0,
    other: 0,
  },
  pricePerTourist: 500,
  operationalMinimum: "",
  planningStartedAt: dayjs("2026-01-01"),
  decisionDeadline: dayjs("2026-03-08"),
  ...overrides,
});

const departureValues = (plan: EconomicPlanFormValues) => ({
  dates: ["15-03-2026"],
  guides: ["guide-id"],
  capacity: 20,
  economicPlan: plan,
});

const planSchema = (includeEconomicPlan = true) =>
  dateRangeSchema({ requireCapacity: true, includeEconomicPlan });

const storedPlan: EconomicPlanType = {
  currency: "BOB",
  fixedCosts: {
    transportation: 2000,
    guide: 500,
    administration: 300,
    fixedLodging: 0,
    other: 0,
  },
  variableCostsPerTourist: {
    food: 100,
    tickets: 50,
    lodging: 0,
    insurance: 0,
    other: 0,
  },
  pricePerTourist: 500,
  planningStartedAt: "2026-01-01T00:00:00.000Z",
  decisionDeadline: "2026-03-08T00:00:00.000Z",
  source: "simulated",
  version: "t1202-v1",
  updatedAt: "2026-01-02T00:00:00.000Z",
};

describe("economic plan form — creation and preload", () => {
  it("1. accepts a complete economic plan on creation and builds the payload", async () => {
    const values = departureValues(controlPlan());

    await expect(planSchema().validate(values)).resolves.toBeTruthy();

    const payload = buildEconomicPlanPayload(values.economicPlan);
    expect(payload.fixedCosts).toEqual({
      transportation: 2000,
      guide: 500,
      administration: 300,
      fixedLodging: 0,
      other: 0,
    });
    expect(payload.variableCostsPerTourist).toEqual({
      food: 100,
      tickets: 50,
      lodging: 0,
      insurance: 0,
      other: 0,
    });
    expect(payload.pricePerTourist).toBe(500);
    expect(payload.operationalMinimum).toBeUndefined();
    expect(payload.planningStartedAt).toBe(
      dayjs("2026-01-01").toISOString(),
    );
    expect(payload.decisionDeadline).toBe(
      dayjs("2026-03-08").toISOString(),
    );
  });

  it("2. preloads an existing plan with all values and dates", async () => {
    const formValues = toEconomicPlanFormValues(storedPlan);

    expect(formValues.fixedCosts).toEqual(storedPlan.fixedCosts);
    expect(formValues.variableCostsPerTourist).toEqual(
      storedPlan.variableCostsPerTourist,
    );
    expect(formValues.pricePerTourist).toBe(500);
    expect(formValues.operationalMinimum).toBe("");
    expect(formValues.planningStartedAt?.toISOString()).toBe(
      storedPlan.planningStartedAt,
    );
    expect(formValues.decisionDeadline?.toISOString()).toBe(
      storedPlan.decisionDeadline,
    );

    await expect(
      planSchema().validate(departureValues(formValues)),
    ).resolves.toBeTruthy();

    const payload = buildEconomicPlanPayload(formValues);
    expect(payload.source).toBeUndefined();
  });

  it("3. keeps a legacy departure without plan editable", async () => {
    const legacyValues = {
      dates: ["10-05-2026"],
      guides: ["guide-id"],
      capacity: "",
      economicPlan: emptyEconomicPlanFormValues(),
    };

    await expect(
      dateRangeSchema({
        requireCapacity: false,
        includeEconomicPlan: false,
      }).validate(legacyValues),
    ).resolves.toBeTruthy();

    expect(toEconomicPlanFormValues(undefined)).toEqual(
      emptyEconomicPlanFormValues(),
    );
  });

  it("4. starts optional money fields at zero and required fields empty", () => {
    const empty = emptyEconomicPlanFormValues();

    expect(empty.fixedCosts.transportation).toBe("");
    expect(empty.fixedCosts.guide).toBe("");
    expect(empty.fixedCosts.administration).toBe(0);
    expect(empty.fixedCosts.fixedLodging).toBe(0);
    expect(empty.fixedCosts.other).toBe(0);
    expect(empty.variableCostsPerTourist.food).toBe("");
    expect(empty.variableCostsPerTourist.tickets).toBe("");
    expect(empty.variableCostsPerTourist.lodging).toBe(0);
    expect(empty.variableCostsPerTourist.insurance).toBe(0);
    expect(empty.variableCostsPerTourist.other).toBe(0);
    expect(empty.pricePerTourist).toBe("");
    expect(empty.operationalMinimum).toBe("");
  });
});

describe("economic plan form — validation", () => {
  it("5. rejects negative amounts", async () => {
    const plan = controlPlan({
      fixedCosts: {
        ...controlPlan().fixedCosts,
        transportation: -1,
      },
    });

    await expect(
      planSchema().validate(departureValues(plan)),
    ).rejects.toThrow(/no puede ser negativo/i);
  });

  it("6. rejects amounts with more than two decimals", async () => {
    const plan = controlPlan({ pricePerTourist: 500.123 });

    await expect(
      planSchema().validate(departureValues(plan)),
    ).rejects.toThrow(/dos decimales/i);
  });

  it("7. rejects a zero price", async () => {
    const plan = controlPlan({ pricePerTourist: 0 });

    await expect(
      planSchema().validate(departureValues(plan)),
    ).rejects.toThrow(/mayor que cero/i);
  });

  it("8. rejects a decimal or non-positive operational minimum", async () => {
    await expect(
      planSchema().validate(
        departureValues(controlPlan({ operationalMinimum: 8.5 })),
      ),
    ).rejects.toThrow(/entero/i);

    await expect(
      planSchema().validate(
        departureValues(controlPlan({ operationalMinimum: 0 })),
      ),
    ).rejects.toThrow(/mayor que cero/i);
  });

  it("9. validates the required date order", async () => {
    const wrongStart = controlPlan({
      planningStartedAt: dayjs("2026-03-08"),
      decisionDeadline: dayjs("2026-03-05"),
    });
    await expect(
      planSchema().validate(departureValues(wrongStart)),
    ).rejects.toThrow(/inicio del seguimiento debe ser anterior/i);

    const deadlineAfterStart = controlPlan({
      decisionDeadline: dayjs("2026-03-15"),
    });
    await expect(
      planSchema().validate(departureValues(deadlineAfterStart)),
    ).rejects.toThrow(/fecha límite de decisión debe ser anterior al inicio/i);
  });
});

describe("economic plan form — preview calculation", () => {
  it("10. reproduces the approved control example", () => {
    const preview = calculateEconomicPreview(controlPlan(), 20);

    expect(preview.fixedCostsTotal).toBe(2800);
    expect(preview.variableCostPerTourist).toBe(150);
    expect(preview.contributionMarginPerTourist).toBe(350);
    expect(preview.economicMinimum).toBe(8);
    expect(preview.finalMinimum).toBe(8);
    expect(preview.nonPositiveContribution).toBe(false);
    expect(preview.capacityInsufficient).toBe(false);
  });

  it("11. lets an operational minimum above the economic one raise the final minimum", () => {
    const preview = calculateEconomicPreview(
      controlPlan({ operationalMinimum: 10 }),
      20,
    );

    expect(preview.economicMinimum).toBe(8);
    expect(preview.operationalMinimum).toBe(10);
    expect(preview.finalMinimum).toBe(10);
  });

  it("12. warns when the final minimum exceeds the capacity without truncating it", () => {
    const preview = calculateEconomicPreview(controlPlan(), 7);

    expect(preview.finalMinimum).toBe(8);
    expect(preview.capacityInsufficient).toBe(true);
  });

  it("13. does not publish a minimum when the margin is zero or negative", () => {
    const zero = calculateEconomicPreview(
      controlPlan({ pricePerTourist: 150 }),
      20,
    );
    expect(zero.contributionMarginPerTourist).toBe(0);
    expect(zero.nonPositiveContribution).toBe(true);
    expect(zero.economicMinimum).toBeNull();
    expect(zero.finalMinimum).toBeNull();

    const negative = calculateEconomicPreview(
      controlPlan({ pricePerTourist: 100 }),
      20,
    );
    expect(negative.contributionMarginPerTourist).toBe(-50);
    expect(negative.nonPositiveContribution).toBe(true);
    expect(negative.finalMinimum).toBeNull();
  });
});

describe("economic plan form — compatibility and errors", () => {
  it("14. preserves an existing plan while other departure fields are edited", () => {
    const formValues = toEconomicPlanFormValues(storedPlan);
    const fullRoundTrip = buildEconomicPlanPayload(formValues);

    expect(fullRoundTrip.fixedCosts).toEqual(storedPlan.fixedCosts);
    expect(fullRoundTrip.variableCostsPerTourist).toEqual(
      storedPlan.variableCostsPerTourist,
    );
    expect(fullRoundTrip.pricePerTourist).toBe(storedPlan.pricePerTourist);

    const otherFieldOnlyEdit = {
      dates: ["20-03-2026"],
      guides: ["guide-id"],
      capacity: 25,
    };
    expect(otherFieldOnlyEdit).not.toHaveProperty("economicPlan");
    expect(storedPlan.pricePerTourist).toBe(500);
    expect(storedPlan.fixedCosts.transportation).toBe(2000);
  });

  it("15. turns backend errors into understandable messages", () => {
    const businessError = {
      isAxiosError: true,
      response: {
        data: {
          message: "La fecha límite debe ser anterior al inicio de la salida",
        },
      },
    };
    expect(extractDateRangeApiMessage(businessError)).toMatch(
      /fecha límite debe ser anterior/i,
    );

    const validationError = {
      isAxiosError: true,
      response: {
        data: {
          message: "Datos inválidos enviados",
          data: [
            {
              field: "economicPlan.operationalMinimum",
              message: "El mínimo operativo debe ser un número entero",
            },
          ],
        },
      },
    };
    expect(extractDateRangeApiMessage(validationError)).toMatch(
      /mínimo operativo debe ser un número entero/i,
    );

    expect(extractDateRangeApiMessage(new Error("boom"))).toMatch(
      /No se pudo guardar la salida/i,
    );
  });
});
