import { Box, Typography } from "@mui/material";
import AnimatedContent from "../../../../Animations/AnimatedContent/AnimatedContent";
import CountUp from "../../../../TextAnimations/CountUp/CountUp";
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
    // <AnimatedContent
    //   distance={100}
    //   direction="vertical"
    //   reverse={true}
    //   duration={1.2}
    //   ease="power3.out"
    //   initialOpacity={0.2}
    //   animateOpacity
    //   scale={1.1}
    //   threshold={0.2}
    //   delay={0.3}
    // >
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
              {/* {bookingsCont} */}
              <CountUp
                from={0}
                to={bookingsCont || 0}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
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
                display:"flex",
                alignItems:"center",
                justifyContent: "center",
                gap:"0.5rem",
              }}
            >
              {/* {revenue} Bs. */}
              <CountUp
                from={0}
                to={revenue || 0}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
              {` Bs.`}
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
              {/* {touristCont} */}
              <CountUp
                from={0}
                to={touristCont || 0}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />
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
    // </AnimatedContent>
  );
};
export default GlobalStats;
