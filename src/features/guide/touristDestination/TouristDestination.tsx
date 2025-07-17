import { Box, Card, CardMedia, Typography } from "@mui/material";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";

export interface TouristDestinationProps {
  loading: boolean;
  touristDestination: TouristDestinationType | null;
}

const BASE_URL = "http://localhost:3000";

const TouristDestination: React.FC<TouristDestinationProps> = ({ loading,touristDestination }) => {
  console.log('touristDestination::: ', touristDestination);
  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          background: "rgba(0,0,0,0.6)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.4)",
          padding: "10px",
          gap: "10px",
        }}
      >
        <Typography variant="h5">Cargando...</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.4)",
        padding: "10px",
        gap: "10px",
        overflowY:'auto'
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
          background: "rgba(141, 141, 141, 0.12)",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,1)",
          backdropFilter: "blur(1px)",
          border: "1px solid rgba(0,0,0,0.4)",
          padding: "20px",
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
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'center',
        }}>
        {touristDestination?.images.map((image, index) => (
          <Box
          key={index}
            sx={{
              height: "194px",
              borderRadius: "10px",
            }}
          >
            <img src={`${BASE_URL}${image}`} alt={`image-${index}`}
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
  );
};
export default TouristDestination;
