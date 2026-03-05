/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Alert,
  styled,
} from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { FormikProps } from "formik";
import { useEffect, useState } from "react";
import { buildImageUrl } from "../../../../utils/helpers/buildImage";

// ✅ helper normalizador
// const buildImageUrl = (path?: string) => {
//   if (!path) return "";
//   if (/^https?:\/\//i.test(path)) return path;

//   const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
//   return `${base}${path.startsWith("/") ? path : `/${path}`}`;
// };

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  width: 1,
});

interface TouristDestinationFormProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<any>;
  isEditing: boolean;
}

const TouristDestinationForm: React.FC<TouristDestinationFormProps> = ({
  open,
  handleClick,
  formik,
  isEditing,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const list = Array.from(files);
    formik.setFieldTouched("newImages", true, true);
    formik.setFieldValue("newImages", list, true);

    setPreviews(list.map((f) => URL.createObjectURL(f)));
  };

  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p));
  }, [previews]);

  const fieldGuides = {
    name: "Ej: Parque Nacional Carrasco",
    description:
      "Describe el destino, atractivos y características principales (mín. 10 caracteres)",
    newImages: "Máx. 5 imágenes · JPG/PNG/WEBP · 2 MB c/u · 10 MB en total",
  };

  const hasError = (formik: FormikProps<any>, field: string) =>
    Boolean(formik.touched[field] && formik.errors[field]);

  const helperText = (formik: FormikProps<any>, field: string) =>
    hasError(formik, field) ? formik.errors[field] : fieldGuides[field];

  return (
    <Dialog open={open} onClose={handleClick} fullWidth maxWidth="sm">
      <DialogTitle>
        <TextType
          text={
            isEditing ? "Editar destino turístico" : "Nuevo destino turístico"
          }
          typingSpeed={40}
          showCursor
          cursorCharacter="_"
        />
      </DialogTitle>

      <DialogContent dividers>
        <Alert severity="info" sx={{ mb: 2 }}>
          Registra la información del destino turístico y agrega imágenes
          representativas.
        </Alert>

        <form onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            size="small"
            label="Nombre"
            {...formik.getFieldProps("name")}
            error={hasError(formik, "name")}
            helperText={helperText(formik, "name")}
            sx={{ mb: 2 }}
          />

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

          {/* ✅ IMÁGENES EXISTENTES NORMALIZADAS */}
          {formik.values.existingImages?.length > 0 && (
            <Box mb={2}>
              <Typography variant="subtitle2" mb={1}>
                Imágenes existentes
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap">
                {formik.values.existingImages.map((img: string, i: number) => (
                  <img
                    key={i}
                    src={buildImageUrl(img) || ""}
                    style={{
                      width: 80,
                      height: 80,
                      objectFit: "cover",
                      borderRadius: 6,
                      border: "1px solid #ccc",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box mb={1}>
            <VisuallyHiddenInput
              id="newImages"
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            <label htmlFor="newImages">
              <Button
                fullWidth
                variant="contained"
                component="span"
                startIcon={<CloudUpload />}
              >
                Subir imágenes
              </Button>
            </label>

            <Typography
              variant="caption"
              color={hasError(formik, "newImages") ? "error" : "text.secondary"}
            >
              {helperText(formik, "newImages")}
            </Typography>
          </Box>

          {previews.length > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
              {previews.map((p, i) => (
                <img
                  key={i}
                  src={p}
                  style={{
                    width: 65,
                    height: 65,
                    objectFit: "cover",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                  }}
                />
              ))}
            </Box>
          )}

          <Box display="flex" gap={2} mt={4}>
            <Button type="submit" variant="contained" color="success" fullWidth>
              {isEditing ? "Actualizar" : "Registrar"}
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

export default TouristDestinationForm;
