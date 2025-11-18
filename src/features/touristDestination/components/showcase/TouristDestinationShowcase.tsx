import { Box, Button, Fade, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import { TouristDestinationType } from "../../types/TouristDestinationType";
import TouristDestinationCardContainer from "./card/TouristDestinationCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface TouristDestinationShowcaseProps {
  handleClick: () => void;
  // BASE_URL: string;
  touristDestinations: any[];
  role: string;
}

const TouristDestinationShowcase: React.FC<TouristDestinationShowcaseProps> = ({
  handleClick,
  // BASE_URL,
  touristDestinations,
  role,
}) => {
  // console.log('touristDestinations::: ', touristDestinations);
  return (
    // <Fade in={true} timeout={1000}>
      <Box
        sx={
          {
            // background: "rgba(181, 75, 18, 0.81)",
            // height: "calc(100dvh - 6.65rem)",
            // position: "relative",
            // width:"100%",
            // flexGrow: 1,
            // display: "flex",
            // flexDirection: "column",
            // height:"86.3vh"
            // height:"calc(100% - 1rem)"
          }
        }
      >
        <Typography
          variant="h4"
          sx={{
            // height: "12%",
            // height: "5rem",

            // height: "10.7vh",
            // height: "14vh",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "1rem 1.5rem 0 1.5rem",
          }}
        >
          {/* <BreadCrumbsContainer /> */}
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
          {role === "690cbf7c64756dcc541d8a19" && (
            <Button
              variant="contained"
              sx={{ height: "2rem", width: "12rem" }}
              onClick={handleClick}
            >
              nuevo
            </Button>
          )}
          </Box>
        </Typography>
        <Box
          sx={{
            // flexGrow: 1,
            // height: "90%",

            // height: "calc(100% - 5rem)",
            md: {
              // height: "calc(100vh - 8rem)",
            },
            // height: "79vh",
            display: "flex",
            p: "20px",
            // width:"100%",
            // overflowY: "auto",
          }}
        >
          <Box
            sx={{
              // position:"relative",
              // flexGrow: 1,
              p: "20px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              // overflowY: "auto",
              gap: "1rem",
              alignContent: "flex-start",
              background: "rgba(75, 44, 27, 0.4)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              // backdropFilter: "blur(10px)",
              border: "1px solid rgba(75, 44, 27, 0.5)",
              overflowY: "auto",
              width: "100%",
              // height: "calc(100% - 7rem)",
              // height: "78dvh",
              // height: "78dvh",
              // md: {
              //   height: "50dvh",
              // },
              height: "calc(100dvh - 12.8rem)",
            }}
          >
            {touristDestinations && touristDestinations.length > 0 ? (
              touristDestinations.map((touristDestination) => (
                <TouristDestinationCardContainer
                  key={touristDestination.id}
                  touristDestination={touristDestination}
                  role={role}
                />
              ))
            ) : (
              <p>No se encuentran destinos turisticos</p>
            )}
          </Box>
        </Box>
      </Box>
    // </Fade>
  );
};
export default TouristDestinationShowcase;
