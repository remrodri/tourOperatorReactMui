import { Card, CardHeader } from "@mui/material";

interface TourTypeCardProps {
  tourType: any;
}

const TourTypeCard: React.FC<TourTypeCardProps> = ({ tourType }) => {
  return (
    <Card
      sx={{
        width: 300,
      }}
    >
      <CardHeader title={tourType.name} subheader={tourType.description} />
    </Card>
  );
};
export default TourTypeCard;
