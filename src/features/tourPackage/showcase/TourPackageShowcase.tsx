import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";

interface TourPackageShowcaseProps {
  handleClick: () => void;
}
const TourPackageShowcase: React.FC<TourPackageShowcaseProps> = ({
  handleClick,
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
          alignContent:"flex-start"
        }}
      >paquetes turisticos</Box>
    </>
  );
};
export default TourPackageShowcase;
