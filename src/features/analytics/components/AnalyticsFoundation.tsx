import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useAnalytics } from "../context/AnalyticsContext";
import AnalyticsDepartureDetail from "./AnalyticsDepartureDetail";
import type {
  AnalyticsDeparture,
  AnalyticsFilters,
  AnalyticsSummary,
} from "../types/AnalyticsTypes";

const numberFormat = new Intl.NumberFormat("es-BO", { maximumFractionDigits: 2 });
const currencyFormat = new Intl.NumberFormat("es-BO", {
  style: "currency",
  currency: "BOB",
  maximumFractionDigits: 2,
});
const dateFormat = new Intl.DateTimeFormat("es-BO", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

interface FilterForm {
  from: string;
  to: string;
  tourPackageId: string;
  destinationId: string;
  dateRangeId: string;
}

const emptyFilters: FilterForm = {
  from: "",
  to: "",
  tourPackageId: "",
  destinationId: "",
  dateRangeId: "",
};

const toApiFilters = (filters: FilterForm): AnalyticsFilters => ({
  ...(filters.from ? { from: filters.from } : {}),
  ...(filters.to ? { to: filters.to } : {}),
  ...(filters.tourPackageId ? { tourPackageId: filters.tourPackageId } : {}),
  ...(filters.destinationId ? { destinationId: filters.destinationId } : {}),
  ...(filters.dateRangeId ? { dateRangeId: filters.dateRangeId } : {}),
});

const formatDate = (value: string | null) =>
  value ? dateFormat.format(new Date(value)) : "Fecha no disponible";

const formatPercent = (value: number | null) =>
  value === null ? "No calculable" : `${numberFormat.format(value)} %`;

const statusLabel = (status: AnalyticsDeparture["capacityStatus"]) => {
  if (status === "invalid") return "Capacidad inválida";
  if (status === "overcapacity") return "Sobrecapacidad";
  return "Capacidad válida";
};

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  status?: "default" | "warning";
}

const MetricCard = ({ label, value, helper, status = "default" }: MetricCardProps) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      minHeight: 118,
      backgroundColor:
        status === "warning" ? "rgba(255, 167, 38, 0.10)" : "rgba(255, 255, 255, 0.05)",
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" sx={{ opacity: 0.78 }}>
        {label}
      </Typography>
      <Tooltip title={helper} arrow>
        <InfoOutlinedIcon fontSize="small" aria-label={`Fórmula de ${label}`} />
      </Tooltip>
    </Stack>
    <Typography variant="h5" component="p" sx={{ mt: 1, fontWeight: 700 }}>
      {value}
    </Typography>
  </Paper>
);

const SummarySkeleton = () => (
  <Box
    aria-label="Cargando indicadores"
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
      gap: 1.5,
    }}
  >
    {Array.from({ length: 8 }, (_, index) => (
      <Skeleton key={index} variant="rounded" height={118} />
    ))}
  </Box>
);

