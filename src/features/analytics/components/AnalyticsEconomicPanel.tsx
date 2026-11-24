import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { AnalyticsEconomicResource } from "../types/AnalyticsTypes";
import {
  analyticsNumberFormat,
  economicStatusPresentation,
  economicUrgencySeverity,
  formatAnalyticsCurrency,
  formatAnalyticsDate,
} from "../utils/analyticsPresentation";

interface AnalyticsEconomicPanelProps {
  resource: AnalyticsEconomicResource | null;
  loading: boolean;
}

const Metric = ({ label, value }: { label: string; value: string }) => (
  <Paper variant="outlined" sx={{ p: 1.5 }}>
    <Typography variant="caption">{label}</Typography>
    <Typography variant="h6">{value}</Typography>
  </Paper>
);

const AnalyticsEconomicPanel = ({
  resource,
  loading,
}: AnalyticsEconomicPanelProps) => {
  if (loading && !resource) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 3 }}>
        <CircularProgress size={24} />
        <Typography>Estamos preparando la orientación económica...</Typography>
      </Stack>
    );
  }
  if (!resource) return null;

  const data = resource.data;
  const status = economicStatusPresentation[data.status];
  const recommendation = data.recommendation;
  const remaining =
    recommendation.timeFractionRemaining === null
      ? null
      : `${analyticsNumberFormat.format(recommendation.timeFractionRemaining * 100)} % del periodo de seguimiento`;
  const asOfTime = new Date(recommendation.asOf).getTime();
  const deadlineTime = recommendation.decisionDeadline
    ? new Date(recommendation.decisionDeadline).getTime()
    : Number.NaN;
  const remainingDays =
    Number.isFinite(asOfTime) && Number.isFinite(deadlineTime)
      ? Math.max(Math.ceil((deadlineTime - asOfTime) / 86_400_000), 0)
      : null;

  return (
    <Paper variant="outlined" sx={{ p: 2, mt: 2 }} component="section" aria-labelledby="economic-title">
      <Box sx={{ mb: 1.5 }}>
        <Typography id="economic-title" variant="h6">
          Planificación económica de la salida
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.75 }}>
          Compara el mínimo de turistas con las reservas actuales y, cuando está disponible, con la estimación de demanda.
        </Typography>
      </Box>

      <Alert severity={status.severity} sx={{ mb: 2 }}>
        <AlertTitle>{status.title}</AlertTitle>
        {status.description}
        {status.action && <Typography variant="body2" sx={{ mt: 0.5 }}>{status.action}</Typography>}
      </Alert>

      {data.fixedCostsTotal !== null && (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 1.25 }}>
            <Metric label="Costos fijos planificados" value={formatAnalyticsCurrency(data.fixedCostsTotal)} />
            <Metric label="Costo variable por turista" value={formatAnalyticsCurrency(data.variableCostPerTourist)} />
            <Metric label="Aporte de cada turista para cubrir costos fijos" value={formatAnalyticsCurrency(data.contributionMarginPerTourist)} />
            <Metric label="Mínimo calculado por costos" value={data.economicMinimum === null ? "No se puede calcular" : `${data.economicMinimum} turistas`} />
            <Metric label="Mínimo operativo definido" value={data.operationalMinimum === null ? "No registrado" : `${data.operationalMinimum} turistas`} />
            <Metric label="Mínimo final que debe cumplirse" value={data.finalMinimum === null ? "No se puede calcular" : `${data.finalMinimum} turistas`} />
            <Metric label="Turistas confirmados" value={`${data.confirmedTourists} turistas`} />
            <Metric label="Turistas que faltan para el mínimo" value={data.missingConfirmedTourists === null ? "No se puede calcular" : `${data.missingConfirmedTourists} turistas`} />
            <Metric label="Resultado con reservas confirmadas" value={formatAnalyticsCurrency(data.confirmedResult)} />
            {data.predictionUsed && (
              <>
                <Metric label="Turistas estimados al inicio" value={`${data.predictedFinalTourists} turistas`} />
                <Metric label="Resultado estimado" value={formatAnalyticsCurrency(data.estimatedResult)} />
              </>
            )}
          </Box>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
            “Resultado” significa ingresos estimados menos los costos planificados incluidos aquí. Es una referencia simplificada y no reemplaza un estado contable ni representa utilidad definitiva.
          </Typography>
        </>
      )}

      <Divider sx={{ my: 2 }} />
      <Alert severity={economicUrgencySeverity[recommendation.urgency]}>
        <AlertTitle>{recommendation.title}</AlertTitle>
        {recommendation.explanation}
        <Stack spacing={0.25} sx={{ mt: 1 }}>
          <Typography variant="body2">Información analizada hasta: {formatAnalyticsDate(recommendation.asOf)}</Typography>
          {recommendation.planningStartedAt && <Typography variant="body2">Seguimiento iniciado: {formatAnalyticsDate(recommendation.planningStartedAt)}</Typography>}
          {recommendation.decisionDeadline && <Typography variant="body2">Fecha límite para revisar la salida: {formatAnalyticsDate(recommendation.decisionDeadline)}</Typography>}
          {remainingDays !== null && recommendation.decisionDeadline && (
            <Typography variant="body2">
              Tiempo disponible en la fecha de referencia: {remainingDays === 0 ? "la fecha límite ya fue alcanzada" : `${remainingDays} ${remainingDays === 1 ? "día" : "días"} hasta la fecha límite`}{remaining ? ` (${remaining})` : ""}.
            </Typography>
          )}
          {recommendation.actionsToEvaluate.map((action) => (
            <Typography variant="body2" key={action}>Acción para evaluar: {action}</Typography>
          ))}
        </Stack>
      </Alert>

      <Typography variant="body2" sx={{ mt: 1.5 }}>
        Esta orientación ayuda a revisar alternativas. El sistema no mantiene, reprograma ni cancela una salida automáticamente; la decisión corresponde a la persona responsable.
      </Typography>
    </Paper>
  );
};

export default AnalyticsEconomicPanel;
