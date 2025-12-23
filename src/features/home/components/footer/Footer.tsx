import React from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        // backgroundColor: "#222",
        backgroundColor: "#6f0000",
        color: "#fff",
        py: 4,
        // mt: 6,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}
      >
        {/* Logo o Nombre */}
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Operadora de turismo
        </Typography>

        {/* Links */}
        {/* <Stack direction="row" spacing={3}>
          <Link href="/" color="inherit" underline="hover">
            Inicio
          </Link>
          <Link href="/destinos" color="inherit" underline="hover">
            Destinos
          </Link>
          <Link href="/paquetes" color="inherit" underline="hover">
            Paquetes
          </Link>
          <Link href="/contacto" color="inherit" underline="hover">
            Contacto
          </Link>
          <Link href="/consultar-reserva" color="inherit" underline="hover">
            Consultar Reserva
          </Link>
          <Link href="/iniciar-sesion " color="inherit" underline="hover">
            Iniciar Sesión
          </Link>
        </Stack> */}

        {/* Redes sociales con íconos */}
        <Stack direction="row" spacing={1}>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            sx={{ color: "#fff", "&:hover": { color: "#1877F2" } }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            sx={{ color: "#fff", "&:hover": { color: "#E1306C" } }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            sx={{ color: "#fff", "&:hover": { color: "#1DA1F2" } }}
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            href="https://youtube.com"
            target="_blank"
            sx={{ color: "#fff", "&:hover": { color: "#FF0000" } }}
          >
            <YouTubeIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Copyright */}
      <Typography
        variant="body2"
        sx={{ textAlign: "center", mt: 3, fontSize: "0.9rem" }}
      >
        © {new Date().getFullYear()} Operadora de turismo. Todos los derechos
        reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
