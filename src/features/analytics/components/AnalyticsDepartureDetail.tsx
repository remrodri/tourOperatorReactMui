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
import {
  analyticsNumberFormat,
  formatAnalyticsDate,
  predictionRangeHelp,
  predictionStatePresentation,
  predictorPresentation,
  presentAnalyticsWarning,
} from "../utils/analyticsPresentation";
import type {
  AnalyticsPredictionHorizon,
  AnalyticsTrendGranularity,
  AnalyticsTrendPoint,
} from "../types/AnalyticsTypes";
import AnalyticsEconomicPanel from "./AnalyticsEconomicPanel";

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
          <title id="trend-chart-title">Evolución de turistas confirmados</title>
          <desc id="trend-chart-description">
            Evolución observada de turistas acumulados. El primer punto tiene {points[0].cumulativeTourists} y el último {points.at(-1)?.cumulativeTourists ?? 0} turistas.
          </desc>
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="currentColor" opacity="0.35" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="currentColor" opacity="0.35" />
          <path d={path} fill="none" stroke="#66bb6a" strokeWidth="4" />
          {coordinates.map(({ x, y }, index) => (
            <circle key={points[index].intervalStart} cx={x} cy={y} r="4" fill="#ffffff">
              <title>{`${formatAnalyticsDate(points[index].intervalStart)}: ${points[index].cumulativeTourists} turistas`}</title>
            </circle>
          ))}
          <text x={padding} y={height - 8} fill="currentColor" fontSize="12">
            {formatAnalyticsDate(points[0].intervalStart)}
          </text>
          <text x={width - padding} y={height - 8} fill="currentColor" fontSize="12" textAnchor="end">
            {formatAnalyticsDate(points.at(-1)?.intervalStart ?? null)}
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
              <TableCell>Inicio del periodo</TableCell>
              <TableCell align="right">Turistas nuevos</TableCell>
              <TableCell align="right">Turistas acumulados</TableCell>
              <TableCell align="right">Reservas acumuladas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {points.slice(-12).map((point) => (
              <TableRow key={point.intervalStart}>
                <TableCell>{formatAnalyticsDate(point.intervalStart)}</TableCell>
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
    economics,
    fetchDeparture,
    fetchTrends,
    fetchPrediction,
    fetchPredictionMetrics,
    fetchEconomics,
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
    void fetchEconomics(departureId, horizon);
  }, [departureId, fetchEconomics, fetchPrediction, horizon]);

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
  const economicsData =
    economics.data?.data.departureId === departureId &&
    economics.data.data.predictionHorizonDays === horizon
      ? economics.data
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
    economics.error ??
    predictionMetrics.error;
  const mappedWarnings = [
    ...(trendData ? (trends.data?.warnings ?? []) : []),
    ...(predictionData ? (prediction.data?.warnings ?? []) : []),
  ]
    .map(presentAnalyticsWarning)
    .filter((warning) => warning !== null);
  const analysisWarnings = [
    ...new Map(
      mappedWarnings.map((warning) => [
        `${warning.title}-${warning.description}`,
        warning,
      ]),
    ).values(),
  ];

  const retry = () => {
    void fetchDeparture(departureId);
    void fetchTrends({ dateRangeId: departureId, granularity });
    void fetchPrediction(departureId, horizon);
    void fetchEconomics(departureId, horizon);
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
              {detail ? `${formatAnalyticsDate(detail.startDate)} · ${detail.destination?.name ?? "Destino no disponible"}` : "Estamos preparando la información..."}
            </Typography>
          </Box>
        </Stack>
      </Stack>

      {loading && !detail && (
        <Stack direction="row" spacing={1} alignItems="center" sx={{ py: 4, justifyContent: "center" }}>
          <CircularProgress size={26} />
          <Typography>Estamos preparando el detalle de la salida...</Typography>
        </Stack>
      )}

      {resourceError && (
        <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" size="small" onClick={retry}>Reintentar</Button>}>
          <AlertTitle>No pudimos actualizar el detalle</AlertTitle>
          La consulta no se completó. Revisa tu conexión o inténtalo nuevamente.
        </Alert>
      )}

      {detail && (
        <>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 1.5, mb: 2 }}>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Capacidad registrada</Typography>
              <Typography variant="h6">{detail.capacity ?? "Falta información"}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Turistas confirmados actualmente</Typography>
              <Typography variant="h6">{detail.tourists} turistas</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Cupos disponibles</Typography>
              <Typography variant="h6">{detail.availableSlots ?? "Falta información"}</Typography>
            </Paper>
            <Paper variant="outlined" sx={{ p: 1.5 }}>
              <Typography variant="caption">Ocupación confirmada</Typography>
              <Typography variant="h6">{detail.occupancy === null ? "Falta información" : `${analyticsNumberFormat.format(detail.occupancy)} %`}</Typography>
            </Paper>
          </Box>

          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1.5fr) minmax(340px, 1fr)" }, gap: 2 }}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="h6">Cómo crecieron las reservas</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Muestra cómo aumentaron los turistas confirmados a medida que se acercaba la salida.
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  exclusive
                  size="small"
                  value={granularity}
                  onChange={(_, value: AnalyticsTrendGranularity | null) => value && setGranularity(value)}
                  aria-label="Agrupar la gráfica por"
                >
                  <ToggleButton value="day">Día</ToggleButton>
                  <ToggleButton value="week">Semana</ToggleButton>
                  <ToggleButton value="month">Mes</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              {trends.loading && !trendData ? <CircularProgress size={24} /> : trendData ? <TrendChart points={trendData.series.points} /> : null}
              {trendData && (
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 1 }}>
                  <Typography variant="body2">Promedio observado: {analyticsNumberFormat.format(trendData.rhythm.touristsPerDay)} turistas nuevos por día</Typography>
                  <Typography variant="body2">Reservas: {trendData.totals.bookings}</Typography>
                  <Typography variant="body2">Días observados: {trendData.rhythm.window.observedDays}</Typography>
                </Stack>
              )}
            </Paper>

            <Paper variant="outlined" sx={{ p: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                  <Typography variant="h6">Estimación de turistas al inicio de la salida</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.75 }}>
                    Es una referencia basada en datos anteriores, no una garantía. La decisión final corresponde a la persona responsable.
                  </Typography>
                </Box>
                <Tooltip title={predictionRangeHelp.description} arrow enterTouchDelay={0} leaveTouchDelay={5000}>
                  <InfoOutlinedIcon tabIndex={0} aria-label="¿Qué significa el margen orientativo?" />
                </Tooltip>
              </Stack>
              <ToggleButtonGroup
                exclusive
                fullWidth
                size="small"
                value={horizon}
                onChange={(_, value: AnalyticsPredictionHorizon | null) => value && setHorizon(value)}
                aria-label="Días antes de la salida considerados"
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
                      <Typography variant="caption">Confirmados en la fecha de referencia</Typography>
                      <Typography variant="h6">{predictionData.confirmedTourists}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Total estimado al inicio</Typography>
                      <Typography variant="h6">{predictionData.predictedFinalTourists}</Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    Margen orientativo: entre {predictionData.predictionRange?.lower ?? "—"} y {predictionData.predictionRange?.upper ?? "—"} turistas
                  </Typography>
                  <Typography variant="body2">
                    Ocupación estimada: {predictionData.expectedOccupancy === null ? "Falta información" : `${analyticsNumberFormat.format(predictionData.expectedOccupancy)} %`}
                  </Typography>
                  <Divider />
                  <Typography variant="caption">Fecha de referencia: {formatAnalyticsDate(predictionData.cutoffAt)}</Typography>
                  <Box component="details">
                    <Typography component="summary" variant="caption" sx={{ cursor: "pointer" }}>¿Cómo se obtuvo esta estimación?</Typography>
                    <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                      <Typography variant="caption">Método utilizado: {predictionData.predictor ? predictorPresentation[predictionData.predictor] : "No disponible"}</Typography>
                      <Typography variant="caption">Versión técnica: {predictionData.modelVersion}</Typography>
                      {metric && <Typography variant="caption">Error medio observado anteriormente: {analyticsNumberFormat.format(metric.test.mae)} turistas</Typography>}
                      <Typography variant="caption">{predictionRangeHelp.description}</Typography>
                    </Stack>
                  </Box>
                </Stack>
              ) : predictionData ? (
                <Alert severity={predictionData.state === "stale-model" ? "warning" : "info"}>
                  <AlertTitle>{predictionStatePresentation[predictionData.state].title}</AlertTitle>
                  {predictionStatePresentation[predictionData.state].description}
                  {predictionStatePresentation[predictionData.state].action && (
                    <Typography variant="body2" sx={{ mt: 1 }}>{predictionStatePresentation[predictionData.state].action}</Typography>
                  )}
                  {predictionData.confirmedTourists !== null && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Confirmados en la fecha de referencia: {predictionData.confirmedTourists} turistas.
                    </Typography>
                  )}
                </Alert>
              ) : null}
            </Paper>
          </Box>

          <AnalyticsEconomicPanel
            resource={economicsData}
            loading={economics.loading}
          />

          <Alert severity="info" sx={{ mt: 2 }}>
            Para interpretar el resultado, compara los turistas confirmados, el promedio observado y la estimación antes de evaluar promoción, cupos o recursos. El sistema no toma decisiones automáticamente.
          </Alert>

          {analysisWarnings.length > 0 && (
            <Stack spacing={1} sx={{ mt: 2 }} aria-label="Información que debes considerar">
              {analysisWarnings.map((warning) => (
                <Alert severity={warning.severity} key={`${warning.title}-${warning.description}`}>
                  <AlertTitle>{warning.title}</AlertTitle>
                  {warning.description}
                  {warning.action && <Typography variant="body2">{warning.action}</Typography>}
                </Alert>
              ))}
            </Stack>
          )}
        </>
      )}
    </Paper>
  );
};

export default AnalyticsDepartureDetail;
