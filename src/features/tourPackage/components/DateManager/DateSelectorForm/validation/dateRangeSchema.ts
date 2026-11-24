import * as Yup from "yup";
import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { EconomicPlanFormValues } from "../economicPlanForm";

dayjs.extend(customParseFormat);

interface DateRangeSchemaOptions {
  requireCapacity?: boolean;
  includeEconomicPlan?: boolean;
}

interface DateRangeEconomicFormLike {
  dates?: string[];
  economicPlan?: EconomicPlanFormValues;
}

const hasAtMostTwoDecimals = (value: number | undefined): boolean =>
  value === undefined ||
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;

const isFiniteOrEmpty = (value: number | undefined): boolean =>
  value === undefined || Number.isFinite(value);

const toOptionalNumber = (
  value: unknown,
  originalValue: unknown,
): number | undefined => {
  if (originalValue === "" || originalValue === null) return undefined;
  if (typeof value === "number" && Number.isNaN(value)) return undefined;
  return value as number;
};

const moneyField = (required: boolean, label: string) => {
  const schema = Yup.number()
    .transform(toOptionalNumber)
    .typeError(`${label} debe ser un número válido`)
    .test(
      "finite",
      `${label} debe ser un número finito`,
      (value) => isFiniteOrEmpty(value as number | undefined),
    )
    .min(0, `${label} no puede ser negativo`)
    .test(
      "two-decimals",
      `${label} admite como máximo dos decimales`,
      (value) => hasAtMostTwoDecimals(value as number | undefined),
    );

  return required ? schema.required(`${label} es obligatorio`) : schema.optional();
};

const priceField = Yup.number()
  .transform(toOptionalNumber)
  .typeError("El precio por turista debe ser un número válido")
  .test(
    "finite",
    "El precio por turista debe ser un número finito",
    (value) => isFiniteOrEmpty(value as number | undefined),
  )
  .moreThan(0, "El precio por turista debe ser mayor que cero")
  .test(
    "two-decimals",
    "El precio por turista admite como máximo dos decimales",
    (value) => hasAtMostTwoDecimals(value as number | undefined),
  )
  .required("El precio por turista es obligatorio");

const operationalMinimumField = Yup.number()
  .transform(toOptionalNumber)
  .typeError("El mínimo operativo debe ser un número válido")
  .integer("El mínimo operativo debe ser un número entero")
  .min(1, "El mínimo operativo debe ser mayor que cero")
  .optional();

const dateField = (label: string) =>
  Yup.mixed<Dayjs>()
    .nullable()
    .test(
      "valid-plan-date",
      `${label} es obligatorio`,
      (value) => dayjs.isDayjs(value) && value.isValid(),
    );

const economicPlanSchema = () =>
  Yup.object({
    fixedCosts: Yup.object({
      transportation: moneyField(true, "El costo de transporte"),
      guide: moneyField(true, "El costo de guía"),
      administration: moneyField(false, "El costo de administración"),
      fixedLodging: moneyField(false, "El costo de hospedaje fijo"),
      other: moneyField(false, "Los otros costos fijos"),
    }),
    variableCostsPerTourist: Yup.object({
      food: moneyField(true, "El costo de alimentación por turista"),
      tickets: moneyField(true, "El costo de entradas por turista"),
      lodging: moneyField(false, "El costo de hospedaje por turista"),
      insurance: moneyField(false, "El costo de seguro por turista"),
      other: moneyField(false, "Los otros costos por turista"),
    }),
    pricePerTourist: priceField,
    operationalMinimum: operationalMinimumField,
    planningStartedAt: dateField("El inicio del seguimiento"),
    decisionDeadline: dateField("La fecha límite de decisión"),
    source: Yup.string().oneOf(["manual", "simulated"]).optional(),
  });

export const dateRangeSchema = (options: DateRangeSchemaOptions = {}) => {
  const requireCapacity = options.requireCapacity ?? false;
  const includeEconomicPlan = options.includeEconomicPlan ?? false;

  return Yup.object()
    .shape({
      id: Yup.string().optional(),
      dates: Yup.array()
        .of(Yup.string())
        .min(1, "Debes seleccionar al menos una fecha"),
      guides: Yup.array()
        .of(Yup.string())
        .min(1, "Debes asignar al menos un guía"),
      capacity: Yup.number()
        .transform((value, originalValue) =>
          originalValue === "" || Number.isNaN(value) ? undefined : value,
        )
        .typeError("La capacidad debe ser un número válido")
        .integer("La capacidad debe ser un número entero")
        .min(1, "La capacidad debe ser mayor a 0")
        .when([], {
          is: () => requireCapacity,
          then: (schema) => schema.required("La capacidad es obligatoria"),
          otherwise: (schema) => schema.optional(),
        }),
      economicPlan: includeEconomicPlan
        ? economicPlanSchema()
        : Yup.object().optional(),
    })
    .test(
      "economic-plan-dates",
      "Revisa el orden de las fechas del plan económico.",
      function (rawValues: unknown) {
        if (!includeEconomicPlan) return true;

        const values = rawValues as DateRangeEconomicFormLike;
        const plan = values?.economicPlan;
        if (!plan) return true;

        const startDate = values.dates?.[0]
          ? dayjs(values.dates[0], "DD-MM-YYYY")
          : null;
        const startedAt = plan.planningStartedAt ?? null;
        const deadline = plan.decisionDeadline ?? null;

        if (!startedAt || !deadline || !startDate || !startDate.isValid()) {
          return true;
        }

        if (!dayjs(startedAt).isBefore(dayjs(deadline))) {
          return this.createError({
            path: "economicPlan.planningStartedAt",
            message:
              "El inicio del seguimiento debe ser anterior a la fecha límite de decisión.",
          });
        }

        if (!dayjs(deadline).isBefore(dayjs(startDate))) {
          return this.createError({
            path: "economicPlan.decisionDeadline",
            message:
              "La fecha límite de decisión debe ser anterior al inicio de la salida.",
          });
        }

        return true;
      },
    );
};
