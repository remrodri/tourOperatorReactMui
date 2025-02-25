import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { FormikProps } from "formik";
import { ChangeEvent } from "react";

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

const TouristDestinationForm: React.FC<TouristDestinationFormProps> = ({
  open,
  handleClick,
  formik,
}) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      formik.setFieldValue("newImages", [
        ...formik.values.newImages,
        ...filesArray,
      ]);
    }
  };
  return (
    <Dialog open={open} onClose={handleClick}>
      <DialogTitle>Nuevo destino turistico</DialogTitle>
      <DialogContent>
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
            sx={{ height: "120px" }}
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
                    src={image}
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
          <Box
            sx={{
              height: "70px",
              pt:"1.5rem"
            }}
          >
            <Typography variant="subtitle1">
              Agregar nuevas imagenes:
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
