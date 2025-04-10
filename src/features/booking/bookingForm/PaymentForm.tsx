import { Box, TextField } from "@mui/material";
import { PaymentInfoType } from "../types/PaymentInfoType";

interface PaymentFormProps {
  payment: Partial<PaymentInfoType>;
  onChange: (field: string, value: any) => void;
  errors?: any;
  touched?: any;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  payment,
  onChange,
  errors,
  touched,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        <TextField
          label="Monto"
          type="number"
          size="small"
          fullWidth
          value={payment.amount || 0}
          onChange={(e) => onChange("amount", Number(e.target.value))}
          error={touched?.amount && Boolean(errors?.amount)}
          helperText={touched?.amount && errors?.amount}
        />
        <TextField
          label="Fecha de pago"
          type="date"
          size="small"
          fullWidth
          value={
            payment.paymentDate
              ? new Date(payment.paymentDate).toISOString().split("T")[0]
              : ""
          }
          disabled
        />
      </Box>
    </Box>
  );
};
export default PaymentForm;
