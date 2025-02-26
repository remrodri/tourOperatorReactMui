import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { TouristDestinationType } from "../types/TouristDestinationType";
import TouristDestinationCardContainer from "./card/TouristDestinationCardContainer";

interface TouristDestinationShowcaseProps {
  handleClick: () => void;
  BASE_URL: string;
  touristDestinations: any[];
}

const TouristDestinationShowcase: React.FC<TouristDestinationShowcaseProps> = ({
  handleClick,
  BASE_URL,
  touristDestinations,
}) => {
  // console.log('touristDestinations::: ', touristDestinations);
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          height: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "0 0 0 1.5rem",
        }}
      >
        <BreadCrumbsContainer />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          Destinos turisticos
          <Button
            variant="contained"
            sx={{ height: "2rem", width: "12rem" }}
            onClick={handleClick}
          >
            nuevo
          </Button>
        </Box>
      </Typography>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          overflowY: "auto",
          gap: "1rem",
          pt: "2rem",
        }}
      >
        {touristDestinations && touristDestinations.length > 0 ? (
          touristDestinations.map((touristDestination) => (
            <TouristDestinationCardContainer
              key={touristDestination.id}
              touristDestination={touristDestination}
            />
          ))
        ) : (
          <p>No se encuentran destinos turisticos</p>
        )}
      </Box>
    </Box>
  );
};
export default TouristDestinationShowcase;
