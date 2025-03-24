import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { TourPackageType } from "../types/TourPackageType";
import TourPackageCardContainer from "./card/TourPackageCardContainer";

interface TourPackageShowcaseProps {
  handleClick: () => void;
  tourPackages: TourPackageType[];
}
const TourPackageShowcase: React.FC<TourPackageShowcaseProps> = ({
  handleClick,
  tourPackages,
}) => {
  return (
    <>
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
          Paquetes turisticos
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
          alignContent: "flex-start",
        }}
      >
        {tourPackages && tourPackages.length > 0 ? (
          tourPackages.map((tp,index) => (
            <TourPackageCardContainer key={index} tourPackage={tp} />
          ))
        ) : (
          <p>No se encuentran paquetes turisticos</p>
        )}
      </Box>
    </>
  );
};
export default TourPackageShowcase;