const SummaryCards = ({ summary }: { summary: AnalyticsSummary }) => {
  const capacityHelper =
    summary.capacityStatus === "valid"
      ? `${numberFormat.format(summary.tourists)} turistas / ${numberFormat.format(summary.capacity ?? 0)} cupos × 100`
      : "No se calcula porque una o más salidas no tienen capacidad válida.";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
        gap: 1.5,
      }}
    >
      <MetricCard label="Turistas vigentes" value={numberFormat.format(summary.tourists)} helper="Suma de turistas en reservas no canceladas." />
      <MetricCard label="Reservas vigentes" value={numberFormat.format(summary.bookings)} helper="Cantidad de reservas incluidas; se excluyen las canceladas." />
      <MetricCard label="Tamaño medio de grupo" value={summary.averageGroupSize === null ? "Sin reservas" : `${numberFormat.format(summary.averageGroupSize)} turistas/reserva`} helper="Turistas vigentes divididos entre reservas vigentes." />
      <MetricCard label="Ocupación confirmada" value={formatPercent(summary.occupancy)} helper={capacityHelper} status={summary.capacityStatus === "valid" ? "default" : "warning"} />
      <MetricCard label="Ingreso reservado" value={currencyFormat.format(summary.reservedRevenue)} helper="Suma del precio de reservas incluidas. No representa utilidad ni rentabilidad." />
      <MetricCard label="Pagos registrados" value={currencyFormat.format(summary.registeredPayments)} helper="Suma de pagos válidos registrados para las reservas incluidas." />
      <MetricCard label="Saldo pendiente" value={currencyFormat.format(summary.pendingBalance)} helper="Ingreso reservado menos pagos registrados, sin mostrar saldos negativos." status={summary.pendingBalanceStatus === "overpaid" ? "warning" : "default"} />
      <MetricCard label="Cupos disponibles" value={summary.availableSlots === null ? "No calculable" : numberFormat.format(summary.availableSlots)} helper="Capacidad válida menos turistas vigentes, con mínimo cero." status={summary.availableSlots === null ? "warning" : "default"} />
    </Box>
  );
};

