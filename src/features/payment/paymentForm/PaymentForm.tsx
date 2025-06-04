import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { PaymentFormContainerValues } from "./PaymentFormContainer";
import { FormikProps } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<PaymentFormContainerValues>;
  paymentMethods: { value: string; label: string }[];
  handleMethodChange: (method: string) => void;
  handleAmountChange: (amount: number) => void;
  handleDateChange: (date: string) => void;
}


const PaymentForm = ({ open, onClose, formik, paymentMethods, handleMethodChange, handleAmountChange, handleDateChange }: PaymentFormProps) => {
  return <Dialog
  open={open}
  onClose={onClose}
  >
    <DialogTitle>Registrar pago</DialogTitle>
    <DialogContent
    sx={{
      width:"300px",
      // display:"flex",
      // flexDirection:"column",
      // gap:"1rem",
      // pt:2,
    }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box
          sx={{
            pt:2,
            // display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box sx={{
            // mt:1,
            height:"70px",
          }}>
          <FormControl
          size="small"
          fullWidth
          error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
          >
            <InputLabel id="payment-method-label">Método de Pago</InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={formik.values.paymentMethod || ""}
              label="Método de Pago"
              onChange={(e) => {
                handleMethodChange(e.target.value);
              }}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.paymentMethod && formik.errors.paymentMethod && (
              <Typography color="error" sx={{ fontSize: "12px", mt: 1 }}>
                {formik.errors.paymentMethod}
              </Typography>
            )}
          </FormControl>

          </Box>
          {formik.values.paymentMethod !== "cash" && (
            <Box
            sx={{
              height:"70px",
            }}
            >
              <TextField
                label="ID de Transacción"
                size="small"
                fullWidth
                value={formik.values.transactionId || ""}
                onChange={formik.handleChange}
                error={formik.touched.transactionId && Boolean(formik.errors.transactionId)}
                helperText={formik.touched.transactionId && formik.errors.transactionId}
              />
            </Box>
          )}
        <Box
        sx={{
          height:"70px",
          // mt:1,
          
        }}
        >
          <TextField
            label="Monto"
            type="number"
            size="small"
            fullWidth
            value={formik.values.amount === 0 ? "" : formik.values.amount}
            onChange={(e)=>handleAmountChange(Number(e.target.value))}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Box>
        <Box
        sx={{
          height:"70px",
          // mt:1,
        }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de pago"
              value={formik.values.paymentDate ? dayjs(formik.values.paymentDate) : null}
              onChange={(date)=>handleDateChange(date?.toISOString() || "")}
              slotProps={{
                textField: {
                  size: "small",
                  fullWidth: true,
                  error: formik.touched.paymentDate && Boolean(formik.errors.paymentDate),
                  helperText: formik.touched.paymentDate && formik.errors.paymentDate,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "flex-end",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Registrar
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={onClose}
            fullWidth
            sx={{ mt: 2 }}
          >
            Cancelar
          </Button>
        </Box>
      </form>
    </DialogContent>
  </Dialog>;
};

export default PaymentForm;
