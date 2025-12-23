import { Box, Typography, Button } from "@mui/material";

const ContactSection = () => {
  const whatsappLink =
    "https://wa.me/59178312732?text=Hola,%20quiero%20más%20información%20sobre%20los%20paquetes%20turisticos";

  return (
    <Box
      id="contacto"
      sx={{
        // height: "100vh",
        bgcolor: "rgba(53, 75, 55, 0.69)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        color: "#fff",
        textAlign: "center",
        p: "2rem",
      }}
    >
      <Typography variant="h4" sx={{ fontFamily: "Montserrat" }}>
        ¡Contáctanos!
      </Typography>
      <Typography variant="body1">
        ¿Tienes dudas o quieres más información? Escríbenos por WhatsApp.
      </Typography>
      <Button
        variant="contained"
        color="success"
        sx={{ fontSize: "1.2rem",  }}
        href={whatsappLink}
        target="_blank"
      >
        Enviar mensaje
      </Button>
    </Box>
  );
};
export default ContactSection;
