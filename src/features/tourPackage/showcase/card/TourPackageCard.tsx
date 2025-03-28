import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { TourPackageType } from "../../types/TourPackageType";
import TourPackageCardMenu from "./TourPackageCardMenu";

interface TourPackageCardProps {
  tourPackage: TourPackageType;
  BASE_URL: string;
  handleOption: (option: string) => void;
  // handleClickInfo: () => void;
}

const TourPackageCard: React.FC<TourPackageCardProps> = ({
  tourPackage,
  BASE_URL,
  handleOption,
  // handleClickInfo,
}) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 300,
        // rgb(70, 120, 253)
        borderRadius: "10px",
        background: " rgba(70, 120, 253,0.7)",
        boxShadow: "0 4px 10px rgba(50, 104, 253,0.6)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgb(50, 104, 253)",
      }}
    >
      <CardHeader
        title={tourPackage.name}
        action={
          <TourPackageCardMenu
            onOptionSelect={handleOption}
            // handleClickInfo={handleClickInfo}
          />
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Duracion: {tourPackage.duration} dias <br />
          Precio: {tourPackage.price} Bs.
        </Typography>
      </CardContent>
    </Card>
  );
};
export default TourPackageCard;
