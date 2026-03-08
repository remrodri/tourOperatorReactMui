import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";

type Props = {
  storageKey?: string; // por si quieres controlar el key
};

const CREDENTIALS = [
  { role: "Admin", user: "maria.quiroga@admin.bo", pass: "123456" },
  { role: "Operador de ventas", user: "jose.rojas@ventas.bo", pass: "123456" },
  { role: "Guía", user: "rembert.rodrigo@gmail.com", pass: "123456" },
];

export function WelcomeDialog({ storageKey = "welcome_dialog_seen" }: Props) {
  const [open, setOpen] = React.useState(true);

  // React.useEffect(() => {
  //   const seen = localStorage.getItem(storageKey);
  //   if (!seen) setOpen(true);
  // }, [storageKey]);

  const handleClose = () => {
    localStorage.setItem(storageKey, "true");
    setOpen(false);
  };

  // const handleCopy = async () => {
  //   const text =
  //     `Hola licen, si quiere acceder al sistema los usuarios son:\n\n` +
  //     CREDENTIALS.map((c) => `${c.role}: ${c.user}  password: ${c.pass}`).join(
  //       "\n",
  //     );
  //   try {
  //     await navigator.clipboard.writeText(text);
  //   } catch {
  //     // si falla el clipboard, no pasa nada
  //   }
  // };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>¡Bienvenido/a!</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography>
            Hola <strong>licen</strong>, si quiere acceder al sistema los
            usuarios son:
          </Typography>

          <Divider />

          <Stack spacing={1.25}>
            {CREDENTIALS.map((c) => (
              <Box
                key={c.role}
                sx={{
                  p: 1.25,
                  borderRadius: 2,
                  bgcolor: (theme) => theme.palette.action.hover,
                }}
              >
                <Typography variant="subtitle2">{c.role}</Typography>
                <Typography variant="body2">
                  <strong>Usuario:</strong> {c.user}
                </Typography>
                <Typography variant="body2">
                  <strong>Password:</strong> {c.pass}
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* <Typography color="text.secondary">
            *Observación: mejore las validaciones de los formularios excepto el
            de creacion de reserva, que funciona pero aun me falta mejorar su
            validacion...
          </Typography> */}
        </Stack>
      </DialogContent>

      <DialogActions>
        {/* <Button onClick={handleCopy} variant="outlined">
          Copiar credenciales
        </Button> */}
        <Button onClick={handleClose} variant="contained">
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
