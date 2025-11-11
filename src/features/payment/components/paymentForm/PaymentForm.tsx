import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { PaymentFormContainerValues } from "./PaymentFormContainer";
import { FormikProps } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TouristType } from "../../../booking/types/TouristType";
import { CloudUpload } from "@mui/icons-material";
import { ChangeEvent } from "react";

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  formik: FormikProps<PaymentFormContainerValues>;
  paymentMethods: { value: string; label: string }[];
  handleMethodChange: (method: string) => void;
  handleAmountChange: (amount: number) => void;
  handleDateChange: (date: string) => void;
  tourists: TouristType[];
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  previewImage: string | null;
  fileSelected: File | null;
}

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

const PaymentForm = ({
  open,
  onClose,
  formik,
  paymentMethods,
  handleMethodChange,
  handleAmountChange,
  handleDateChange,
  tourists,
  handleFileChange,
  previewImage,
  fileSelected,
}: PaymentFormProps) => {
  // console.log('tourists::: ', tourists);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar pago</DialogTitle>
      <DialogContent
        sx={{
          width: "300px",
          // display:"flex",
          // flexDirection:"column",
          // gap:"1rem",
          // pt:2,
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              pt: 2,
              // height:"70px",
            }}
          >
            <FormControl
              size="small"
              fullWidth
              error={
                formik.touched.touristId && Boolean(formik.errors.touristId)
              }
            >
              <InputLabel id="tourist-id-label">Turista</InputLabel>
              <Select
                labelId="tourist-id-label"
                id="tourist-id"
                value={formik.values.touristId || ""}
                label="Turista"
                onChange={(e) => {
                  formik.setFieldValue("touristId", e.target.value);
                }}
              >
                {tourists.map((tourist) => (
                  <MenuItem key={tourist.id} value={tourist.id}>
                    {tourist.firstName} {tourist.lastName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.touristId && formik.errors.touristId && (
                <Typography color="error" sx={{ fontSize: "12px", mt: 1 }}>
                  {formik.errors.touristId}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Box
            sx={
              {
                // height:"70px",
                // mt:1,
              }
            }
          >
            <TextField
              label="Monto"
              type="number"
              size="small"
              fullWidth
              value={formik.values.amount === 0 ? "" : formik.values.amount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              // justifyContent: "flex-end",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "6px",
              p: "5px 10px",
            }}
          >
            <Typography variant="subtitle1">
              Fecha de pago: {formik.values.paymentDate}
            </Typography>
          </Box>

          <FormControl
            size="small"
            fullWidth
            error={
              formik.touched.paymentMethod &&
              Boolean(formik.errors.paymentMethod)
            }
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

          {formik.values.paymentMethod === "bank_transfer" && (
            <Box>
              <VisuallyHiddenInput
                id="payment-proof-image"
                name="payment-proof-image"
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
              {formik.touched.paymentProofImage &&
                formik.errors.paymentProofImage && (
                  <FormHelperText
                    error={Boolean(formik.errors?.paymentProofImage)}
                  >
                    {formik.errors?.paymentProofImage}
                  </FormHelperText>
                )}
              {previewImage && (
                <Box
                  sx={{
                    mt: 2,
                  }}
                >
                  <img
                    src={previewImage}
                    alt="payment-proof"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              )}
            </Box>
          )}

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
              variant="contained"
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
    </Dialog>
  );
};

export default PaymentForm;
