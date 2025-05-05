import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from "@mui/material";
import { FormikProps } from "formik";
import { CancellationPolicy } from "../types/CancellationPolicy";

// interface FormValues {
//   name: string;
//   deadLine: number;
//   refoundPercentage: number;
//   description: string;
// }

interface CancellationPolicyFormProps {
  open: boolean;
  handleClick: () => void;
  formik: FormikProps<CancellationPolicy>;
}

const CancellationPolicyForm: React.FC<CancellationPolicyFormProps> = ({
  open,
  handleClick,
  formik,
}) => {
  return (
    <Dialog open={open} onClose={handleClick}>
      <DialogTitle>Nueva condicion de cancelacion</DialogTitle>
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
            sx={{
              height: "70px",
            }}
            size="small"
            fullWidth
            id="name"
            label="Nombre"
            variant="outlined"
            type="string"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{
              height: "70px",
            }}
            size="small"
            fullWidth
            id="deadLine"
            label="Plazo de cancelacion"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">dias</InputAdornment>
                ),
              },
            }}
            value={formik.values.deadLine}
            onChange={formik.handleChange}
            error={formik.touched.deadLine && Boolean(formik.errors.deadLine)}
            helperText={formik.touched.name && formik.errors.deadLine}
          />
          <TextField
            sx={{
              height: "70px",
            }}
            size="small"
            fullWidth
            id="refoundPercentage"
            label="Cargo por cancelacion"
            variant="outlined"
            type="number"
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              },
            }}
            value={formik.values.refoundPercentage}
            onChange={formik.handleChange}
            error={
              formik.touched.refoundPercentage &&
              Boolean(formik.errors.refoundPercentage)
            }
            helperText={
              formik.touched.refoundPercentage &&
              formik.errors.refoundPercentage
            }
          />
          <TextField
            sx={{ height: "110px" }}
            size="small"
            fullWidth
            multiline
            rows={4}
            id="description"
            label="Descripcion"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "2rem 0 0 0",
              gap: "1rem",
            }}
          >
            <Button variant="contained" color="success" type="submit" fullWidth>
              Enviar
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="error"
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
export default CancellationPolicyForm;
