import { Box, Card, CardMedia, Typography } from "@mui/material";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";

export interface TouristDestinationProps {
  loading: boolean;
  touristDestination: TouristDestinationType | null;
}

const BASE_URL = "http://localhost:3000";

const TouristDestination: React.FC<TouristDestinationProps> = ({
  loading,
  touristDestination,
}) => {
  // console.log('touristDestination::: ', touristDestination);
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
        flexGrow: 1,
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
          padding: "10px 20px",
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
          DestinoTuristico
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "rgba(43, 37, 32, 0.47)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgb(46, 39, 33)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgb(73, 63, 54)",
            padding: "20px",
            // pb:"5px"
          }}
        >
          <Typography variant="h5" align="center">
            {touristDestination?.name}
          </Typography>
          <Typography variant="body1" align="justify">
            {touristDestination?.description}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {touristDestination?.images.map((image, index) => (
            <Box
              key={index}
              sx={{
                height: "194px",
                borderRadius: "10px",
              }}
            >
              <img
                src={`${BASE_URL}${image}`}
                alt={`image-${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "10px",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default TouristDestination;
