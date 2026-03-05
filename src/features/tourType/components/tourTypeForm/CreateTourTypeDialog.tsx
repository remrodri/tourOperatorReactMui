import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Alert,
  IconButton,
} from "@mui/material";
import { FormikProps } from "formik";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { Close } from "@mui/icons-material";

interface TourTypeFormValues {
  name: string;
  description: string;
}

interface CreateTourTypeDialogProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<TourTypeFormValues>;
  isEdit?: boolean;
}

/**
 * Helpers UX consistentes
 */
const fieldGuides: Record<keyof TourTypeFormValues, string> = {
  name: "Ej: Aventura, Cultural, Ecológico",
  description:
    "Describe brevemente el tipo de experiencia (mín. 10 caracteres)",
};

function hasError(
  formik: FormikProps<TourTypeFormValues>,
  field: keyof TourTypeFormValues,
) {
  return Boolean(formik.touched[field] && formik.errors[field]);
}

function helperText(
  formik: FormikProps<TourTypeFormValues>,
  field: keyof TourTypeFormValues,
) {
  if (formik.touched[field] && formik.errors[field]) {
    return formik.errors[field];
  }
  return fieldGuides[field];
}

const CreateTourTypeDialog: React.FC<CreateTourTypeDialogProps> = ({
  open,
  handleClick,
  formik,
  isEdit = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason === "backdropClick") return;
        handleClick();
      }}
      fullWidth
      maxWidth="xs"
    >
      <DialogTitle>
        <TextType
          className="text-lg"
          text={isEdit ? "Editar tipo de tour" : "Nuevo tipo de tour"}
          typingSpeed={50}
          pauseDuration={800}
          showCursor
          cursorCharacter="_"
        />
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClick}
        disabled={formik.isSubmitting}
        sx={{ position: "absolute", right: 12, top: 12 }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        {/* Bloque informativo (muy útil en demo) */}
        <Alert severity="info" sx={{ mb: 2 }}>
          Define el nombre y una breve descripción del tipo de tour.
        </Alert>

        <form onSubmit={formik.handleSubmit} noValidate>
          {/* Nombre */}
          <TextField
            fullWidth
            size="small"
            label="Nombre"
            {...formik.getFieldProps("name")}
            error={hasError(formik, "name")}
            helperText={helperText(formik, "name")}
            sx={{ mb: 2 }}
          />

          {/* Descripción */}
          <TextField
            fullWidth
            size="small"
            label="Descripción"
            multiline
            rows={4}
            {...formik.getFieldProps("description")}
            error={hasError(formik, "description")}
            helperText={helperText(formik, "description")}
            sx={{ mb: 3 }}
          />

          {/* Botones */}
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              {isEdit ? "Actualizar" : "Registrar"}
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

export default CreateTourTypeDialog;