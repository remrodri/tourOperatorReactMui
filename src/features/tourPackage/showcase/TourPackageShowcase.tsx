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
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          height: "5rem",
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
          height: "calc(100% - 5rem)",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
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
          {tourPackages && tourPackages.length > 0 ? (
            tourPackages.map((tp, index) => (
              <TourPackageCardContainer key={index} tourPackage={tp} />
            ))
          ) : (
            <p>No se encuentran paquetes turisticos</p>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default TourPackageShowcase;
