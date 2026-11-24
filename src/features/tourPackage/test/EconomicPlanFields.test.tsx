import { render, screen } from "@testing-library/react";
import { Formik } from "formik";
import { describe, expect, it } from "vitest";
import dayjs from "dayjs";
import EconomicPlanFields from "../components/DateManager/DateSelectorForm/EconomicPlanFields";
import type { DateRangeFormValues } from "../components/DateManager/DateSelectorForm/DateSelectorFormContainer";

const values = (
  pricePerTourist = 500,
): DateRangeFormValues => ({
  dates: ["15-03-2026"],
  guides: ["guide-id"],
  capacity: 20,
  economicPlan: {
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
    pricePerTourist,
    operationalMinimum: "",
    planningStartedAt: dayjs("2026-01-01"),
    decisionDeadline: dayjs("2026-03-08"),
  },
});

const renderFields = (formValues: DateRangeFormValues, capacity = 20) =>
  render(
    <Formik initialValues={formValues} onSubmit={() => undefined}>
      {(formik) => (
        <EconomicPlanFields
          formik={formik}
          capacity={capacity}
          startDate={dayjs("2026-03-15")}
        />
      )}
    </Formik>,
  );

describe("EconomicPlanFields", () => {
  it("renders the five clear sections and the approved control result", () => {
    renderFields(values());

    expect(screen.getByText("1. Costos fijos de la salida")).toBeTruthy();
    expect(screen.getByText("2. Costos por cada turista")).toBeTruthy();
    expect(screen.getByText("3. Precio y mínimo operativo")).toBeTruthy();
    expect(screen.getByText("4. Fechas de planificación")).toBeTruthy();
    expect(screen.getByText("5. Resumen calculado")).toBeTruthy();
    expect(screen.getByText("Bs 2800.00")).toBeTruthy();
    expect(screen.getByText("Bs 350.00")).toBeTruthy();
    expect(screen.getAllByText("8 turistas").length).toBeGreaterThan(0);
  });

  it("shows understandable warnings without hiding the calculated minimum", () => {
    const firstRender = renderFields(values(), 7);

    expect(screen.getByText(/supera la capacidad de la salida/i)).toBeTruthy();
    expect(screen.getAllByText("8 turistas").length).toBeGreaterThan(0);

    firstRender.unmount();
    renderFields(values(150));

    expect(
      screen.getByText(/El precio por turista no supera el costo por turista/i),
    ).toBeTruthy();
  });
});
