import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import destinationBackground from "../../../../assets/images/tourPackage4.webp";
import SectionCardContainer from "./card/SectionCardContainer";

interface TourPackageSectionProps {
  tourPackages: TourPackageType[];
}
const TourPackageSection: React.FC<TourPackageSectionProps> = ({
  tourPackages,
}) => {
  return (
    <Box
      // id="paquetes"
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
          background: "rgba(53, 72, 75, 0.69)",
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
          Nuestros paquetes
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            // p: "1rem 0 1rem 0"
          }}
        >
          {tourPackages
            ? tourPackages.map((tourPackage) => (
                <SectionCardContainer
                  key={tourPackage.id}
                  tourPackage={tourPackage}
                />
              ))
            : null}
        </Box>
      </Box>
    </Box>
  );
};
export default TourPackageSection;
