import { Box, Typography } from "@mui/material";
import TourPackageForm from "./TourPackageForm";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";

const TourPackageformContainer = () => {
  const handleRegisterUser = async (userData: any) => {
    console.log("userData::: ", userData);
  };

  return (
    <Box
      sx={{
        height: "100%",
        // overflowY:"auto"
      }}
    >
      <Typography
        variant="h5"
        sx={{
          height: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "0 0 0 1.5rem",
        }}
      >
        <BreadCrumbsContainer/>
        Registro de paquete turistico
      </Typography>
      <Box
        sx={{
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: {
            xs: "4.5rem 0 0 0",
            sm: "3.5rem 0 1rem 0",
          },
          overflowY: "auto",
        }}
      >
        <TourPackageForm onSubmit={handleRegisterUser} />
      </Box>
    </Box>
  );
};
export default TourPackageformContainer;
