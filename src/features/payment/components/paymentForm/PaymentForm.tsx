/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { TouristType } from "../../../booking/types/TouristType";
import { Close, CloudUpload } from "@mui/icons-material";
import { ChangeEvent } from "react";

/* ============================
   Helpers (igual que otros forms)
============================ */
const getIn = (obj: any, path: string) =>
  path.split(".").reduce((acc, key) => acc?.[key], obj);

const hasError = (formik: any, path: string) =>
  Boolean(getIn(formik.touched, path) && getIn(formik.errors, path));

const helperText = (formik: any, path: string, fallback = " ") =>
  hasError(formik, path) ? String(getIn(formik.errors, path)) : fallback;

/* ============================
   Microcopy
============================ */
const fieldGuides = {
  touristId: "Selecciona el turista que realiza el pago",
  amount: "Monto a registrar",
  paymentMethod: "Selecciona el método de pago",
  paymentProofImage: "Requerido para transferencias bancarias",
};

/* ============================
   Hidden input
============================ */
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

/* ============================
   Props
============================ */
interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<any>;
  tourists: TouristType[];
  paymentMethods: { value: string; label: string }[];
  previewImage: string | null;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/* ============================
   Component
============================ */
const PaymentForm: React.FC<PaymentFormProps> = ({
  open,
  onClose,
  formik,
  tourists,
  paymentMethods,
  previewImage,
  handleFileChange,
}) => {
  const method = formik.values.paymentMethod;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Registrar pago
        <IconButton
          aria-label="close"
          onClick={onClose}
          disabled={formik.isSubmitting}
          sx={{ position: "absolute", right: 12, top: 12 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          {/* Turista */}
          <FormControl
            size="small"
            fullWidth
            error={hasError(formik, "touristId")}
          >
            <InputLabel>Turista</InputLabel>
            <Select label="Turista" {...formik.getFieldProps("touristId")}>
              {tourists.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.firstName} {t.lastName}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {helperText(formik, "touristId", fieldGuides.touristId)}
            </FormHelperText>
          </FormControl>

          {/* Monto */}
          <TextField
            label="Monto"
            type="number"
            size="small"
            fullWidth
            {...formik.getFieldProps("amount")}
            error={hasError(formik, "amount")}
            helperText={helperText(formik, "amount", fieldGuides.amount)}
          />

          {/* Fecha */}
          <Box
            sx={{
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "6px",
              p: "6px 10px",
            }}
          >
            <Typography variant="subtitle2">
              Fecha de pago: {formik.values.paymentDate}
            </Typography>
          </Box>

          {/* Método */}
          <FormControl
            size="small"
            fullWidth
            error={hasError(formik, "paymentMethod")}
          >
            <InputLabel>Método de pago</InputLabel>
            <Select
              label="Método de pago"
              {...formik.getFieldProps("paymentMethod")}
            >
              {paymentMethods.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>

            <FormHelperText>
              {helperText(formik, "paymentMethod", fieldGuides.paymentMethod)}
            </FormHelperText>
          </FormControl>

          {/* Comprobante */}
          {method === "bank_transfer" && (
            <Box>
              <VisuallyHiddenInput
                id="payment-proof-image"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <label htmlFor="payment-proof-image">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Subir comprobante
                </Button>
              </label>

              <FormHelperText error={hasError(formik, "paymentProofImage")}>
                {helperText(
                  formik,
                  "paymentProofImage",
                  fieldGuides.paymentProofImage,
                )}
              </FormHelperText>

              {previewImage && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={previewImage}
                    alt="Comprobante"
                    style={{ width: "100%", borderRadius: "6px" }}
                  />
                </Box>
              )}
            </Box>
          )}

          {/* Acciones */}
          <Box sx={{ display: "flex", gap: "1rem", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={formik.isSubmitting}
            >
              Registrar
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={onClose}
              disabled={formik.isSubmitting}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentForm;
