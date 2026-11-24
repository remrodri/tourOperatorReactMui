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
import {
  analyticsCurrencyFormat,
  analyticsMetricHelp,
  analyticsNumberFormat,
  formatAnalyticsDate,
  formatAnalyticsDateTime,
  formatAnalyticsPercent,
  parseAnalyticsLocalDate,
  presentAnalyticsWarning,
} from "../utils/analyticsPresentation";
import type {
  AnalyticsDeparture,
  AnalyticsFilters,
  AnalyticsSummary,
} from "../types/AnalyticsTypes";

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

const toApiFilters = (filters: FilterForm): AnalyticsFilters => {
  const from = parseAnalyticsLocalDate(filters.from);
  const to = parseAnalyticsLocalDate(filters.to);
  return {
    ...(from ? { from } : {}),
    ...(to ? { to } : {}),
    ...(filters.tourPackageId ? { tourPackageId: filters.tourPackageId } : {}),
    ...(filters.destinationId ? { destinationId: filters.destinationId } : {}),
    ...(filters.dateRangeId ? { dateRangeId: filters.dateRangeId } : {}),
  };
};

const statusLabel = (status: AnalyticsDeparture["capacityStatus"]) => {
  if (status === "invalid") return "Falta registrar la capacidad";
  if (status === "overcapacity") return "Turistas por encima de la capacidad";
  return "Ocupación disponible";
};

interface MetricCardProps {
  label: string;
  value: string;
  helper: string;
  status?: "default" | "warning";
}

