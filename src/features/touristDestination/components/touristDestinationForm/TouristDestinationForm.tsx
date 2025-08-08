import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { ChangeEvent, useState } from "react";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { CloudUpload } from "@mui/icons-material";

interface TouristDestinationFormProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<{
    id?: string;
    name: string;
    description: string;
    newImages: File[];
    existingImages: string[];
  }>;
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

const TouristDestinationForm: React.FC<TouristDestinationFormProps> = ({
  open,
  handleClick,
  formik,
}) => {
  const BASE_URL = "http://localhost:3000";
  // const [preview, setPreview] = useState<string | null>(null);
  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files) {
  //     const filesArray = Array.from(event.target.files);
  //     formik.setFieldValue("newImages", [
  //       ...formik.values.newImages,
  //       ...filesArray,
  //     ]);
  //     const objectUrl = URL.createObjectURL(filesArray[0]);
  //     setPreview(objectUrl);
  //   }
  // };
  // Estado para múltiples previews
  const [previews, setPreviews] = useState<string[]>([]);

  // Manejar múltiples archivos
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    // Crear URLs para previews
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    // Si usás Formik, actualizá también los valores
    formik.setFieldValue("newImages", selectedFiles);
  };
  return (
    <Dialog open={open} onClose={handleClick}>
      {/* <DialogTitle>Nuevo destino turistico</DialogTitle> */}
      <DialogTitle>
        <TextType
          className="text-lg"
          text="Nuevo destino turístico"
          typingSpeed={50}
          pauseDuration={1000}
          showCursor={true}
          cursorCharacter="_"
          deletingSpeed={50}
        />
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "350px",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            padding: "0.5rem 0 0 0",
            display: "flex",
            flexDirection: "column",
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
          <TextField
            // sx={{ height: "130px" }}
            label="Descripcion"
            fullWidth
            multiline
            rows={4}
            {...formik.getFieldProps("description")}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          {/* imagenes existentes */}
          {formik.values.existingImages.length > 0 && (
            <div>
              <Typography variant="subtitle1">Imagenes existentes:</Typography>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {formik.values.existingImages.map((image, index) => (
                  <img
                    key={index}
                    src={`${BASE_URL}${image}`}
                    alt={`image ${index + 1}`}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          {/* cargar nuevas imagenes */}
          {/* <Box
            sx={{
              height: "70px",
              pt:"1.5rem"
            }}
          >
            <Typography variant="subtitle1">
              Agregar imágenes:
            </Typography>
            <input
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
            {formik.errors.newImages &&
              typeof formik.errors.newImages === "string" && (
                <Typography color="error" sx={{fontSize:"12px",pt:"4px"}}>{formik.errors.newImages}</Typography>
              )}
          </Box> */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
              width: "100%",
              mt: "1rem",
            }}
          >
            <Box sx={{ height: "100%", width: "100%" }}>
              {/* <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Agregar imágenes:
              </Typography> */}

              <VisuallyHiddenInput
                id="newImages"
                name="newImages"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
              />

              <label htmlFor="newImages">
                <Button
                  sx={{ width: "100%" }}
                  variant="contained"
                  component="span"
                  startIcon={<CloudUpload />}
                >
                  Subir imágenes
                </Button>
              </label>

              {formik.touched.newImages && formik.errors.newImages && (
                <Typography
                  color="error"
                  sx={{ fontSize: "12px", p: "4px 0 0 14px" }}
                >
                  {String(formik.errors.newImages)}
                </Typography>
              )}
            </Box>

            <Box>
              {previews.length > 0 && (
                <Box
                  sx={{
                    // width: "50%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  {/* <img
                  src={previews[0]}
                  alt="Vista previa"
                  style={{
                    width: "65px",
                    height: "65px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                /> */}
                  {previews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`preview-${index}`}
                      style={{
                        width: "65px",
                        height: "65px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: "2rem",
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
export default TouristDestinationForm;
