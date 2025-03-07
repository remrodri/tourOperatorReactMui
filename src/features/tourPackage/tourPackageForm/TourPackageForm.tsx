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
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { FormikProps } from "formik";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateSelectorContainer from "./dateSelector/DateSelectorContainer";

interface TourPackageFormProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<{
    id?: string;
    name: string;
    tourType: string;
    cancellationPolicy: string;
    touristDestination: string;
    duration: number;
    selectedDates: string[];
    blockedDates: string[];
  }>;
  tourTypes: any[];
  cancellationPolicy: any[];
  touristDestinations: any[];
}

const TourPackageForm: React.FC<TourPackageFormProps> = ({
  open,
  handleClick,
  formik,
  tourTypes,
  cancellationPolicy,
  touristDestinations,
}) => {
  return (
    <Dialog open={open} onClose={handleClick} maxWidth={false}>
      <DialogTitle>Nuevo Paquete turistico</DialogTitle>
      <DialogContent
        sx={{
          width: {
            xs: "20rem",
            sm: "25rem",
            md: "45rem",
            lg: "65rem",
          },
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            padding: "0.3rem 0 0 0",
          }}
        >
          <TextField
            sx={{ height: "70px" }}
            label="Nombre"
            size="small"
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <Box
            sx={{
              height: "70px",
            }}
          >
            <FormControl size="small" fullWidth>
              <InputLabel id="tourType">Tipo de tour</InputLabel>
              <Select
                labelId="tourType"
                id="tourType"
                // name="tourType"
                label="Tipo de tour"
                {...formik.getFieldProps("tourType")}
                onChange={formik.handleChange}
                error={
                  formik.touched.tourType && Boolean(formik.errors.tourType)
                }
              >
                {tourTypes.map((tourType) => (
                  <MenuItem key={tourType.id} value={tourType.id}>
                    {tourType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.errors.tourType && (
              <Typography
                color="error"
                sx={{ fontSize: "12px", pt: "4px", pl: "12px" }}
              >
                {formik.errors.tourType}
              </Typography>
            )}
          </Box>
          <Box sx={{ height: "70px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="cancellationPolicy">
                Politica de cancelacion
              </InputLabel>
              <Select
                labelId="cancellationPolicy"
                id="cancellationPolicy"
                label="Politica de cancelacion"
                {...formik.getFieldProps("cancellationPolicy")}
                onChange={formik.handleChange}
                error={
                  formik.touched.cancellationPolicy &&
                  Boolean(formik.errors.cancellationPolicy)
                }
              >
                {cancellationPolicy.map((cp) => (
                  <MenuItem key={cp.id} value={cp.id}>
                    {cp.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.errors.cancellationPolicy && (
              <Typography
                color="error"
                sx={{ fontSize: "12px", p: "4px 0 0 12px" }}
              >
                {formik.errors.cancellationPolicy}
              </Typography>
            )}
          </Box>
          <Box sx={{ height: "70px" }}>
            <FormControl size="small" fullWidth>
              <InputLabel id="touristDestination">Destino turistico</InputLabel>
              <Select
                labelId="touristDestination"
                id="touristDestination"
                label="Destino turistico"
                {...formik.getFieldProps("touristDestination")}
                onChange={formik.handleChange}
                error={
                  formik.touched.touristDestination &&
                  Boolean(formik.errors.touristDestination)
                }
              >
                {touristDestinations.map((td) => (
                  <MenuItem key={td.id} value={td.id}>
                    {td.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formik.errors.touristDestination && (
              <Typography
                color="error"
                sx={{ fontSize: "12px", p: "4px 0 0 12px" }}
              >
                {formik.errors.touristDestination}
              </Typography>
            )}
          </Box>
          <TextField
            sx={{ height: "70px" }}
            label="Duracion (dias)"
            size="small"
            type="number"
            {...formik.getFieldProps("duration")}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0) {
                formik.setFieldValue("duration", value);
              }
            }}
            error={formik.touched.duration && Boolean(formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration}
          />
          <DateSelectorContainer
            duration={formik.values.duration}
            selectedDates={formik.values.selectedDates}
            blockedDates={formik.values.blockedDates}
            onDateChange={(dates)=>formik.setFieldValue("selectedDates",dates)}
          />
          <Box
            sx={{
              pt: "2rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            <Button variant="contained" color="success" type="submit" fullWidth>
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
export default TourPackageForm;
