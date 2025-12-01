import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { TouristFormValues } from "./TouristFormValues";
import { TouristType } from "../../../booking/types/TouristType";
import Close from "@mui/icons-material/Close";
import TextType from "../../../../TextAnimations/TextType/TextType";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

dayjs.extend(customParseFormat);
dayjs.locale("es");

interface EditTouristFormProps {
  open: boolean;
  handleClose: () => void;
  formik: FormikProps<TouristFormValues>;
}

const documentTypes = [
  { value: "ci", label: "CI" },
  { value: "passport", label: "Pasaporte" },
];

const EditTouristForm: React.FC<EditTouristFormProps> = ({
  open,
  handleClose,
  formik,
}) => {
  const birthDate = formik.values.dateOfBirth
    ? dayjs(formik.values.dateOfBirth, ["YYYY-MM-DD", "DD-MM-YYYY"])
    : null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "rgba(46, 46, 46, 0.7)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(37, 37, 37, 0.5)",
        },
      }}
    >
      <DialogTitle>
        <TextType
          text="Editar turista"
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="_"
        />
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <Close />
      </IconButton>
      <DialogContent
        dividers
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "400px",
          gap: 2,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Nombre */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Nombre(s)"
                size="small"
                fullWidth
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Box>

            {/* Apellido */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Apellido(s)"
                size="small"
                fullWidth
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Box>

            {/* Email */}
            <TextField
              label="Email"
              type="email"
              size="small"
              fullWidth
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            {/* Teléfono */}
            <TextField
              label="Teléfono"
              size="small"
              fullWidth
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            {/* Documento y número */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <FormControl
                size="small"
                sx={{ width: "50%" }}
                error={
                  formik.touched.documentType &&
                  Boolean(formik.errors.documentType)
                }
              >
                <InputLabel id="document-type-label">Documento</InputLabel>
                <Select
                  labelId="document-type-label"
                  id="document-type"
                  name="documentType"
                  value={formik.values.documentType}
                  onChange={formik.handleChange}
                >
                  {documentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.documentType && formik.errors.documentType && (
                  <Typography color="error" sx={{ fontSize: "12px", mt: 1 }}>
                    {formik.errors.documentType}
                  </Typography>
                )}
              </FormControl>

              {formik.values.documentType === "ci" ? (
                <TextField
                  label="Número de CI"
                  size="small"
                  fullWidth
                  name="ci"
                  value={formik.values.ci}
                  onChange={formik.handleChange}
                  error={formik.touched.ci && Boolean(formik.errors.ci)}
                  helperText={formik.touched.ci && formik.errors.ci}
                />
              ) : (
                <TextField
                  label="Número de pasaporte"
                  size="small"
                  fullWidth
                  name="passportNumber"
                  value={formik.values.passportNumber}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.passportNumber &&
                    Boolean(formik.errors.passportNumber)
                  }
                  helperText={
                    formik.touched.passportNumber &&
                    formik.errors.passportNumber
                  }
                />
              )}
            </Box>

            {/* Nacionalidad */}
            <TextField
              label="Nacionalidad"
              size="small"
              fullWidth
              name="nationality"
              value={formik.values.nationality}
              onChange={formik.handleChange}
              error={
                formik.touched.nationality && Boolean(formik.errors.nationality)
              }
              helperText={
                formik.touched.nationality && formik.errors.nationality
              }
            />

            {/* Fecha de nacimiento */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de nacimiento"
                value={birthDate}
                onChange={(newDate) => {
                  formik.setFieldValue(
                    "dateOfBirth",
                    newDate ? newDate.format("DD-MM-YYYY") : ""
                  );
                }}
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    error:
                      formik.touched.dateOfBirth &&
                      Boolean(formik.errors.dateOfBirth),
                    helperText:
                      formik.touched.dateOfBirth && formik.errors.dateOfBirth,
                    placeholder: "DD-MM-YYYY",
                  },
                }}
              />
            </LocalizationProvider>

            <Button type="submit" variant="contained" color="primary">
              Guardar cambios
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTouristForm;
