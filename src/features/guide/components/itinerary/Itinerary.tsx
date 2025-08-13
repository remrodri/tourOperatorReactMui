import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../tourPackage/types/TourPackageTypeype";
interface ItineraryProps {
  loading: boolean;
  tourPackage: TourPackageType | null;
}

const Itinerary: React.FC<ItineraryProps> = ({ loading, tourPackage }) => {
  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // background: "rgba(0,0,0,0.6)",
          background: "rgba(191, 182, 174, 0.25)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,1)",
          // backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.4)",
          // padding: "10px",
          // gap: "10px",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Typography variant="h5">Cargando...</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        p: "10px",
        // flexGrow: 1,
        width: "100%",
        height: "calc(100dvh - 86px)",
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        // overflowY: "auto",
        // pb:"5px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // background: "rgba(0,0,0,0.6)",
          background: "rgba(88, 83, 79, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgb(41, 39, 37)",
          // boxShadow: {
          //   // xs: "0 4px 10px rgb(41, 39, 37)",
          //   // sm: "0 4px 10px rgb(41, 39, 37)",
          //   md: "10px 0 10px -4px rgba(46, 39, 33, 0.69), -10px 0 10px -4px rgba(46, 39, 33, 0.69)",
          // },
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(191, 182, 174, 1)",
          padding: "20px 20px",
          gap: "10px",
          width: {
            xs: "100%",
            sm: "100%",
            md: "60%",
          },
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" align="center">
          Itinerario
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",

            // padding: "20px",
            // pb:"5px"
          }}
        >
          {/* <Typography variant="h6" align="center">
            </Typography> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {tourPackage?.itinerary?.days.map((day, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    background: "rgba(43, 37, 32, 0.47)",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgb(46, 39, 33)",
                    // backdropFilter: "blur(10px)",
                    border: "1px solid rgb(73, 63, 54)",
                    p: "10px",
                  }}
                >
                  <Typography variant="body1" align="left">
                    Dia {day.dayNumber}
                  </Typography>
                  {day.activities.map((activity, index) => {
                    return (
                      <Box key={index}>
                        <Typography variant="body2" align="center">
                          {`${activity.time} - ${activity.description}`}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Itinerary;
