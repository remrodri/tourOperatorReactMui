import { Box, Typography } from "@mui/material";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";

const BASE_URL = "http://localhost:3000";

export interface TouristDestinationProps {
  loading: boolean;
  touristDestination: TouristDestinationType | null;
}

const TouristDestination: React.FC<TouristDestinationProps> = ({
  loading,
  touristDestination,
}) => {
  // console.log("touristDestination::: ", touristDestination);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100dvh - 86px)",
        p:"0 10px 0 10px"
      }}
    >
      {loading ? (
        <Typography variant="h5">Cargando...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "rgba(88, 83, 79, 0.4)",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgb(41, 39, 37)",
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
            Destino turístico
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
            <Typography variant="h6" align="center">
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
      )}
    </Box>
  );
};

export default TouristDestination;
