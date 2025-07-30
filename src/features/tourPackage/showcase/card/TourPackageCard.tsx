import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { TourPackageType } from "../../types/TourPackageType";
import TourPackageCardMenu from "./TourPackageCardMenu";
import AnimatedContent from "../../../../Animations/AnimatedContent/AnimatedContent";

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
    <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={true}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0.2}
          animateOpacity
          scale={1.1}
          threshold={0.2}
          delay={0.3}
        >
    <Card
        sx={{
        // maxWidth: 345,
        // minWidth: 300,
        width: 300,
        // rgb(70, 120, 253)
        borderRadius: "10px",
        background: "rgba(10,10,10,0.52)",
        boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        // backdropFilter: "blur(10px)",
          border: "1px solid rgba(10,10,10,0.6)",
        height: "100%",
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
          Duracion (dias): {tourPackage.duration} <br />
          Precio (Bs.): {tourPackage.price}
        </Typography>
      </CardContent>
    </Card>
    </AnimatedContent>
  );
};
export default TourPackageCard;
