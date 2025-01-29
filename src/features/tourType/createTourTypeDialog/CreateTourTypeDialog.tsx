import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface CreateTourTypeDialogProps {
  openDialog: boolean;
  handleClick: () => void;
  formik: any;
}

const CreateTourTypeDialog: React.FC<CreateTourTypeDialogProps> = ({
  openDialog,
  handleClick,
  formik,
}) => {
  return (
    <Dialog open={openDialog} onClose={handleClick}>
      <DialogTitle>Create Tour Type</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "15rem",
            pt: "0.5rem",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ height: "70px" }}
              size="small"
              fullWidth
              id="name"
              label="Nombre"
              variant="outlined"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              sx={{ height: "135px" }}
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
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="contained"
                color="success"
                // sx={{ height: "2rem", width: "12rem" }}
                type="submit"
              >
                Registrar
              </Button>
              <Button
                variant="contained"
                color="error"
                // sx={{ height: "2rem", width: "12rem" }}
                onClick={handleClick}
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTourTypeDialog;
