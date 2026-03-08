/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
  styled,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent } from "react";
import { FormikProps } from "formik";

/* Helpers */
const getIn = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const hasError = (formik: any, path: string) =>
  Boolean(getIn(formik.touched, path) && getIn(formik.errors, path));

const helperText = (formik: any, path: string, fallback = " ") =>
  hasError(formik, path) ? String(getIn(formik.errors, path)) : fallback;

/* Microcopy */
const fieldGuides = {
  amount: "Monto inicial a pagar",
  paymentMethod: "Selecciona el método de pago",
  paymentProofImage:
    "Requerido para transferencias bancarias (JPG/PNG/WEBP, máx 2MB)",
};

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  { value: "bank_transfer", label: "Transferencia Bancaria" },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface PaymentFormProps {
  prefix: string; // "firstPayment"
  formik: FormikProps<any>;
  isEditing: boolean;
  previewImage: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  prefix,
  formik,
  isEditing,
  previewImage,
  handleFileChange,
}) => {
  const payment = getIn(formik.values, prefix) || {};
  const method = payment.paymentMethod || "";

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {/* Fecha */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "6px",
          p: "5px 10px",
        }}
      >
        <Typography variant="subtitle1">
          Fecha de pago: {payment.paymentDate}
        </Typography>
      </Box>

      {/* Monto */}
      <TextField
        label="Monto"
        size="small"
        fullWidth
        type="number"
        {...formik.getFieldProps(`${prefix}.amount`)}
        error={hasError(formik, `${prefix}.amount`)}
        helperText={helperText(formik, `${prefix}.amount`, fieldGuides.amount)}
      />

      {/* Método */}
      <FormControl
        size="small"
        fullWidth
        error={hasError(formik, `${prefix}.paymentMethod`)}
      >
        <InputLabel>Método de pago</InputLabel>
        <Select
          label="Método de pago"
          {...formik.getFieldProps(`${prefix}.paymentMethod`)}
          disabled={isEditing}
        >
          {paymentMethods.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText>
          {helperText(
            formik,
            `${prefix}.paymentMethod`,
            fieldGuides.paymentMethod,
          )}
        </FormHelperText>
      </FormControl>

      {/* Comprobante */}
      {method === "bank_transfer" && (
        <Box>
          <VisuallyHiddenInput
            id={`${prefix}-payment-proof`}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          <label htmlFor={`${prefix}-payment-proof`}>
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUpload />}
            >
              Subir comprobante
            </Button>
          </label>

          <FormHelperText
            error={hasError(formik, `${prefix}.paymentProofImage`)}
          >
            {helperText(
              formik,
              `${prefix}.paymentProofImage`,
              fieldGuides.paymentProofImage,
            )}
          </FormHelperText>

          {/* ✅ Preview real */}
          {previewImage && (
            <Box sx={{ mt: 2 }}>
              <img
                src={previewImage}
                alt="payment-proof"
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default PaymentForm;
