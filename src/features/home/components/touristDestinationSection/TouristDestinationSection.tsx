import { Box, Typography } from "@mui/material";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import SectionCardContainer from "./card/SectionCardContainer";
import destinationBackground from "../../../../assets/images/tourist.webp";

interface TouristDestinationSectionProps {
  touristDestinations: TouristDestinationType[];
}
const TouristDestinationSection: React.FC<TouristDestinationSectionProps> = ({
  touristDestinations,
}) => {
  return (
    <Box
      // id="destinos"
      sx={{
        backgroundImage: `url(${destinationBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "2rem",
      }}
    >
      <Box
        sx={{
          // background: "rgba(44, 81, 65, 0.55)",
          background: "rgba(53, 75, 55, 0.69)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(64, 89, 66, 0.69)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // padding: "1rem",
          gap: "1rem",
          pb: "3rem",
          pt: "1.5rem",
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            fontSize: "2rem",
            textAlign: "center",
            fontFamily: "Montserrat",
          }}
        >
          Nuestros destinos
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "3rem",
            // p: "1rem 0 1rem 0"
          }}
        >
          {touristDestinations
            ? touristDestinations.map((touristDestination) => (
                <SectionCardContainer
                  key={touristDestination.id}
                  touristDestination={touristDestination}
                />
              ))
            : null}
        </Box>
      </Box>
    </Box>
  );
};

export default TouristDestinationSection;
