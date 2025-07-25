import { Box, Typography } from "@mui/material";
interface GlobalStatsProps {
  bookingsCont: number;
  revenue: number;
  touristCont: number;
}
const GlobalStats: React.FC<GlobalStatsProps> = ({
  bookingsCont,
  revenue,
  touristCont,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        p: "1rem",
        width: "100%",
        background: "rgba(14, 18, 20, 0.6)",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
        // backdropFilter: "blur(5px)",
        border: "1px solid rgba(14, 18, 20, 0.7)",
      }}
    >
      <Typography variant="h6">Estadisticas Generales</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "25%",
            background: "rgba(0, 0, 0, 0.41)",
            borderRadius: "5px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.51)",
            // backdropFilter: "blur(5px)",
            border: "1px solid rgba(0, 0, 0, 0.51)",
            p: "0.5rem",
          }}
        >
          <Typography variant="body2">Reservas</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {bookingsCont}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "25%",
            background: "rgba(0, 0, 0, 0.41)",
            borderRadius: "5px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.51)",
            // backdropFilter: "blur(5px)",
            border: "1px solid rgba(0, 0, 0, 0.51)",
            p: "0.5rem",
          }}
        >
          <Typography variant="body2">Recaudación</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {revenue} Bs.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            width: "25%",
            background: "rgba(0, 0, 0, 0.41)",
            borderRadius: "5px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.51)",
            // backdropFilter: "blur(5px)",
            border: "1px solid rgba(0, 0, 0, 0.51)",
            p: "0.5rem",
          }}
        >
          <Typography variant="body2">Turistas registrados</Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              textAlign: "center",
            }}
          >
            {touristCont}
          </Typography>
        </Box>
        {/* <Box
                sx={{
                    display:"flex",
                    flexDirection:"column",
                    gap:"0.5rem",
                    width:"25%",
                    background: "rgba(0, 0, 0, 0.41)",
                    borderRadius: "5px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.51)",
                    // backdropFilter: "blur(5px)",
                    border: "1px solid rgba(0, 0, 0, 0.51)",
                    p:"0.5rem",
                      }}
                >
                    <Typography variant="body2">Paquetes vendidos</Typography>
                    <Typography 
                    variant="h6" 
                    sx={{
                      fontWeight:"bold",
                      fontSize:"1.5rem",
                      textAlign:"center",
                    }}
                    >100</Typography>
                </Box> */}
      </Box>
    </Box>
  );
};
export default GlobalStats;
