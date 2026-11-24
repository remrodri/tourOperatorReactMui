import {
  Alert,
  Box,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import type { Dayjs } from "dayjs";
import { FormikProps, getIn } from "formik";
import type { DateRangeFormValues } from "./DateSelectorFormContainer";
import {
  calculateEconomicPreview,
  type EconomicMoneyField,
} from "./economicPlanForm";

interface EconomicPlanFieldsProps {
  formik: FormikProps<DateRangeFormValues>;
  capacity?: number;
  startDate: Dayjs | null;
}

interface MoneyFieldProps {
  label: string;
  value: EconomicMoneyField;
  helperText?: string;
  required?: boolean;
  error?: string;
  onChange: (value: EconomicMoneyField) => void;
  onBlur: () => void;
}

const HelpTooltip: React.FC<{ text: string }> = ({ text }) => (
  <Tooltip title={text} arrow>
    <InfoOutlinedIcon
      fontSize="small"
      color="action"
      aria-label={text}
      sx={{ ml: 0.5, verticalAlign: "middle", cursor: "help" }}
    />
  </Tooltip>
);

const formatBolivianos = (value: number | null): string =>
  value === null ? "—" : `Bs ${value.toFixed(2)}`;

const formatTourists = (value: number | null): string =>
  value === null ? "—" : `${value} turista${value === 1 ? "" : "s"}`;

const MoneyField: React.FC<MoneyFieldProps> = ({
  label,
  value,
  helperText,
  required,
  error,
  onChange,
  onBlur,
}) => (
  <TextField
    label={label}
    type="number"
    value={value}
    onChange={(event) => {
      const raw = event.target.value;
      onChange(raw === "" ? "" : Number(raw));
    }}
    onBlur={onBlur}
    fullWidth
    required={required}
    inputProps={{ min: 0, step: "0.01" }}
    InputProps={{
      startAdornment: <InputAdornment position="start">Bs</InputAdornment>,
    }}
    error={Boolean(error)}
    helperText={error ?? helperText}
  />
);

const SectionTitle: React.FC<{ children: React.ReactNode; help: string }> = ({
  children,
  help,
}) => (
  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
    {children}
    <HelpTooltip text={help} />
  </Typography>
);

const EconomicPlanFields: React.FC<EconomicPlanFieldsProps> = ({
  formik,
  capacity,
  startDate,
}) => {
  const values = formik.values.economicPlan;
  const preview = calculateEconomicPreview(values, capacity);

  const getError = (path: string): string | undefined => {
    const touched = getIn(formik.touched, path);
    const error = getIn(formik.errors, path);
    return touched && typeof error === "string" ? error : undefined;
  };

  const setField = (path: string, value: EconomicMoneyField) => {
    formik.setFieldValue(`economicPlan.${path}`, value);
  };

  const blurField = (path: string) => {
    formik.setFieldTouched(`economicPlan.${path}`, true, false);
  };

  const setStartedAt = (value: Dayjs | null) => {
    formik.setFieldValue("economicPlan.planningStartedAt", value);
    formik.setFieldTouched("economicPlan.planningStartedAt", true, false);
  };

  const setDeadline = (value: Dayjs | null) => {
    formik.setFieldValue("economicPlan.decisionDeadline", value);
    formik.setFieldTouched("economicPlan.decisionDeadline", true, false);
  };

  const startedAt = values.planningStartedAt ?? null;
  const deadline = values.decisionDeadline ?? null;

  return (
    <Stack spacing={3}>
      <Alert severity="info">
        Los importes están en bolivianos (Bs) y son valores planificados, no
        registros contables reales. El resumen es una vista previa; el sistema
        valida el cálculo al guardar.
      </Alert>

      <Box>
        <SectionTitle help="Gasto que no cambia con la cantidad de turistas, como el transporte o el guía.">
          1. Costos fijos de la salida
        </SectionTitle>
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <MoneyField
            label="Transporte"
            required
            value={values.fixedCosts.transportation}
            error={getError("economicPlan.fixedCosts.transportation")}
            onChange={(value) =>
              setField("fixedCosts.transportation", value)
            }
            onBlur={() => blurField("fixedCosts.transportation")}
          />
          <MoneyField
            label="Guía"
            required
            value={values.fixedCosts.guide}
            error={getError("economicPlan.fixedCosts.guide")}
            onChange={(value) => setField("fixedCosts.guide", value)}
            onBlur={() => blurField("fixedCosts.guide")}
          />
          <MoneyField
            label="Administración"
            value={values.fixedCosts.administration}
            helperText="Si no aplica, deja 0."
            error={getError("economicPlan.fixedCosts.administration")}
            onChange={(value) =>
              setField("fixedCosts.administration", value)
            }
            onBlur={() => blurField("fixedCosts.administration")}
          />
          <MoneyField
            label="Hospedaje fijo"
            value={values.fixedCosts.fixedLodging}
            helperText="Si no aplica, deja 0."
            error={getError("economicPlan.fixedCosts.fixedLodging")}
            onChange={(value) =>
              setField("fixedCosts.fixedLodging", value)
            }
            onBlur={() => blurField("fixedCosts.fixedLodging")}
          />
          <MoneyField
            label="Otros costos fijos"
            value={values.fixedCosts.other}
            helperText="Si no aplica, deja 0."
            error={getError("economicPlan.fixedCosts.other")}
            onChange={(value) => setField("fixedCosts.other", value)}
            onBlur={() => blurField("fixedCosts.other")}
          />
        </Box>
      </Box>

      <Divider />

      <Box>
        <SectionTitle help="Gasto que aumenta con cada turista, como la alimentación o las entradas.">
          2. Costos por cada turista
        </SectionTitle>
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <MoneyField
            label="Alimentación"
            required
            value={values.variableCostsPerTourist.food}
            error={getError("economicPlan.variableCostsPerTourist.food")}
            onChange={(value) =>
              setField("variableCostsPerTourist.food", value)
            }
            onBlur={() => blurField("variableCostsPerTourist.food")}
          />
          <MoneyField
            label="Entradas"
            required
            value={values.variableCostsPerTourist.tickets}
            error={getError("economicPlan.variableCostsPerTourist.tickets")}
            onChange={(value) =>
              setField("variableCostsPerTourist.tickets", value)
            }
            onBlur={() => blurField("variableCostsPerTourist.tickets")}
          />
          <MoneyField
            label="Hospedaje por turista"
            value={values.variableCostsPerTourist.lodging}
            helperText="Si no aplica, deja 0."
            error={getError("economicPlan.variableCostsPerTourist.lodging")}
            onChange={(value) =>
              setField("variableCostsPerTourist.lodging", value)
            }
            onBlur={() => blurField("variableCostsPerTourist.lodging")}
          />
          <MoneyField
            label="Seguro por turista"
            value={values.variableCostsPerTourist.insurance}
            helperText="Si no aplica, deja 0."
            error={getError("economicPlan.variableCostsPerTourist.insurance")}
            onChange={(value) =>
              setField("variableCostsPerTourist.insurance", value)
            }
            onBlur={() => blurField("variableCostsPerTourist.insurance")}
          />
          <MoneyField
            label="Otros costos por turista"
            value={values.variableCostsPerTourist.other}
            helperText="Si no aplica, deja 0."
            error={getError("economicPlan.variableCostsPerTourist.other")}
            onChange={(value) =>
              setField("variableCostsPerTourist.other", value)
            }
            onBlur={() => blurField("variableCostsPerTourist.other")}
          />
        </Box>
      </Box>

      <Divider />

      <Box>
        <SectionTitle help="Precio de venta previsto para cada turista y cantidad mínima que exige la operación.">
          3. Precio y mínimo operativo
        </SectionTitle>
        <Box
          sx={{
            mt: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 2,
          }}
        >
          <MoneyField
            label="Precio planificado por turista"
            required
            value={values.pricePerTourist}
            error={getError("economicPlan.pricePerTourist")}
            onChange={(value) => setField("pricePerTourist", value)}
            onBlur={() => blurField("pricePerTourist")}
          />
          <TextField
            label={
              <>
                Mínimo operativo
                <HelpTooltip text="Cantidad mínima que la operación exige, aunque el punto de equilibrio sea menor. Es opcional." />
              </>
            }
            type="number"
            value={values.operationalMinimum}
            onChange={(event) => {
              const raw = event.target.value;
              setField(
                "operationalMinimum",
                raw === "" ? "" : Number(raw),
              );
            }}
            onBlur={() => blurField("operationalMinimum")}
            fullWidth
            inputProps={{ min: 1, step: 1 }}
            InputProps={{ startAdornment: <InputAdornment position="start">#</InputAdornment> }}
            error={Boolean(getError("economicPlan.operationalMinimum"))}
            helperText={
              getError("economicPlan.operationalMinimum") ??
              "Opcional. Déjalo vacío si no aplica."
            }
          />
        </Box>
      </Box>

      <Divider />

      <Box>
        <SectionTitle help="El seguimiento empieza cuando se abre el plan y termina en la fecha límite para decidir.">
          4. Fechas de planificación
        </SectionTitle>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {startDate
            ? `La salida comienza el ${startDate.format("DD-MM-YYYY")}.`
            : "Selecciona primero la fecha de la salida."}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
            }}
          >
            <DatePicker
              label="Inicio del seguimiento"
              value={startedAt}
              onChange={setStartedAt}
              format="DD-MM-YYYY"
              maxDate={
                deadline
                  ? deadline.subtract(1, "day")
                  : startDate
                    ? startDate.subtract(1, "day")
                    : undefined
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(
                    getError("economicPlan.planningStartedAt"),
                  ),
                  helperText: getError("economicPlan.planningStartedAt"),
                },
              }}
            />
            <DatePicker
              label={
                <>
                  Fecha límite de decisión
                  <HelpTooltip text="Último día para decidir si la salida continúa. Debe ser anterior al inicio de la salida." />
                </>
              }
              value={deadline}
              onChange={setDeadline}
              format="DD-MM-YYYY"
              minDate={startedAt ? startedAt.add(1, "day") : undefined}
              maxDate={
                startDate ? startDate.subtract(1, "day") : undefined
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: Boolean(
                    getError("economicPlan.decisionDeadline"),
                  ),
                  helperText: getError("economicPlan.decisionDeadline"),
                },
              }}
            />
          </Box>
        </LocalizationProvider>
      </Box>

      <Divider />

      <Box>
        <SectionTitle help="Vista previa calculada mientras completas los datos. No representa utilidad ni rentabilidad real.">
          5. Resumen calculado
        </SectionTitle>
        <Stack spacing={1} sx={{ mt: 2 }}>
          <SummaryRow
            label="Total de costos fijos"
            value={formatBolivianos(preview.fixedCostsTotal)}
            help="Gasto que no cambia con la cantidad de turistas."
          />
          <SummaryRow
            label="Costo por turista"
            value={formatBolivianos(preview.variableCostPerTourist)}
            help="Gasto que aumenta con cada turista."
          />
          <SummaryRow
            label="Margen disponible por turista"
            value={formatBolivianos(preview.contributionMarginPerTourist)}
            help="Lo que queda de cada precio después de cubrir su costo por turista."
          />
          <SummaryRow
            label="Mínimo económico (punto de equilibrio)"
            value={formatTourists(preview.economicMinimum)}
            help="Cantidad de turistas necesaria para cubrir los costos fijos."
          />
          <SummaryRow
            label="Mínimo operativo"
            value={
              preview.operationalMinimum === null
                ? "No definido"
                : formatTourists(preview.operationalMinimum)
            }
            help="Cantidad mínima que exige la operación, si se definió."
          />
          <SummaryRow
            label="Mínimo final"
            value={formatTourists(preview.finalMinimum)}
            help="El mayor entre el mínimo económico y el mínimo operativo."
          />
        </Stack>

        {preview.nonPositiveContribution && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            El precio por turista no supera el costo por turista. Aumenta el
            precio o reduce los costos variables para poder calcular el punto
            de equilibrio.
          </Alert>
        )}

        {preview.capacityInsufficient && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            El mínimo final ({formatTourists(preview.finalMinimum)}) supera la
            capacidad de la salida
            {typeof capacity === "number" ? ` (${capacity} cupos)` : ""}. Se
            conserva el valor sin recortarlo; revisa la capacidad o los costos.
          </Alert>
        )}

        {!preview.nonPositiveContribution &&
          preview.fixedCostsTotal === 0 &&
          !preview.capacityInsufficient && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No se registraron costos fijos. El mínimo económico es cero y, si
              existe un mínimo operativo, este eleva el mínimo final.
            </Alert>
          )}
      </Box>
    </Stack>
  );
};

const SummaryRow: React.FC<{
  label: string;
  value: string;
  help: string;
}> = ({ label, value, help }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 2,
      borderBottom: "1px solid",
      borderColor: "divider",
      pb: 0.5,
    }}
  >
    <Typography variant="body2">
      {label}
      <HelpTooltip text={help} />
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600 }}>
      {value}
    </Typography>
  </Box>
);

export default EconomicPlanFields;