const AnalyticsFoundation: React.FC = () => {
  const {
    overview,
    loading,
    error,
    summary,
    departures,
    filterCatalog,
    fetchOverview,
    fetchSummary,
    fetchDepartures,
    fetchFilterCatalog,
  } = useAnalytics();
  const [draftFilters, setDraftFilters] = useState<FilterForm>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterForm>(emptyFilters);
  const [filterError, setFilterError] = useState<string | null>(null);
  const [selectedDepartureId, setSelectedDepartureId] = useState<string | null>(null);
  useEffect(() => {
    if (!overview) return;
    void fetchSummary();
    void fetchDepartures({ limit: 100 });
    void fetchFilterCatalog();
  }, [overview, fetchDepartures, fetchFilterCatalog, fetchSummary]);

  const currentDepartureItems = useMemo(
    () => departures.data?.data.items ?? [],
    [departures.data],
  );
  const packageOptions = filterCatalog.data?.packages ?? [];
  const destinationOptions = filterCatalog.data?.destinations ?? [];
  const departureOptions = filterCatalog.data?.departures ?? [];

  const activeFilterEntries = useMemo(
    () => Object.entries(appliedFilters).filter(([, value]) => value !== ""),
    [appliedFilters],
  );

  const activeFilterLabel = (key: string, value: string) => {
    if (key === "from") return `Desde: ${value}`;
    if (key === "to") return `Hasta: ${value}`;
    if (key === "tourPackageId") {
      return `Paquete: ${packageOptions.find((item) => item.id === value)?.name ?? value}`;
    }
    if (key === "destinationId") {
      return `Destino: ${destinationOptions.find((item) => item.id === value)?.name ?? value}`;
    }
    const departure = departureOptions.find((item) => item.id === value);
    return `Salida: ${departure ? formatDate(departure.startDate) : value}`;
  };

  const requestData = (filters: FilterForm) => {
    const apiFilters = toApiFilters(filters);
    void fetchSummary(apiFilters);
    void fetchDepartures({ ...apiFilters, limit: 100 });
  };

  const applyFilters = () => {
    if (Boolean(draftFilters.from) !== Boolean(draftFilters.to)) {
      setFilterError("Debes indicar ambas fechas del periodo o dejar las dos vacías.");
      return;
    }
    if (draftFilters.from && draftFilters.to && draftFilters.from > draftFilters.to) {
      setFilterError("La fecha desde no puede ser posterior a la fecha hasta.");
      return;
    }
    setFilterError(null);
    setAppliedFilters(draftFilters);
    requestData(draftFilters);
  };

  const clearFilters = () => {
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    setFilterError(null);
    requestData(emptyFilters);
  };

  if (loading && !overview) {
    return (
      <Box sx={{ height: "calc(100dvh - 6.7rem)", display: "flex", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <CircularProgress size={28} />
        <Typography>Cargando módulo de analítica...</Typography>
      </Box>
    );
  }

  if (error && !overview) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" action={<Button color="inherit" size="small" onClick={() => fetchOverview()}>Reintentar</Button>}>
          <AlertTitle>No se pudo cargar Analítica</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!overview) return null;

  const summaryData = summary.data?.data.summary;
  const departureItems = currentDepartureItems;
  const warnings = [...new Set([...(summary.data?.warnings ?? []), ...(departures.data?.warnings ?? [])])]
    .filter((warning) => !/simulad|fictici/i.test(warning));
  const isEmpty = Boolean(summaryData && summaryData.departures === 0);

  return (
    <Box sx={{ height: "calc(100dvh - 6.7rem)", overflowY: "auto", p: { xs: 2, md: 3 } }}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" component="h1">Planificación analítica</Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            Resumen descriptivo para apoyar decisiones sobre salidas turísticas.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {summary.data?.metadata.generatedAt && (
            <Typography variant="caption">
              Actualizado {new Date(summary.data.metadata.generatedAt).toLocaleString("es-BO")}
            </Typography>
          )}
        </Stack>
      </Stack>

      <Paper variant="outlined" component="section" aria-labelledby="analytics-filters-title" sx={{ p: 2, mb: 2, backgroundColor: "rgba(255, 255, 255, 0.05)" }}>
        <Typography id="analytics-filters-title" variant="h6" sx={{ mb: 1.5 }}>Filtros por fecha de salida</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", xl: "repeat(5, 1fr)" }, gap: 1.5 }}>
          <TextField label="Desde" type="date" value={draftFilters.from} onChange={(event) => setDraftFilters((current) => ({ ...current, from: event.target.value }))} slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="Hasta" type="date" value={draftFilters.to} onChange={(event) => setDraftFilters((current) => ({ ...current, to: event.target.value }))} slotProps={{ inputLabel: { shrink: true } }} />
          <FormControl>
            <InputLabel id="package-filter-label">Paquete</InputLabel>
            <Select labelId="package-filter-label" label="Paquete" value={draftFilters.tourPackageId} onChange={(event) => setDraftFilters((current) => ({ ...current, tourPackageId: event.target.value }))}>
              <MenuItem value="">Todos</MenuItem>
              {packageOptions.map((item) => <MenuItem key={item.id} value={item.id}>{item.name ?? item.id}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="destination-filter-label">Destino</InputLabel>
            <Select labelId="destination-filter-label" label="Destino" value={draftFilters.destinationId} onChange={(event) => setDraftFilters((current) => ({ ...current, destinationId: event.target.value }))}>
              <MenuItem value="">Todos</MenuItem>
              {destinationOptions.map((item) => <MenuItem key={item.id} value={item.id}>{item.name ?? item.id}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="departure-filter-label">Salida</InputLabel>
            <Select labelId="departure-filter-label" label="Salida" value={draftFilters.dateRangeId} onChange={(event) => setDraftFilters((current) => ({ ...current, dateRangeId: event.target.value }))}>
              <MenuItem value="">Todas</MenuItem>
              {departureOptions.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {formatDate(item.startDate)} · {item.tourPackage?.name ?? "Sin paquete"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {filterError && <Alert severity="warning" sx={{ mt: 1.5 }}>{filterError}</Alert>}
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1} sx={{ mt: 1.5 }}>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" aria-label="Filtros activos">
            {activeFilterEntries.length === 0 ? <Chip size="small" label="Sin filtros aplicados" /> : activeFilterEntries.map(([key, value]) => <Chip key={key} size="small" label={activeFilterLabel(key, value)} />)}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="text" onClick={clearFilters}>Limpiar</Button>
            <Button variant="contained" onClick={applyFilters}>Aplicar filtros</Button>
          </Stack>
        </Stack>
      </Paper>

      {(summary.error || departures.error || filterCatalog.error) && (
        <Alert severity="error" sx={{ mb: 2 }} action={<Button color="inherit" size="small" onClick={() => { requestData(appliedFilters); void fetchFilterCatalog(); }}>Reintentar</Button>}>
          <AlertTitle>No se pudo actualizar el resumen</AlertTitle>
          {summary.error ?? departures.error ?? filterCatalog.error}
        </Alert>
      )}

      <Box component="section" aria-labelledby="analytics-summary-title" sx={{ mb: 2 }}>
        <Typography id="analytics-summary-title" variant="h6" sx={{ mb: 1 }}>Indicadores del periodo</Typography>
        {summary.loading && !summaryData ? <SummarySkeleton /> : summaryData ? <SummaryCards summary={summaryData} /> : null}
      </Box>

      {selectedDepartureId && (
        <AnalyticsDepartureDetail
          departureId={selectedDepartureId}
          onClose={() => setSelectedDepartureId(null)}
        />
      )}

      {isEmpty ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          <AlertTitle>Sin resultados para los filtros</AlertTitle>
          Ajusta o limpia los filtros para consultar otras salidas. No se inventaron valores para este periodo.
        </Alert>
      ) : (
        <Paper variant="outlined" component="section" aria-labelledby="analytics-departures-title" sx={{ mb: 2, overflow: "hidden", backgroundColor: "rgba(255, 255, 255, 0.04)" }}>
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography id="analytics-departures-title" variant="h6">Salidas incluidas</Typography>
            <Typography variant="caption" sx={{ opacity: 0.75 }}>
              Primeras {departureItems.length} salidas agregadas; los indicadores se calculan en el backend.
            </Typography>
          </Box>
          {departures.loading && departureItems.length === 0 ? (
            <Box sx={{ p: 2 }}><Skeleton variant="rounded" height={180} /></Box>
          ) : (
            <TableContainer sx={{ maxHeight: 420 }}>
              <Table stickyHeader size="small" aria-label="Resumen de salidas turísticas">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Paquete / destino</TableCell>
                    <TableCell align="right">Turistas</TableCell>
                    <TableCell align="right">Capacidad</TableCell>
                    <TableCell align="right">Ocupación</TableCell>
                    <TableCell>Estado de capacidad</TableCell>
                    <TableCell align="right">Detalle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {departureItems.map((item) => (
                    <TableRow hover key={item.id}>
                      <TableCell>{formatDate(item.startDate)}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{item.tourPackage?.name ?? "Sin paquete"}</Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7 }}>{item.destination?.name ?? "Sin destino"}</Typography>
                      </TableCell>
                      <TableCell align="right">{numberFormat.format(item.tourists)}</TableCell>
                      <TableCell align="right">{item.capacity === null ? "—" : numberFormat.format(item.capacity)}</TableCell>
                      <TableCell align="right">{formatPercent(item.occupancy)}</TableCell>
                      <TableCell>
                        <Chip size="small" color={item.capacityStatus === "valid" ? "success" : "warning"} label={statusLabel(item.capacityStatus)} />
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          size="small"
                          variant={selectedDepartureId === item.id ? "contained" : "outlined"}
                          onClick={() => setSelectedDepartureId(item.id)}
                          aria-label={`Ver detalle de ${item.tourPackage?.name ?? "la salida"} del ${formatDate(item.startDate)}`}
                        >
                          Ver detalle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}

      {warnings.length > 0 && (
        <Alert severity="warning">
          <AlertTitle>Advertencias y alcance</AlertTitle>
          <Stack component="ul" spacing={0.5} sx={{ m: 0, pl: 2.5 }}>
            {warnings.map((warning) => <Typography component="li" variant="body2" key={warning}>{warning}</Typography>)}
          </Stack>
        </Alert>
      )}
    </Box>
  );
};

export default AnalyticsFoundation;
