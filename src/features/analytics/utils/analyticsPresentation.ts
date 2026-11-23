import type {
  AnalyticsPredictionState,
  AnalyticsPredictor,
} from "../types/AnalyticsTypes";

export type AnalyticsMessageSeverity = "info" | "warning" | "error";

export interface AnalyticsPresentationMessage {
  title: string;
  description: string;
  action?: string;
  severity: AnalyticsMessageSeverity;
}

export const analyticsNumberFormat = new Intl.NumberFormat("es-BO", {
  maximumFractionDigits: 2,
});

export const analyticsCurrencyFormat = new Intl.NumberFormat("es-BO", {
  style: "currency",
  currency: "BOB",
  maximumFractionDigits: 2,
});

export const analyticsDateFormat = new Intl.DateTimeFormat("es-BO", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

export const formatAnalyticsDate = (value: string | null | undefined) => {
  if (!value) return "Fecha no disponible";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Fecha no disponible"
    : analyticsDateFormat.format(date);
};

export const formatAnalyticsPercent = (value: number | null | undefined) =>
  value === null || value === undefined
    ? "No se puede calcular"
    : `${analyticsNumberFormat.format(value)} %`;

export const analyticsMetricHelp = {
  tourists: "Cantidad de personas con una reserva vigente en las salidas seleccionadas.",
  bookings:
    "Cantidad de reservas vigentes. Una reserva puede incluir a varias personas.",
  averageGroupSize:
    "Promedio de personas incluidas en cada reserva vigente.",
  occupancy:
    "Porcentaje de los cupos registrados que ya están ocupados por turistas con reservas vigentes.",
  reservedRevenue:
    "Importe comprometido por las reservas vigentes. No representa utilidad ni dinero ya cobrado.",
  registeredPayments:
    "Dinero registrado como pagado para las reservas vigentes seleccionadas.",
  pendingBalance:
    "Importe de las reservas vigentes que todavía no figura como pagado.",
  availableSlots:
    "Cantidad de personas adicionales que todavía pueden reservar, según la capacidad registrada.",
} as const;

export type AnalyticsMetricHelpKey = keyof typeof analyticsMetricHelp;

export const predictionStatePresentation: Record<
  Exclude<AnalyticsPredictionState, "available">,
  AnalyticsPresentationMessage
> = {
  "no-data": {
    title: "No se puede preparar una estimación",
    description:
      "Esta salida no cuenta con toda la información necesaria para estimar su demanda final.",
    action: "Revisa los datos de la salida e inténtalo nuevamente.",
    severity: "info",
  },
  "insufficient-history": {
    title: "Aún no hay suficiente información anterior",
    description:
      "Todavía no existen antecedentes suficientes para generar una estimación responsable. La demanda confirmada se mantiene disponible.",
    action: "Utiliza por ahora los turistas confirmados y vuelve a revisar más adelante.",
    severity: "info",
  },
  "invalid-capacity": {
    title: "Falta registrar una capacidad válida",
    description:
      "La capacidad debe ser mayor que cero para calcular la ocupación y presentar una estimación.",
    action: "Registra o corrige la capacidad de la salida.",
    severity: "warning",
  },
  "stale-model": {
    title: "La estimación necesita actualizarse",
    description:
      "Existen datos más recientes que todavía no fueron incorporados. Por eso no se muestra una estimación como vigente.",
    action: "Actualiza el análisis antes de utilizarlo para apoyar una decisión.",
    severity: "warning",
  },
};

export const predictorPresentation: Record<AnalyticsPredictor, string> = {
  "baseline-accumulated": "Turistas confirmados hasta la fecha de referencia",
  "baseline-historical-remaining":
    "Comportamiento restante observado en salidas anteriores",
  ridge: "Estimación basada en relaciones históricas",
  "regression-tree": "Estimación basada en patrones de salidas anteriores",
};

const countFrom = (message: string) => {
  const match = message.match(/:\s*(\d+)\s+salida/i);
  return match ? Number(match[1]) : null;
};

const warningCatalog: Record<
  string,
  (message: string) => AnalyticsPresentationMessage
> = {
  NO_DATA: () => ({
    title: "No hay información para esta consulta",
    description:
      "No se encontraron salidas o datos suficientes con la selección actual.",
    action: "Ajusta o limpia los filtros y vuelve a consultar.",
    severity: "info",
  }),
  NO_ACTIVITY: () => ({
    title: "No se registró actividad en el periodo",
    description:
      "No existen reservas incluidas dentro del periodo observado de esta salida.",
    action: "Revisa el periodo seleccionado o consulta otra salida.",
    severity: "info",
  }),
  INSUFFICIENT_HISTORY: () => predictionStatePresentation["insufficient-history"],
  PARTIAL_WINDOW: () => ({
    title: "El periodo observado todavía está abierto",
    description:
      "La información mostrada corresponde a una observación parcial y puede cambiar antes de la salida.",
    action: "Interpreta el ritmo como un avance provisional.",
    severity: "info",
  }),
  PARTIAL_BUCKET: () => ({
    title: "El primer o último periodo está incompleto",
    description:
      "Uno de los periodos de la gráfica contiene menos días que los demás y no es directamente comparable.",
    action: "Compara ese periodo con cautela.",
    severity: "info",
  }),
  INVALID_BOOKING_DATE: () => ({
    title: "Algunas reservas no pudieron incluirse en la gráfica",
    description:
      "Uno o más registros no tienen una fecha de reserva válida.",
    action: "Revisa las fechas de las reservas indicadas.",
    severity: "warning",
  }),
  EVENTS_AFTER_AS_OF: () => ({
    title: "Existen registros posteriores a la fecha analizada",
    description:
      "Esos registros no forman parte del resultado porque ocurrieron después de la fecha de referencia.",
    severity: "info",
  }),
  DEFAULT_WINDOW_TRUNCATED: () => ({
    title: "La gráfica muestra un periodo limitado",
    description:
      "Para mantener una lectura clara, solo se presenta el periodo máximo permitido.",
    severity: "info",
  }),
  INVALID_CAPACITY: () => predictionStatePresentation["invalid-capacity"],
  OVERCAPACITY: (message) => {
    const count = countFrom(message);
    return {
      title: "Hay más turistas confirmados que cupos registrados",
      description: count
        ? `${count} ${count === 1 ? "salida tiene" : "salidas tienen"} más turistas confirmados que su capacidad registrada.`
        : "La cantidad de turistas confirmados supera la capacidad registrada.",
      action: "Revisa la capacidad o las reservas de las salidas señaladas.",
      severity: "warning",
    };
  },
  OVERPAID: (message) => {
    const count = countFrom(message);
    return {
      title: "Los pagos registrados superan el importe reservado",
      description: count
        ? `Esta situación aparece en ${count} ${count === 1 ? "salida" : "salidas"}.`
        : "El total registrado como pagado es mayor que el importe de las reservas.",
      action: "Revisa los importes de las reservas y los registros de pago.",
      severity: "warning",
    };
  },
  STALE_MODEL: () => predictionStatePresentation["stale-model"],
  EXPECTED_OVERCAPACITY: () => ({
    title: "La demanda estimada supera la capacidad",
    description:
      "La cantidad estimada de turistas es mayor que los cupos registrados. El valor se conserva para mostrar la posible presión de demanda.",
    action: "Evalúa la capacidad y los recursos antes de tomar una decisión.",
    severity: "warning",
  }),
};

const fallbackWarning = (): AnalyticsPresentationMessage => ({
  title: "Revisa esta información",
  description:
    "El análisis detectó una situación que necesita atención, pero no dispone de una explicación simplificada.",
  action: "Actualiza el módulo o solicita una revisión antes de tomar una decisión.",
  severity: "warning",
});

export const presentAnalyticsWarning = (
  rawMessage: string,
): AnalyticsPresentationMessage | null => {
  if (/simulad|fictici/i.test(rawMessage)) return null;
  if (/\bMAE\b|intervalo probabil[ií]stico/i.test(rawMessage)) {
    return predictionRangeHelp;
  }
  const code = rawMessage.match(/^([A-Z][A-Z_]+):/)?.[1];
  return code && warningCatalog[code]
    ? warningCatalog[code](rawMessage)
    : fallbackWarning();
};

export const predictionRangeHelp: AnalyticsPresentationMessage = {
  title: "Margen orientativo de la estimación",
  description:
    "El rango se basa en los errores observados al evaluar el método con datos anteriores. No indica una probabilidad ni garantiza que el resultado final quede dentro del rango.",
  action: "Úsalo como referencia junto con la demanda confirmada y la capacidad.",
  severity: "info",
};

