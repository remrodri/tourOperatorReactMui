import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
} from "@mui/material";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface PaymentFormProps {
  payment: Partial<PaymentInfoType>;
  onChange: (field: string, value: any) => void;
  errors?: any;
  touched?: any;
  totalPrice?: number;
  totalPaid?: number;
  currentIndex?: number;
}

const paymentMethods = [
  { value: "cash", label: "Efectivo" },
  // { value: "credit_card", label: "Tarjeta de Crédito" },
  // { value: "debit_card", label: "Tarjeta de Débito" },
  { value: "bank_transfer", label: "Transferencia Bancaria" },
  // { value: "other", label: "Otro" },
];

const PaymentForm: React.FC<PaymentFormProps> = ({
  payment,
  onChange,
  errors,
  touched,
  totalPrice = 0,
  totalPaid = 0,
  currentIndex = 0,
}) => {
  // Convert string date to dayjs object for the DatePicker
  const paymentDate = payment.paymentDate ? dayjs(payment.paymentDate) : null;

  const handleDateChange = (date: any) => {
    if (date) {
      // Format date as string in ISO format
      onChange("paymentDate", date.toISOString());
    } else {
      onChange("paymentDate", null);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Always convert to a number, use 0 when empty
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    onChange("amount", value);
  };

  // Calcular si el pago actual excede el precio total
  const currentAmount = payment.amount || 0;
  // Calcular el total pagado sin considerar el pago actual
  const otherPaymentsTotal = totalPaid - currentAmount;
  // Verificar si excede el precio total
  const willExceedTotal = otherPaymentsTotal + currentAmount > totalPrice;
  // Calcular cuánto resta por pagar
  const remainingAmount = Math.max(0, totalPrice - otherPaymentsTotal);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3, mb: 2 }}
    >
      <Typography variant="h6">Información de Pago</Typography>

      {/* Información del pago y saldo */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2">
            Precio total: {totalPrice.toFixed(2)} Bs.
          </Typography>
          <Typography variant="body2">
            Pagado hasta ahora: {otherPaymentsTotal.toFixed(2)} Bs.
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color={willExceedTotal ? "error" : "inherit"}
          fontWeight="bold"
        >
          Restante por pagar: {remainingAmount.toFixed(2)} Bs.
        </Typography>
      </Box>

      {/* Alerta de error si excede el total */}
      {willExceedTotal && (
        <Alert severity="error" sx={{ mb: 2 }}>
          El monto del pago excede el saldo pendiente por{" "}
          {(otherPaymentsTotal + currentAmount - totalPrice).toFixed(2)} Bs.
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2 }}>
        <FormControl
          size="small"
          fullWidth={payment.paymentMethod !== "cash"}
          sx={{ width: payment.paymentMethod === "cash" ? "100%" : "50%" }}
          error={touched?.paymentMethod && Boolean(errors?.paymentMethod)}
        >
          <InputLabel id="payment-method-label">Método de Pago</InputLabel>
          <Select
            labelId="payment-method-label"
            id="payment-method"
            value={payment.paymentMethod || ""}
            label="Método de Pago"
            onChange={(e) => onChange("paymentMethod", e.target.value)}
          >
            {paymentMethods.map((method) => (
              <MenuItem key={method.value} value={method.value}>
                {method.label}
              </MenuItem>
            ))}
          </Select>
          {touched?.paymentMethod && errors?.paymentMethod && (
            <Typography color="error" sx={{ fontSize: "12px", mt: 1 }}>
              {errors.paymentMethod}
            </Typography>
          )}
        </FormControl>

        {payment.paymentMethod && payment.paymentMethod !== "cash" && (
          <TextField
            label="ID de Transacción"
            size="small"
            fullWidth
            value={payment.transactionId || ""}
            onChange={(e) => onChange("transactionId", e.target.value)}
            error={touched?.transactionId && Boolean(errors?.transactionId)}
            helperText={touched?.transactionId && errors?.transactionId}
          />
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Monto"
          type="number"
          size="small"
          fullWidth
          // Show empty field when amount is 0, but store as number internally
          value={payment.amount === 0 ? "" : payment.amount}
          onChange={handleAmountChange}
          error={touched?.amount && Boolean(errors?.amount)}
          helperText={touched?.amount && errors?.amount}
        />

        <Box sx={{ width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de pago"
              value={paymentDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: touched?.paymentDate && Boolean(errors?.paymentDate),
                  helperText: touched?.paymentDate && errors?.paymentDate,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentForm;
