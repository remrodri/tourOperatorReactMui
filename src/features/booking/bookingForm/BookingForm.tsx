import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { TouristType } from "../types/TouristType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { User } from "../../userManagement/types/User";
import TouristForm from "./TouristForm";
import PaymentForm from "./PaymentForm";

interface BookingFormProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<{
    id?: string;
    tourPackageId: string;
    dateRangeId: string;
    sellerId: string;
    mainTouristId?: string;
    mainTourist?: TouristType;
    additionalTouristIds: string[];
    additionalTourists: TouristType[];
    totalPrice: number;
    paymentIds: string[];
    payments: PaymentInfoType[];
    notes?: string;
    // status: "pending" | "paid" | "cancelled" | "completed";
    status: string;
  }>;
  tourPackages: TourPackageType[];
  dateRanges: DateRangeType[];
  sellers: User[];
  handleMainTouristChange: (field: string, value: any) => void;
  handleRemoveTourist: (index: number) => void;
  handleTouristChange: (index: number, field: string, value: any) => void;
  handleAddAdditionalTourist: () => void;
  handlePaymentChange: (index: number, field: string, value: any) => void;
  handleAddPayment: () => void;
  handleRemovePayment: (index: number) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  open,
  handleClick,
  formik,
  tourPackages,
  dateRanges,
  sellers,
  handleMainTouristChange,
  handleRemoveTourist,
  handleTouristChange,
  handleAddAdditionalTourist,
  handlePaymentChange,
  handleAddPayment,
  handleRemovePayment,
}) => {
  return (
    <Dialog onClose={handleClick} open={open}>
      <DialogTitle>Nueva Reserva</DialogTitle>
      <DialogContent
        sx={
          {
            // width: {
            //   xs: "10rem",
            //   sm: "15rem",
            //   md: "35rem",
            //   lg: "55rem",
            // },
          }
        }
      >
        <form
          onSubmit={(e) => {
            formik.handleSubmit(e);
          }}
          style={{ padding: "0.3rem 0 0 0" }}
        >
          <Box sx={{ height: "70px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="tourPackageId">Paquete Turistico</InputLabel>
              <Select
                labelId="tourPackageId"
                id="tourPackageId"
                label="Paquete turistico"
                {...formik.getFieldProps("tourPackageId")}
                onChange={formik.handleChange}
                error={
                  formik.touched.tourPackageId &&
                  Boolean(formik.errors.tourPackageId)
                }
              >
                {tourPackages.map((tp) => (
                  <MenuItem key={tp.id} value={tp.id}>
                    {tp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.errors.tourPackageId && (
              <Typography
                color="error"
                sx={{ fontSize: "12px", pt: "4px", pl: "12px" }}
              >
                {formik.errors.tourPackageId}
              </Typography>
            )}
          </Box>
          <Box sx={{ height: "70px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="dateRangeId">Fechas</InputLabel>
              <Select
                labelId="dateRangeId"
                id="dateRangeId"
                label="Fechas"
                {...formik.getFieldProps("dateRangeId")}
                onChange={formik.handleChange}
                error={
                  formik.touched.dateRangeId &&
                  Boolean(formik.errors.dateRangeId)
                }
              >
                {dateRanges && dateRanges.length > 0 ? (
                  dateRanges.map((dr) => {
                    if (dr.id && dr.dates && dr.dates.length > 0) {
                      return (
                        <MenuItem key={dr.id} value={dr.id}>
                          {/* {dr.dates[0]} */}
                          {dr.dates.length > 1
                            ? `${dr.dates[0]} / ${
                                dr.dates[dr.dates.length - 1]
                              }`
                            : `${dr.dates[0]}`}
                          {/* {showDateRange(dr.dates)} */}
                        </MenuItem>
                      );
                    }
                    return null;
                  })
                ) : (
                  <MenuItem disabled>No hay fechas disponibles</MenuItem>
                )}
              </Select>
            </FormControl>
            {formik.errors.dateRangeId && (
              <Typography
                color="error"
                sx={{ fontSize: "12px", pt: "4px", pl: "12px" }}
              >
                {formik.errors.dateRangeId}
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6">Turista</Typography>
            <TouristForm
              tourist={formik.values.mainTourist || {}}
              onChange={handleMainTouristChange}
              errors={formik.errors.mainTourist}
              touched={formik.touched.mainTourist}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            <Typography variant="h6">Turistas Adicionales</Typography>
            {formik.values.additionalTourists?.map((tourist, index) => (
              <Box
                key={index}
                sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    Turista {index + 1}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleRemoveTourist(index)}
                  >
                    Eliminar
                  </Button>
                </Box>
                <TouristForm
                  tourist={tourist}
                  onChange={(field, value) =>
                    handleTouristChange(index, field, value)
                  }
                  errors={formik.errors.additionalTourists?.[index]}
                  touched={formik.touched.additionalTourists?.[index]}
                />
              </Box>
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddAdditionalTourist}
              sx={{ mt: 1 }}
            >
              Agregar turista
            </Button>
          </Box>
          <TextField
            sx={{ height: "70px" }}
            label="Precio total"
            size="small"
            type="number"
            fullWidth
            {...formik.getFieldProps("totalPrice")}
            onChange={(e) => {
              const value = e.target.value === "" ? "" : Number(e.target.value);
              formik.setFieldValue("totalPrice", value);
            }}
            error={
              formik.touched.totalPrice && Boolean(formik.errors.totalPrice)
            }
            helperText={formik.touched.totalPrice && formik.errors.totalPrice}
          />
          
          <Box
            sx={{
              mt: 3,
              mb: 2,
            }}
          >
            <Typography variant="h6">Información de Pagos</Typography>
            {formik.values.payments?.map((payment, index) => (
              <Box
                key={index}
                sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    Pago {index + 1}
                  </Typography>
                  {index > 0 && (
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleRemovePayment(index)}
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>
                <PaymentForm
                  payment={payment}
                  onChange={(field, value) =>
                    handlePaymentChange(index, field, value)
                  }
                  errors={formik.errors.payments?.[index]}
                  touched={formik.touched.payments?.[index]}
                />
              </Box>
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={handleAddPayment}
              sx={{ mt: 1 }}
            >
              Agregar pago
            </Button>
          </Box>
          <TextField
            label="Notas"
            size="small"
            fullWidth
            multiline
            rows={3}
            {...formik.getFieldProps("notes")}
            onChange={formik.handleChange}
            error={formik.touched.notes && Boolean(formik.errors.notes)}
            helperText={formik.touched.notes && formik.errors.notes}
          />
          
          <Box sx={{ pt: "2rem", display: "flex", gap: "1rem" }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
            >
              Enviar
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleClick}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default BookingForm;
