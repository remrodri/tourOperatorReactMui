import { Box, Button, Fade, Grow, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import { TourPackageType } from "../../types/TourPackageType";
import TourPackageCardContainer from "./card/TourPackageCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface TourPackageShowcaseProps {
  handleClick: () => void;
  tourPackages: TourPackageType[];
  role: string;
}
const TourPackageShowcase: React.FC<TourPackageShowcaseProps> = ({
  handleClick,
  tourPackages,
  role,
}) => {
  return (
    // <Fade in={true} timeout={1000}>
      <Box
        sx={
          {
            // flexGrow: 1,
            // display: "flex",
            // flexDirection: "column",
          }
        }
      >
        <Box
          // component={"div"}
          // variant="h4"
          sx={{
            // height: "5rem",
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
            <Typography variant="h4">
              <TextType
                text={"Paquetes turísticos"}
                typingSpeed={50}
                pauseDuration={1000}
                showCursor={true}
                cursorCharacter="_"
                deletingSpeed={50}
              />
            </Typography>
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
        </Box>
        <Box
          sx={{
            // height: "calc(100% - 5rem)",
            display: "flex",
            p: "20px",
          }}
        >
          <Box
            sx={{
              p: "20px",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              overflowY: "auto",
              gap: "1rem",
              alignContent: "flex-start",
              background: "rgba(0, 0, 0, 0.44)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              // backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.5)",
              height: "calc(100dvh - 12.8rem)",
              width: "100%",
            }}
          >
            {tourPackages && tourPackages.length > 0 ? (
              tourPackages.map((tp, index) => (
                // <TourPackageCardContainer
                //   key={tp.id}
                //   tourPackage={tp}
                //   role={role}
                // />

                <Grow
                  in={true} // o una condición si quieres mostrar/ocultar
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={500 + index * 300} // cada card entra con más delay
                  key={tp.id}
                >
                  <Box>
                    <TourPackageCardContainer
                      key={tp.id}
                      tourPackage={tp}
                      role={role}
                    />
                    {/* <TouristCardContainer
                    tourist={tourist}
                    index={index}
                    role={role}
                  /> */}
                  </Box>
                </Grow>
              ))
            ) : (
              <p>No se encuentran paquetes turisticos</p>
            )}
          </Box>
        </Box>
      </Box>
    // </Fade>
  );
};
export default TourPackageShowcase;
