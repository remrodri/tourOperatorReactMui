import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";

interface TouristDestinationShowcaseProps {
  handleClick: () => void;
}

const TouristDestinationShowcase: React.FC<TouristDestinationShowcaseProps> = ({
  handleClick,
}) => {
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
          >nuevo</Button>
        </Box>
      </Typography>
      touristDestination
    </Box>
  );
};
export default TouristDestinationShowcase;
