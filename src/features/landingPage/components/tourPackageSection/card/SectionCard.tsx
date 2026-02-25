import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { Box, Card, CardContent, Typography } from "@mui/material";
interface SectionCardProps {
  tourPackage: TourPackageType;
}
const SectionCard: React.FC<SectionCardProps> = ({ tourPackage }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        backgroundColor: "#b8b8b8ff",
        width: "20rem",
      }}
    >
      {/* <CardHeader
        sx={{
          color: "#1C1C1C",
        }}
        title={tourPackage.name}
      /> */}
      <CardContent
        sx={{
          color: "#1C1C1C",
        }}
      >
        <Typography variant="h6" fontFamily={"Montserrat"}>
          {tourPackage.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "0.5rem",
            justifyContent: "space-around",
          }}
        >
          <Typography variant="body2">
            {`Precio (BS.): ${tourPackage.price}`}
          </Typography>
          <Typography variant="body2">
            {`Duración (días): ${tourPackage.duration}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default SectionCard;
