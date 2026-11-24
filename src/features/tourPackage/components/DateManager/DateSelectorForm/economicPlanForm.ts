import dayjs, { type Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type {
  EconomicPlanPayload,
  EconomicPlanType,
} from "../../../types/EconomicPlanType";

dayjs.extend(customParseFormat);

export type EconomicMoneyField = number | "";

export interface EconomicMoneyFieldValues {
  transportation: EconomicMoneyField;
  guide: EconomicMoneyField;
  administration: EconomicMoneyField;
  fixedLodging: EconomicMoneyField;
  other: EconomicMoneyField;
}

export interface EconomicVariableFieldValues {
  food: EconomicMoneyField;
  tickets: EconomicMoneyField;
  lodging: EconomicMoneyField;
  insurance: EconomicMoneyField;
  other: EconomicMoneyField;
}

export interface EconomicPlanFormValues {
  fixedCosts: EconomicMoneyFieldValues;
  variableCostsPerTourist: EconomicVariableFieldValues;
  pricePerTourist: EconomicMoneyField;
  operationalMinimum: EconomicMoneyField;
  planningStartedAt: Dayjs | null;
  decisionDeadline: Dayjs | null;
}

export interface EconomicPreview {
  fixedCostsTotal: number;
  variableCostPerTourist: number;
  contributionMarginPerTourist: number;
  economicMinimum: number | null;
  operationalMinimum: number | null;
  finalMinimum: number | null;
  nonPositiveContribution: boolean;
  capacityInsufficient: boolean;
}

const round2 = (value: number): number =>
  Math.round(value * 100) / 100;

const toNumber = (value: EconomicMoneyField | undefined): number => {
  if (value === "" || value === undefined || value === null) return 0;
  return Number(value);
};

export const emptyEconomicPlanFormValues = (): EconomicPlanFormValues => ({
  fixedCosts: {
    transportation: "",
    guide: "",
    administration: 0,
    fixedLodging: 0,
    other: 0,
  },
  variableCostsPerTourist: {
    food: "",
    tickets: "",
    lodging: 0,
    insurance: 0,
    other: 0,
  },
  pricePerTourist: "",
  operationalMinimum: "",
  planningStartedAt: null,
  decisionDeadline: null,
});

export const toEconomicPlanFormValues = (
  plan?: EconomicPlanType | null,
): EconomicPlanFormValues => {
  if (!plan) return emptyEconomicPlanFormValues();

  return {
    fixedCosts: {
      transportation: plan.fixedCosts.transportation,
      guide: plan.fixedCosts.guide,
      administration: plan.fixedCosts.administration,
      fixedLodging: plan.fixedCosts.fixedLodging,
      other: plan.fixedCosts.other,
    },
    variableCostsPerTourist: {
      food: plan.variableCostsPerTourist.food,
      tickets: plan.variableCostsPerTourist.tickets,
      lodging: plan.variableCostsPerTourist.lodging,
      insurance: plan.variableCostsPerTourist.insurance,
      other: plan.variableCostsPerTourist.other,
    },
    pricePerTourist: plan.pricePerTourist,
    operationalMinimum:
      typeof plan.operationalMinimum === "number"
        ? plan.operationalMinimum
        : "",
    planningStartedAt: dayjs(plan.planningStartedAt),
    decisionDeadline: dayjs(plan.decisionDeadline),
  };
};

export const buildEconomicPlanPayload = (
  values: EconomicPlanFormValues,
): EconomicPlanPayload => {
  if (!values.planningStartedAt || !values.decisionDeadline) {
    throw new Error(
      "Completa el inicio del seguimiento y la fecha límite de decisión.",
    );
  }

  const operationalMinimum =
    values.operationalMinimum === ""
      ? undefined
      : Number(values.operationalMinimum);

  return {
    fixedCosts: {
      transportation: toNumber(values.fixedCosts.transportation),
      guide: toNumber(values.fixedCosts.guide),
      administration: toNumber(values.fixedCosts.administration),
      fixedLodging: toNumber(values.fixedCosts.fixedLodging),
      other: toNumber(values.fixedCosts.other),
    },
    variableCostsPerTourist: {
      food: toNumber(values.variableCostsPerTourist.food),
      tickets: toNumber(values.variableCostsPerTourist.tickets),
      lodging: toNumber(values.variableCostsPerTourist.lodging),
      insurance: toNumber(values.variableCostsPerTourist.insurance),
      other: toNumber(values.variableCostsPerTourist.other),
    },
    pricePerTourist: toNumber(values.pricePerTourist),
    ...(operationalMinimum !== undefined ? { operationalMinimum } : {}),
    planningStartedAt: values.planningStartedAt.toISOString(),
    decisionDeadline: values.decisionDeadline.toISOString(),
  };
};

export const calculateEconomicPreview = (
  values: EconomicPlanFormValues,
  capacity?: number,
): EconomicPreview => {
  const fixed = values.fixedCosts;
  const variable = values.variableCostsPerTourist;
  const price = toNumber(values.pricePerTourist);

  const fixedCostsTotal = round2(
    toNumber(fixed.transportation) +
      toNumber(fixed.guide) +
      toNumber(fixed.administration) +
      toNumber(fixed.fixedLodging) +
      toNumber(fixed.other),
  );

  const variableCostPerTourist = round2(
    toNumber(variable.food) +
      toNumber(variable.tickets) +
      toNumber(variable.lodging) +
      toNumber(variable.insurance) +
      toNumber(variable.other),
  );

  const contributionMarginPerTourist = round2(
    price - variableCostPerTourist,
  );
  const operationalMinimum =
    values.operationalMinimum === ""
      ? null
      : Number(values.operationalMinimum);

  if (contributionMarginPerTourist <= 0) {
    return {
      fixedCostsTotal,
      variableCostPerTourist,
      contributionMarginPerTourist,
      economicMinimum: null,
      operationalMinimum,
      finalMinimum: null,
      nonPositiveContribution: true,
      capacityInsufficient: false,
    };
  }

  const economicMinimum = Math.ceil(
    fixedCostsTotal / contributionMarginPerTourist,
  );
  const finalMinimum = Math.max(economicMinimum, operationalMinimum ?? 0);

  return {
    fixedCostsTotal,
    variableCostPerTourist,
    contributionMarginPerTourist,
    economicMinimum,
    operationalMinimum,
    finalMinimum,
    nonPositiveContribution: false,
    capacityInsufficient:
      typeof capacity === "number" && capacity > 0
        ? finalMinimum > capacity
        : false,
  };
};

export const startDateFromLegacyDates = (
  dates: string[] | undefined,
): Dayjs | null => {
  const first = dates?.[0];
  if (!first) return null;
  const parsed = dayjs(first, "DD-MM-YYYY");
  return parsed.isValid() ? parsed : null;
};
