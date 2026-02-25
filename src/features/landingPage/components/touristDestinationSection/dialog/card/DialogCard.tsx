import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../../../../../tourPackage/types/TourPackageType";

interface DialogCardProps {
  tourPackage: TourPackageType;
}
const DialogCard: React.FC<DialogCardProps> = ({ tourPackage }) => {
  return (
    <Box
      sx={{
        background: "rgba(164, 164, 164, 0.55)",
        padding: "1rem",
        borderRadius: "6px",
        display: "flex",
        // flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Typography
        variant="body1"
        sx={{ width: "50%", fontWeight: "500", fontFamily: "Montserrat" }}
      >
        {tourPackage.name}
      </Typography>
      <Typography
        variant="body1"
        sx={{ width: "50%", textAlign: "center", fontWeight: "500", fontFamily: "Montserrat" }}
      >{`Duracion: ${tourPackage.duration} dias`}</Typography>
      <Typography
        variant="body1"
        sx={{ width: "50%", textAlign: "center", fontWeight: "500", fontFamily: "Montserrat" }}
      >{`Precio: ${tourPackage.price.toFixed(2)} Bs.`}</Typography>
    </Box>
  );
};
export default DialogCard;
