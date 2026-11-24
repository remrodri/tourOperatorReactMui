import {
  Box,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { AnalyticsEconomicResource } from "../types/AnalyticsTypes";
import {
  formatAnalyticsCurrency,
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

    </Paper>
  );
};

export default AnalyticsEconomicPanel;
