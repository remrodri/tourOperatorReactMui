import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAnalytics } from "../context/AnalyticsContext";
import type {
  AnalyticsPredictionHorizon,
  AnalyticsPredictionState,
  AnalyticsTrendGranularity,
  AnalyticsTrendPoint,
} from "../types/AnalyticsTypes";

const numberFormat = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 2 });
const dateFormat = new Intl.DateTimeFormat("es-BO", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const formatDate = (value: string | null) =>
  value ? dateFormat.format(new Date(value)) : "No disponible";

const predictionStateCopy: Record<
  Exclude<AnalyticsPredictionState, "available">,
  { title: string; description: string }
> = {
  "no-data": {
    title: "Predicción no disponible",
    description: "La salida no dispone de los datos mínimos para reproducir una estimación.",
  },
  "insufficient-history": {
    title: "Historia insuficiente",
    description: "El corte seleccionado todavía no cuenta con historia observable suficiente. Se conserva la demanda confirmada.",
  },
  "invalid-capacity": {
    title: "Capacidad inválida",
    description: "No se publica predicción ni ocupación esperada hasta registrar una capacidad positiva y válida.",
  },
  "stale-model": {
    title: "Modelo vencido",
    description: "La versión del modelo superó su periodo de vigencia y no debe usarse para apoyar decisiones.",
  },
};

const TrendChart = ({ points }: { points: AnalyticsTrendPoint[] }) => {
  const width = 720;
  const height = 240;
  const padding = 32;
  const maxTourists = Math.max(1, ...points.map((point) => point.cumulativeTourists));
  const coordinates = points.map((point, index) => ({
    x:
      points.length === 1
        ? width / 2
        : padding + (index / (points.length - 1)) * (width - padding * 2),
    y:
      height -
      padding -
      (point.cumulativeTourists / maxTourists) * (height - padding * 2),
  }));
  const path = coordinates
    .map(({ x, y }, index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  if (points.length === 0) {
    return (
      <Alert severity="info">
        No hay actividad observada para construir una curva en esta ventana.
      </Alert>
    );
  }

  return (
    <Box>
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-labelledby="trend-chart-title trend-chart-description"
          style={{ width: "100%", minWidth: 520, maxHeight: 300 }}
        >
          <title id="trend-chart-title">Curva acumulada de turistas confirmados</title>
          <desc id="trend-chart-description">
            Evolución observada de turistas acumulados. El primer punto tiene {points[0].cumulativeTourists} y el último {points.at(-1)?.cumulativeTourists ?? 0} turistas.
          </desc>
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" opacity="0.35" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" opacity="0.35" />
          <path d={path} fill="none" stroke="#66bb6a" strokeWidth="4" />
          {coordinates.map(({ x, y }, index) => (
            <circle key={points[index].intervalStart} cx={x} cy={y} r="4" fill="#ffffff">
              <title>{`${formatDate(points[index].intervalStart)}: ${points[index].cumulativeTourists} turistas`}</title>
            </circle>
          ))}
          <text x={padding} y={height - 8} fill="currentColor" fontSize="12">
            {formatDate(points[0].intervalStart)}
          </text>
          <text x={width - padding} y={height - 8} fill="currentColor" fontSize="12" textAnchor="end">
            {formatDate(points.at(-1)?.intervalStart ?? null)}
          </text>
          <text x={padding + 4} y={padding - 8} fill="currentColor" fontSize="12">
            {maxTourists} turistas
          </text>
        </svg>
      </Box>
      <TableContainer sx={{ maxHeight: 220 }}>
        <Table size="small" aria-label="Valores exactos de la tendencia">
          <TableHead>
            <TableRow>
              <TableCell>Intervalo</TableCell>
              <TableCell align="right">Turistas nuevos</TableCell>
              <TableCell align="right">Turistas acumulados</TableCell>
              <TableCell align="right">Reservas acumuladas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.slice(-12).map((point) => (
              <TableRow key={point.intervalStart}>
                <TableCell>{formatDate(point.intervalStart)}</TableCell>
                <TableCell align="right">{point.tourists}</TableCell>
                <TableCell align="right">{point.cumulativeTourists}</TableCell>
                <TableCell align="right">{point.cumulativeBookings}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

interface AnalyticsDepartureDetailProps {
  departureId: string;
  onClose: () => void;
}

const AnalyticsDepartureDetail = ({
  departureId,
  onClose,
}: AnalyticsDepartureDetailProps) => {
  const {
    departure,
    trends,
    prediction,
    predictionMetrics,
    fetchDeparture,
    fetchTrends,
    fetchPrediction,
    fetchPredictionMetrics,
  } = useAnalytics();
  const [horizon, setHorizon] = useState<AnalyticsPredictionHorizon>(14);
  const [granularity, setGranularity] =
    useState<AnalyticsTrendGranularity>("week");

  useEffect(() => {
    void fetchDeparture(departureId);
    void fetchPredictionMetrics();
  }, [departureId, fetchDeparture, fetchPredictionMetrics]);

  useEffect(() => {
    void fetchTrends({ dateRangeId: departureId, granularity });
  }, [departureId, fetchTrends, granularity]);

  useEffect(() => {
    void fetchPrediction(departureId, horizon);
  }, [departureId, fetchPrediction, horizon]);

  const detail =
    departure.data?.data.departure.id === departureId
      ? departure.data.data.departure
      : null;
  const trendData =
    trends.data?.data.departure.id === departureId ? trends.data.data : null;
  const predictionData =
    prediction.data?.data.departureId === departureId
      ? prediction.data.data
      : null;
  const metric = useMemo(
    () =>
      predictionMetrics.data?.data.horizons.find(
        (item) => item.horizonDays === horizon,
      ) ?? null,
    [horizon, predictionMetrics.data],
  );
  const loading =
    (!detail && departure.loading) ||
    (!trendData && trends.loading) ||
    (!predictionData && prediction.loading);
  const resourceError =
    departure.error ??
    trends.error ??
    prediction.error ??
    predictionMetrics.error;
  const analysisWarnings = [
    ...(trendData ? (trends.data?.warnings ?? []) : []),
    ...(predictionData ? (prediction.data?.warnings ?? []) : []),
  ].filter((warning) => !/simulad|fictici/i.test(warning));

  const retry = () => {
    void fetchDeparture(departureId);
    void fetchTrends({ dateRangeId: departureId, granularity });
    void fetchPrediction(departureId, horizon);
    void fetchPredictionMetrics();
  };

  return (
    <Paper
      variant="outlined"
      component="section"
      aria-labelledby="departure-detail-title"
      sx={{ p: { xs: 2, md: 2.5 }, mb: 2, backgroundColor: "rgba(14, 28, 20, 0.88)" }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button startIcon={<ArrowBackIcon />} onClick={onClose}>
            Volver a salidas
          </Button>
          <Box>
            <Typography id="departure-detail-title" variant="h5" component="h2">
              {detail?.tourPackage?.name ?? "Detalle de salida"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.75 }}>
              {detail ? `${formatDate(detail.startDate)} · ${detail.destination?.name ?? "Sin destino"}` : "Cargando contexto..."}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {loading && !detail && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 4, justifyContent: "center" }}>
          <CircularProgress size={26} />
          <Typography>Cargando detalle analítico...</Typography>
        </Stack>
      )}

      {resourceError && (
        <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" size="small" onClick={retry}>Reintentar</Button>}>
          <AlertTitle>No se pudo cargar el detalle</AlertTitle>
          {resourceError}
        </Alert>
      )}

      {detail && (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 1.5, mb: 2 }}>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Capacidad</Typography>
              <Typography variant="h6">{detail.capacity ?? "No válida"}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Confirmados actuales</Typography>
              <Typography variant="h6">{detail.tourists} turistas</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Cupos confirmados disponibles</Typography>
              <Typography variant="h6">{detail.availableSlots ?? "No calculable"}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Ocupación confirmada</Typography>
              <Typography variant="h6">{detail.occupancy === null ? "No calculable" : `${numberFormat.format(detail.occupancy)} %`}</Typography>
            </Paper>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1.5fr) minmax(340px, 1fr)" }, gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="h6">Curva observada</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Turistas acumulados según fecha de creación de la reserva.
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={granularity}
                  onChange={(_, value: AnalyticsTrendGranularity | null) => value && setGranularity(value)}
                  aria-label="Granularidad de tendencia"
                >
                  <ToggleButton value="day">Día</ToggleButton>
                  <ToggleButton value="week">Semana</ToggleButton>
                  <ToggleButton value="month">Mes</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              {trends.loading && !trendData ? <CircularProgress size={24} /> : trendData ? <TrendChart points={trendData.series.points} /> : null}
              {trendData && (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
                  <Typography variant="body2">Ritmo: {numberFormat.format(trendData.rhythm.touristsPerDay)} turistas/día</Typography>
                  <Typography variant="body2">Reservas: {trendData.totals.bookings}</Typography>
                  <Typography variant="body2">Días observados: {trendData.rhythm.window.observedDays}</Typography>
                </Stack>
              )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="h6">Predicción de demanda final</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Estimación técnica; la decisión final corresponde al usuario.
                  </Typography>
                </Box>
                <Tooltip title="La banda ±MAE resume error histórico; no es un intervalo probabilístico." arrow>
                  <InfoOutlinedIcon aria-label="Información sobre la banda de predicción" />
                </Tooltip>
              </Stack>
              <ToggleButtonGroup
                exclusive
                fullWidth
                size="small"
                value={horizon}
                onChange={(_, value: AnalyticsPredictionHorizon | null) => value && setHorizon(value)}
                aria-label="Horizonte predictivo"
                sx={{ mb: 2 }}
              >
                <ToggleButton value={30}>30 días</ToggleButton>
                <ToggleButton value={14}>14 días</ToggleButton>
                <ToggleButton value={7}>7 días</ToggleButton>
              </ToggleButtonGroup>

              {prediction.loading && !predictionData && <CircularProgress size={24} />}
              {predictionData?.state === "available" ? (
                <Stack spacing={1.25}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
                    <Box>
                      <Typography variant="caption">Confirmados al corte</Typography>
                      <Typography variant="h6">{predictionData.confirmedTourists}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Esperados finales</Typography>
                      <Typography variant="h6">{predictionData.predictedFinalTourists}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    Rango de referencia: {predictionData.predictionRange?.lower ?? "—"}–{predictionData.predictionRange?.upper ?? "—"} turistas
                  </Typography>
                  <Typography variant="body2">
                    Ocupación esperada: {predictionData.expectedOccupancy === null ? "No calculable" : `${numberFormat.format(predictionData.expectedOccupancy)} %`}
                  </Typography>
                  <Divider />
                  <Typography variant="caption">Corte: {formatDate(predictionData.cutoffAt)}</Typography>
                  <Typography variant="caption">Predictor: {predictionData.predictor}</Typography>
                  <Typography variant="caption">Modelo: {predictionData.modelVersion}</Typography>
                  {metric && <Typography variant="caption">MAE de prueba: {numberFormat.format(metric.test.mae)} turistas</Typography>}
                </Stack>
              ) : predictionData ? (
                <Alert severity={predictionData.state === "stale-model" ? "warning" : "info"}>
                  <AlertTitle>{predictionStateCopy[predictionData.state].title}</AlertTitle>
                  {predictionStateCopy[predictionData.state].description}
                  {predictionData.confirmedTourists !== null && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Confirmados al corte: {predictionData.confirmedTourists} turistas.
                    </Typography>
                  )}
                </Alert>
              ) : null}
            </Paper>
          </Box>

          <Alert severity="info" sx={{ mt: 2 }}>
            Orientación: compara demanda confirmada, ritmo y estimación antes de ajustar promoción, cupos o recursos. El sistema no ejecuta decisiones automáticamente.
          </Alert>

          {analysisWarnings.length > 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <AlertTitle>Advertencias del análisis</AlertTitle>
              {[...new Set(analysisWarnings)].map((warning) => (
                <Typography variant="body2" key={warning}>• {warning}</Typography>
              ))}
            </Alert>
          )}
        </>
      )}
    </Paper>
  );
};

export default AnalyticsDepartureDetail;
