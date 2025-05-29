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
import type { FormikProps } from "formik";
import { BookingType } from "../types/BookingType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import TouristForm from "./TouristForm";
import PaymentForm from "./PaymentForm";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { BookingFormValues } from "./BookingFormContainer2";

interface BookingForm2Props {
  formik: FormikProps<BookingFormValues>;
  open: boolean;
  handleClick: () => void;
  tourPackages: TourPackageType[];
  dateRanges: DateRangeType[];
  handleMainTouristChange: (field: string, value: any) => void;
  handleTouristChange: (index: number, field: string, value: any) => void;
  handleRemoveTourist: (index: number) => void;
  handleAddAdditionalTourist: () => void;
  selectedTourPackage: TourPackageType | null;
  // handleRemovePayment: (index: number) => void;
  handlePaymentChange: (field: string, value: any) => void;
  totalPaid: number;
  isEditing: boolean;
  // DEFAULT_PAYMENT: PaymentInfoType;
}

const BookingForm2: React.FC<BookingForm2Props> = ({
  formik,
  open,
  handleClick,
  tourPackages,
  dateRanges,
  handleMainTouristChange,
  handleRemoveTourist,
  handleAddAdditionalTourist,
  handleTouristChange,
  selectedTourPackage,
  // handleRemovePayment,
  handlePaymentChange,
  totalPaid,
  isEditing,
  // DEFAULT_PAYMENT,
}) => {
  // console.log('isEditing::: ', isEditing);
  // console.log('booking::: ', booking);
  // console.log('formik::: ', formik.values);
  // console.log('totalPaid::: ', totalPaid);

  return (
    console.log('formik::: ', formik.values),
    <Dialog 
    open={open} 
    onClose={handleClick}
    >
      <DialogTitle>
        {formik.values.id ? "Editar Reserva" : "Nueva Reserva"}
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={formik.handleSubmit}
          style={{ padding: "0.3rem 0 0 0" }}
        >
          <Box sx={{ height: "70px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="tourPackageId">Paquete Turistico</InputLabel>
              <Select
                disabled={isEditing}
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
                    {tp.name} - {tp.price} Bs.
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
                    if (dr.dates && dr.dates.length > 0) {
                      return (
                        <MenuItem key={dr.id} value={dr.id}>
                          {dr.dates.length > 1
                            ? `${dr.dates[0]} / ${
                                dr.dates[dr.dates.length - 1]
                              }`
                            : `${dr.dates[0]}`}
                        </MenuItem>
                      );
                    }
                  })
                ) : (
                  <MenuItem value="" disabled>
                    No hay fechas disponibles
                  </MenuItem>
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
          <Box sx={{ mt: 3, mb: 2 }}>
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
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="subtitle1">
                    Turista {index + 2}
                  </Typography>
                  {!tourist.id&&(<Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => handleRemoveTourist(index)}
                  >
                    Eliminar
                  </Button>)}
                  
                </Box>
                <TouristForm
                  tourist={tourist}
                  onChange={(field, value) =>
                    handleTouristChange(index, field, value)
                  }
                  errors={
                    formik.errors.additionalTourists &&
                    (formik.errors.additionalTourists as any)[index]
                  }
                  touched={
                    formik.touched.additionalTourists &&
                    (formik.touched.additionalTourists as any)[index]
                  }
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
          <Box sx={{ height: "70px" }}>
            <TextField
              disabled
              label="Precio total"
              size="small"
              fullWidth
              {...formik.getFieldProps("totalPrice")}
                            error={
                formik.touched.totalPrice && Boolean(formik.errors.totalPrice)
              }
              helperText={
                selectedTourPackage
                  ? `Precio por persona: ${selectedTourPackage.price} Bs.`
                  : ""
              }
            />
          </Box>
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography variant="h6">Información de pago</Typography>
            {/* <Box> */}
              <PaymentForm
                payment={formik.values.firstPayment}
                onChange={(field, value) =>
                  handlePaymentChange(field, value)
                }
                errors={formik.errors.firstPayment}
                touched={formik.touched.firstPayment}
                isEditing={isEditing}
                // totalPrice={formik.values.totalPrice}
                // totalPaid={totalPaid}
                // isEditing={isEditing}
              />
            {/* </Box> */}
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
            <Button type="submit" variant="contained" fullWidth>
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
export default BookingForm2;
