import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import { TouristDestinationType } from "../../types/TouristDestinationType";
import TouristDestinationCardContainer from "./card/TouristDestinationCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface TouristDestinationShowcaseProps {
  handleClick: () => void;
  // BASE_URL: string;
  touristDestinations: any[];
}

const TouristDestinationShowcase: React.FC<TouristDestinationShowcaseProps> = ({
  handleClick,
  // BASE_URL,
  touristDestinations,
}) => {
  // console.log('touristDestinations::: ', touristDestinations);
  return (
    <Box
      sx={{
        // position: "relative",
        // width:"100%",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        // height:"100dvh"
      }}
    >
      <Typography
        variant="h4"
        sx={{
          // height: "12%",
          height: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "0 1.5rem 0 1.5rem",
        }}
      >
        <BreadCrumbsContainer />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextType
            text={"Destinos turisticos"}
            typingSpeed={50}
            pauseDuration={1000}
            showCursor={true}
            cursorCharacter="_"
            deletingSpeed={50}
          />
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
          // height: "90%",
          height: "calc(100% - 5rem)",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
            // position:"relative",
            pt: "30px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "1rem",
            alignContent: "flex-start",
            background: "rgba(75, 44, 27, 0.4)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgba(75, 44, 27, 0.5)",
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
    </Box>
  );
};
export default TouristDestinationShowcase;
