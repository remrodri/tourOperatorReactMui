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

interface TourPackageFormProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<{
    id?: string;
    name: string;
    tourType: string;
    cancellationPolicy: string;
    touristDestination: string;
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
    <Dialog
      open={open}
      onClose={handleClick}
      maxWidth={false}
      sx={
        {
          // width:"50rem"
        }
      }
    >
      <DialogTitle>Nuevo Paquete turistico</DialogTitle>
      <DialogContent
        sx={{
          width: {
            xs: "20rem",
            sm: "25rem",
            md: "45rem",
            lg: "65rem",
          },
          // height:"50rem"
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
