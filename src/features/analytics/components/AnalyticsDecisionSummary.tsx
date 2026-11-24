import {
  Alert,
  AlertTitle,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { AnalyticsEconomicResource } from "../types/AnalyticsTypes";
import {
  economicStatusPresentation,
  economicUrgencySeverity,
  formatAnalyticsDate,
  formatSignedAnalyticsCurrency,
} from "../utils/analyticsPresentation";

interface AnalyticsDecisionSummaryProps {
  resource: AnalyticsEconomicResource | null;
  loading: boolean;
  startDate: string | null;
}

const AnalyticsDecisionSummary = ({
  resource,
  loading,
  startDate,
}: AnalyticsDecisionSummaryProps) => {
  if (loading && !resource) {
    return (
      <Paper variant="outlined" sx={{ p: 2, mb: 2 }} component="section" aria-label="Resumen para decidir">
        <Stack direction="row" spacing={1} alignItems="center">
          <CircularProgress size={22} />
          <Typography>Estamos preparando el resumen para decidir...</Typography>
        </Stack>
      </Paper>
    );
  }
  if (!resource) return null;

  const data = resource.data;
  const recommendation = data.recommendation;
  const status = economicStatusPresentation[data.status];
  const startTime = startDate ? new Date(startDate).getTime() : Number.NaN;
  const asOfTime = new Date(recommendation.asOf).getTime();
  const historical = Number.isFinite(startTime) && Number.isFinite(asOfTime) && startTime <= asOfTime;
  const urgencyIsPrimary =
    !historical &&
    recommendation.urgency !== "not-applicable" &&
    recommendation.urgency !== "achieved" &&
    data.status !== "economic-data-missing" &&
    data.status !== "non-positive-contribution" &&
    data.status !== "capacity-insufficient";
  const invalidEconomicState =
    data.status === "economic-data-missing" ||
    data.status === "non-positive-contribution" ||
    data.status === "capacity-insufficient";
  const actions = historical
    ? []
    : invalidEconomicState
      ? status.action
        ? [status.action]
        : []
      : recommendation.actionsToEvaluate;
  const title = historical
    ? "Salida histórica"
    : urgencyIsPrimary
      ? recommendation.title
      : status.title;
  const severity = historical
    ? "info"
    : urgencyIsPrimary
      ? economicUrgencySeverity[recommendation.urgency]
      : status.severity;
  const resultDescription =
    data.confirmedResult === null
      ? "Resultado planificado: no se puede calcular"
      : `Resultado planificado: ${formatSignedAnalyticsCurrency(data.confirmedResult)}`;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, mb: 2 }}
      component="section"
      aria-labelledby="decision-summary-title"
    >
      <Typography id="decision-summary-title" variant="h6" sx={{ mb: 1 }}>
        Resumen para decidir
      </Typography>
      <Alert severity={severity}>
        <AlertTitle>{title}</AlertTitle>
        <Typography variant="body2">
          {historical
            ? `${status.title}. Esta lectura usa la información disponible antes del inicio de la salida.`
            : urgencyIsPrimary
              ? recommendation.explanation
              : status.description}
        </Typography>
        <Stack spacing={0.35} sx={{ mt: 1 }}>
          <Typography variant="body2">
            {data.confirmedTourists} confirmados · mínimo {data.finalMinimum ?? "no disponible"} · {data.missingConfirmedTourists === null ? "faltantes no calculables" : `faltan ${data.missingConfirmedTourists}`}
          </Typography>
          <Typography variant="body2">{resultDescription}</Typography>
          <Typography variant="body2">
            {historical
              ? `Corte histórico: ${formatAnalyticsDate(startDate)}`
              : recommendation.decisionDeadline
                ? `Fecha límite para revisar: ${formatAnalyticsDate(recommendation.decisionDeadline)}`
                : `Información disponible hasta: ${formatAnalyticsDate(recommendation.asOf)}`}
          </Typography>
          {actions.map((action) => (
            <Typography variant="body2" key={action}>Acción para evaluar: {action}</Typography>
          ))}
        </Stack>
      </Alert>
      <Typography variant="body2" sx={{ mt: 1 }}>
        El sistema orienta el análisis; la decisión final corresponde a la persona responsable.
      </Typography>
    </Paper>
  );
};

export default AnalyticsDecisionSummary;