const MetricCard = ({
  label,
  value,
  helper,
  status = "default",
}: MetricCardProps) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      minHeight: 118,
      backgroundColor:
        status === "warning"
          ? "rgba(255, 167, 38, 0.10)"
          : "rgba(255, 255, 255, 0.05)",
    }}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="body2" sx={{ opacity: 0.78 }}>
        {label}
      </Typography>
      <Tooltip title={helper} arrow enterTouchDelay={0} leaveTouchDelay={5000}>
        <InfoOutlinedIcon
          fontSize="small"
          tabIndex={0}
          aria-label={`¿Qué significa ${label}?`}
        />
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
      gridTemplateColumns: {
        xs: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
      },
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
      ? analyticsMetricHelp.occupancy
      : "No se puede calcular porque una o más salidas no tienen una capacidad mayor que cero. Revisa la capacidad registrada.";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: 1.5,
      }}
    >
      <MetricCard
        label="Turistas confirmados"
        value={analyticsNumberFormat.format(summary.tourists)}
        helper={analyticsMetricHelp.tourists}
      />
      <MetricCard
        label="Reservas vigentes"
        value={analyticsNumberFormat.format(summary.bookings)}
        helper={analyticsMetricHelp.bookings}
      />
      <MetricCard
        label="Personas por reserva"
        value={
          summary.averageGroupSize === null
            ? "Sin reservas"
            : `${analyticsNumberFormat.format(summary.averageGroupSize)} personas`
        }
        helper={analyticsMetricHelp.averageGroupSize}
      />
      <MetricCard
        label="Ocupación confirmada"
        value={formatAnalyticsPercent(summary.occupancy)}
        helper={capacityHelper}
        status={summary.capacityStatus === "valid" ? "default" : "warning"}
      />
      <MetricCard
        label="Importe reservado"
        value={analyticsCurrencyFormat.format(summary.reservedRevenue)}
        helper={analyticsMetricHelp.reservedRevenue}
      />
      <MetricCard
        label="Pagos registrados"
        value={analyticsCurrencyFormat.format(summary.registeredPayments)}
        helper={analyticsMetricHelp.registeredPayments}
      />
      <MetricCard
        label="Saldo pendiente"
        value={analyticsCurrencyFormat.format(summary.pendingBalance)}
        helper={analyticsMetricHelp.pendingBalance}
        status={
          summary.pendingBalanceStatus === "overpaid" ? "warning" : "default"
        }
      />
      <MetricCard
        label="Cupos disponibles"
        value={
          summary.availableSlots === null
            ? "Falta información"
            : analyticsNumberFormat.format(summary.availableSlots)
        }
        helper={analyticsMetricHelp.availableSlots}
        status={summary.availableSlots === null ? "warning" : "default"}
      />
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
  const [appliedFilters, setAppliedFilters] =
    useState<FilterForm>(emptyFilters);
  const [filterError, setFilterError] = useState<string | null>(null);
  const [selectedDepartureId, setSelectedDepartureId] = useState<string | null>(
    null,
  );
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
  const catalogDepartures = useMemo(
    () => filterCatalog.data?.departures ?? [],
    [filterCatalog.data],
  );
  const departuresInDraftPeriod = useMemo(() => {
    if (!draftFilters.from || !draftFilters.to) return catalogDepartures;
    const from = parseAnalyticsLocalDate(draftFilters.from);
    const to = parseAnalyticsLocalDate(draftFilters.to);
    if (!from || !to) return catalogDepartures;
    return catalogDepartures.filter((item) => {
      if (!item.startDate) return false;
      const date = item.startDate.slice(0, 10);
      return date >= from && date <= to;
    });
  }, [catalogDepartures, draftFilters.from, draftFilters.to]);
  const destinationOptions = useMemo(() => {
    const availableIds = new Set(
      departuresInDraftPeriod
        .map((item) => item.destination?.id)
        .filter(Boolean),
    );
    return (filterCatalog.data?.destinations ?? []).filter((item) =>
      availableIds.has(item.id),
    );
  }, [departuresInDraftPeriod, filterCatalog.data]);
  const packageOptions = useMemo(() => {
    if (!draftFilters.destinationId) return [];
    const availableIds = new Set(
      departuresInDraftPeriod
        .filter((item) => item.destination?.id === draftFilters.destinationId)
        .map((item) => item.tourPackage?.id)
        .filter(Boolean),
    );
    return (filterCatalog.data?.packages ?? []).filter((item) =>
      availableIds.has(item.id),
    );
  }, [departuresInDraftPeriod, draftFilters.destinationId, filterCatalog.data]);
  const departureOptions = useMemo(() => {
    if (!draftFilters.destinationId || !draftFilters.tourPackageId) return [];
    return departuresInDraftPeriod.filter(
      (item) =>
        item.destination?.id === draftFilters.destinationId &&
        item.tourPackage?.id === draftFilters.tourPackageId,
    );
  }, [
    departuresInDraftPeriod,
    draftFilters.destinationId,
    draftFilters.tourPackageId,
  ]);

  const activeFilterEntries = useMemo(
    () => Object.entries(appliedFilters).filter(([, value]) => value !== ""),
    [appliedFilters],
  );

  const activeFilterLabel = (key: string, value: string) => {
    if (key === "from") return `Desde: ${value}`;
    if (key === "to") return `Hasta: ${value}`;
    if (key === "tourPackageId") {
      return `Paquete: ${filterCatalog.data?.packages.find((item) => item.id === value)?.name ?? "Nombre no disponible"}`;
    }
    if (key === "destinationId") {
      return `Destino: ${filterCatalog.data?.destinations.find((item) => item.id === value)?.name ?? "Nombre no disponible"}`;
    }
    const departure = catalogDepartures.find((item) => item.id === value);
    return `Salida: ${departure ? formatAnalyticsDate(departure.startDate) : "Nombre no disponible"}`;
  };

  const requestData = (filters: FilterForm) => {
    const apiFilters = toApiFilters(filters);
    void fetchSummary(apiFilters);
    void fetchDepartures({ ...apiFilters, limit: 100 });
  };

  const applyFilters = () => {
    if (Boolean(draftFilters.from) !== Boolean(draftFilters.to)) {
      setFilterError(
        "Debes indicar ambas fechas del periodo o dejar las dos vacías.",
      );
      return;
    }
    const from = draftFilters.from
      ? parseAnalyticsLocalDate(draftFilters.from)
      : null;
    const to = draftFilters.to
      ? parseAnalyticsLocalDate(draftFilters.to)
      : null;
    if ((draftFilters.from && !from) || (draftFilters.to && !to)) {
      setFilterError("Escribe las fechas con el formato dd/mm/aaaa y verifica que sean válidas.");
      return;
    }
    if (
      from &&
      to &&
      from > to
    ) {
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

  const selectDestination = (value: string) => {
    setDraftFilters((current) => ({
      ...current,
      destinationId: value,
      tourPackageId: "",
      dateRangeId: "",
    }));
  };

  const selectPackage = (value: string) => {
    setDraftFilters((current) => ({
      ...current,
      tourPackageId: value,
      dateRangeId: "",
    }));
  };

  const updatePeriod = (field: "from" | "to", value: string) => {
    setDraftFilters((current) => {
      const next = { ...current, [field]: value };
      if (!next.from || !next.to) return next;
      const from = parseAnalyticsLocalDate(next.from);
      const to = parseAnalyticsLocalDate(next.to);
      if (!from || !to) return next;
      const compatibleDepartures = catalogDepartures.filter((item) => {
        if (!item.startDate) return false;
        const date = item.startDate.slice(0, 10);
        return date >= from && date <= to;
      });
      if (
        next.destinationId &&
        !compatibleDepartures.some(
          (item) => item.destination?.id === next.destinationId,
        )
      ) {
        return {
          ...next,
          destinationId: "",
          tourPackageId: "",
          dateRangeId: "",
        };
      }
      if (
        next.tourPackageId &&
        !compatibleDepartures.some(
          (item) =>
            item.destination?.id === next.destinationId &&
            item.tourPackage?.id === next.tourPackageId,
        )
      ) {
        return { ...next, tourPackageId: "", dateRangeId: "" };
      }
      if (
        next.dateRangeId &&
        !compatibleDepartures.some((item) => item.id === next.dateRangeId)
      ) {
        return { ...next, dateRangeId: "" };
      }
      return next;
    });
  };

  if (loading && !overview) {
    return (
      <Box
        sx={{
          height: "calc(100dvh - 6.7rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress size={28} />
        <Typography>Cargando módulo de analítica...</Typography>
      </Box>
    );
  }

  if (error && !overview) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => fetchOverview()}
            >
              Reintentar
            </Button>
          }
        >
          <AlertTitle>No se pudo cargar Analítica</AlertTitle>
          {error}
        </Alert>
      </Box>
    );
  }

  if (!overview) return null;

  const summaryData = summary.data?.data.summary;
  const departureItems = currentDepartureItems;
  const warnings = [
    ...new Set([
      ...(summary.data?.warnings ?? []),
      ...(departures.data?.warnings ?? []),
    ]),
  ]
    .map(presentAnalyticsWarning)
    .filter((warning) => warning !== null);
  const isEmpty = Boolean(summaryData && summaryData.departures === 0);

  return (
    <Box
      sx={{
        // background: "rgba(0, 0, 0, 0.44)",
        // borderRadius: "10px",
        // boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        // border: "1px solid rgba(0, 0, 0, 0.5)",
        height: "calc(100dvh - 6.7rem)",
        overflowY: "auto",
        // p: { xs: 2, md: 3 },
        p: "20px",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Box>
          <Typography variant="h4" component="h1">
            Planificación analítica
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {selectedDepartureId
              ? "Consulta el resumen y la evidencia de la salida seleccionada."
              : "Consulta reservas, ocupación y disponibilidad para apoyar la planificación de salidas turísticas. El módulo informa y orienta; la decisión final corresponde a la persona responsable."}
          </Typography>
        </Box>
        <Stack spacing={0.25} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
          {summary.data?.metadata.generatedAt && (
            <>
              <Typography variant="caption">
                Consulta generada el{" "}
                {formatAnalyticsDateTime(summary.data.metadata.generatedAt)}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Indica cuándo se preparó la consulta, no la fecha de las salidas.
              </Typography>
            </>
          )}
        </Stack>
      </Stack>
      <Box
        sx={{
          background: "rgba(0, 0, 0, 0.44)",
          borderRadius: "10px",
          border: "1px solid rgba(0, 0, 0, 0.5)",
          p: "20px",
          height: "calc(100dvh - 14.3rem)",
          overflowY: "auto",
        }}
      >
        <Paper
          variant="outlined"
          component="section"
          aria-labelledby="analytics-filters-title"
          sx={{
            p: 2,
            mb: 2,
            backgroundColor: "rgba(10, 10, 10, 0.52)",
            border: "1px solid rgba(10, 10, 10, 0.6)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(10, 10, 10, 0.6)",
          }}
        >
          <Typography id="analytics-filters-title" variant="h6">
            Selecciona las salidas que deseas analizar
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5, opacity: 0.75 }}>
            El periodo limita los destinos disponibles; después selecciona
            destino, paquete turístico y salida.
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                xl: "repeat(5, 1fr)",
              },
              gap: 1.5,
            }}
          >
            <TextField
              label="Salida desde"
              type="text"
              placeholder="dd/mm/aaaa"
              value={draftFilters.from}
              onChange={(event) => updatePeriod("from", event.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { inputMode: "numeric", maxLength: 10 },
              }}
              helperText="Formato: dd/mm/aaaa"
            />
            <TextField
              label="Salida hasta"
              type="text"
              placeholder="dd/mm/aaaa"
              value={draftFilters.to}
              onChange={(event) => updatePeriod("to", event.target.value)}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { inputMode: "numeric", maxLength: 10 },
              }}
              helperText="Formato: dd/mm/aaaa"
            />
            <FormControl>
              <InputLabel id="destination-filter-label">Destino</InputLabel>
              <Select
                labelId="destination-filter-label"
                label="Destino"
                value={draftFilters.destinationId}
                onChange={(event) => selectDestination(event.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {destinationOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name ?? "Nombre no disponible"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl disabled={!draftFilters.destinationId}>
              <InputLabel id="package-filter-label">
                Paquete turístico
              </InputLabel>
              <Select
                labelId="package-filter-label"
                label="Paquete turístico"
                value={draftFilters.tourPackageId}
                onChange={(event) => selectPackage(event.target.value)}
              >
                <MenuItem value="">Todos los paquetes del destino</MenuItem>
                {packageOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name ?? "Nombre no disponible"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl disabled={!draftFilters.tourPackageId}>
              <InputLabel id="departure-filter-label">Salida</InputLabel>
              <Select
                labelId="departure-filter-label"
                label="Salida"
                value={draftFilters.dateRangeId}
                onChange={(event) =>
                  setDraftFilters((current) => ({
                    ...current,
                    dateRangeId: event.target.value,
                  }))
                }
              >
                <MenuItem value="">Todas las salidas del paquete</MenuItem>
                {departureOptions.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {formatAnalyticsDate(item.startDate)} ·{" "}
                    {item.tourPackage?.name ?? "Nombre no disponible"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {!draftFilters.destinationId && (
            <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
              Primero selecciona un destino para habilitar los paquetes
              turísticos.
            </Typography>
          )}
          {draftFilters.destinationId && packageOptions.length === 0 && (
            <Alert severity="info" sx={{ mt: 1.5 }}>
              No hay paquetes turísticos disponibles para este destino y
              periodo.
            </Alert>
          )}
          {draftFilters.tourPackageId && departureOptions.length === 0 && (
            <Alert severity="info" sx={{ mt: 1.5 }}>
              Este paquete no tiene salidas disponibles en el periodo
              seleccionado.
            </Alert>
          )}
          {filterError && (
            <Alert severity="warning" sx={{ mt: 1.5 }}>
              {filterError}
            </Alert>
          )}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            spacing={1}
            sx={{ mt: 1.5 }}
          >
            <Stack
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              aria-label="Filtros activos"
            >
              {activeFilterEntries.length === 0 ? (
                <Chip size="small" label="Sin filtros aplicados" />
              ) : (
                activeFilterEntries.map(([key, value]) => (
                  <Chip
                    key={key}
                    size="small"
                    label={activeFilterLabel(key, value)}
                  />
                ))
              )}
            </Stack>
            <Stack direction="row" spacing={1}>
              <Button variant="text" onClick={clearFilters}>
                Limpiar
              </Button>
              <Button variant="contained" onClick={applyFilters}>
                Aplicar filtros
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {(summary.error || departures.error || filterCatalog.error) && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => {
                  requestData(appliedFilters);
                  void fetchFilterCatalog();
                }}
              >
                Reintentar
              </Button>
            }
          >
            <AlertTitle>No pudimos actualizar la información</AlertTitle>
            La consulta no se completó. Revisa tu conexión o inténtalo
            nuevamente.
          </Alert>
        )}

        <Box
          component="section"
          aria-labelledby="analytics-summary-title"
          sx={{
            mb: 2,
            backgroundColor: "rgba(10, 10, 10, 0.52)",
            border: "1px solid rgba(10, 10, 10, 0.6)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(10, 10, 10, 0.6)",
            p: 2,
          }}
        >
          <Typography id="analytics-summary-title" variant="h6" sx={{ mb: 1 }}>
            Indicadores del periodo
          </Typography>
          {summary.loading && !summaryData ? (
            <SummarySkeleton />
          ) : summaryData ? (
            <SummaryCards summary={summaryData} />
          ) : null}
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
            Ajusta o limpia los filtros para consultar otras salidas.
          </Alert>
        ) : (
          <Paper
            variant="outlined"
            component="section"
            aria-labelledby="analytics-departures-title"
            sx={{
              mb: 2,
              overflow: "hidden",
              // backgroundColor: "rgba(255, 255, 255, 0.04)",
              backgroundColor: "rgba(10, 10, 10, 0.52)",
              border: "1px solid rgba(10, 10, 10, 0.6)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(10, 10, 10, 0.6)",
              // height: "calc(100dvh - 30rem)",
              // overflowY: "auto",
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography id="analytics-departures-title" variant="h6">
                Salidas incluidas
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Se muestran {departureItems.length} salidas de la selección
                actual. Los indicadores superiores consideran todo el resultado
                filtrado.
              </Typography>
            </Box>
            {departures.loading && departureItems.length === 0 ? (
              <Box sx={{ p: 2 }}>
                <Skeleton variant="rounded" height={180} />
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: 420 }}>
                <Table
                  stickyHeader
                  size="small"
                  aria-label="Resumen de salidas turísticas"
                >
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
                        <TableCell>
                          {formatAnalyticsDate(item.startDate)}
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {item.tourPackage?.name ?? "Sin paquete"}
                          </Typography>
                          <Typography variant="caption" sx={{ opacity: 0.7 }}>
                            {item.destination?.name ?? "Sin destino"}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          {analyticsNumberFormat.format(item.tourists)}
                        </TableCell>
                        <TableCell align="right">
                          {item.capacity === null
                            ? "Falta información"
                            : analyticsNumberFormat.format(item.capacity)}
                        </TableCell>
                        <TableCell align="right">
                          {formatAnalyticsPercent(item.occupancy)}
                        </TableCell>
                        <TableCell>
                          <Chip
                            size="small"
                            color={
                              item.capacityStatus === "valid"
                                ? "success"
                                : "warning"
                            }
                            label={statusLabel(item.capacityStatus)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            size="small"
                            variant={
                              selectedDepartureId === item.id
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => setSelectedDepartureId(item.id)}
                            aria-label={`Ver detalle de ${item.tourPackage?.name ?? "la salida"} del ${formatAnalyticsDate(item.startDate)}`}
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
          <Stack spacing={1}>
            {warnings.map((warning) => (
              <Alert
                severity={warning.severity}
                key={`${warning.title}-${warning.description}`}
              >
                <AlertTitle>{warning.title}</AlertTitle>
                {warning.description}
                {warning.action && (
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {warning.action}
                  </Typography>
                )}
              </Alert>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default AnalyticsFoundation;
