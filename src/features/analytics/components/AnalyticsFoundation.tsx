import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useAnalytics } from "../context/AnalyticsContext";
import type { AnalyticsFilters } from "../types/AnalyticsTypes";

const filterLabels: Record<keyof AnalyticsFilters, string> = {
  from: "Desde",
  to: "Hasta",
  tourPackageId: "Paquete",
  destinationId: "Destino",
  dateRangeId: "Salida",
};

const AnalyticsFoundation: React.FC = () => {
  const { overview, loading, error, fetchOverview } = useAnalytics();

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
        <Typography>Cargando contrato de analítica...</Typography>
      </Box>
    );
  }

  if (error && !overview) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={() => fetchOverview()}>
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

  if (!overview) {
    return null;
  }

  const appliedFilters = (
    Object.entries(overview.filters) as [keyof AnalyticsFilters, string][]
  ).filter(([, value]) => Boolean(value));

  return (
    <Box
      sx={{
        height: "calc(100dvh - 6.7rem)",
        overflowY: "auto",
        p: "1rem 1.5rem 2rem",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
        Analítica
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, opacity: 0.86 }}>
        Planificación comercial y operativa de salidas turísticas mediante
        analítica descriptiva y predictiva.
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        <AlertTitle>Módulo base T-808</AlertTitle>
        Esta pantalla valida el acceso, el contrato y la integración inicial. No
        incluye indicadores, gráficos ni estimaciones; esos contenidos se
        incorporarán en tareas posteriores.
      </Alert>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <Paper
          variant="outlined"
          sx={{ p: 2.5, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Analítica descriptiva</Typography>
            <Chip size="small" label="Planificada" />
          </Stack>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Resumirá la operación por salida con indicadores agregados desde el
            backend.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            {overview.capabilities.descriptive.task} ·{" "}
            {overview.capabilities.descriptive.description}
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 2.5, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6">Analítica predictiva</Typography>
            <Chip size="small" label="Planificada" />
          </Stack>
          <Typography variant="body2" sx={{ mb: 1.5 }}>
            Estimará la cantidad de turistas esperada por salida con contexto,
            métricas y estados de confiabilidad.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.75 }}>
            {overview.capabilities.predictive.task} ·{" "}
            {overview.capabilities.predictive.description}
          </Typography>
        </Paper>
      </Box>

      <Paper
        variant="outlined"
        sx={{ p: 2.5, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
      >
        <Typography variant="h6" sx={{ mb: 1 }}>
          Contrato activo
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Typography variant="body2">
            Versión: {overview.metadata.contractVersion}
          </Typography>
          <Typography variant="body2">
            Release: {overview.metadata.release}
          </Typography>
          <Typography variant="body2">
            Estado: {overview.metadata.status}
          </Typography>
          <Typography variant="body2">
            Origen de datos: {overview.privacy.dataOrigin}
          </Typography>
          <Typography variant="body2">
            Roles: {overview.access.roles.join(", ")}
          </Typography>
          <Typography variant="body2">
            Cálculo: {overview.privacy.calculationLayer}
          </Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Filtros comunes disponibles
        </Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {appliedFilters.length === 0 ? (
            <Chip size="small" label="Sin filtros aplicados" />
          ) : (
            appliedFilters.map(([key, value]) => (
              <Chip
                key={key}
                size="small"
                label={`${filterLabels[key]}: ${value}`}
              />
            ))
          )}
        </Stack>

        <Divider sx={{ my: 1.5 }} />
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Condiciones del módulo
        </Typography>
        <Stack component="ul" spacing={0.75} sx={{ m: 0, pl: 2.5 }}>
          {overview.warnings.map((warning) => (
            <Typography component="li" variant="body2" key={warning}>
              {warning}
            </Typography>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default AnalyticsFoundation;
