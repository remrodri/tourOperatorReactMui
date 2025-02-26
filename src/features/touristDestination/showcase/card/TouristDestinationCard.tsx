import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import TouristDestinationCardMenu from "./TouristDestinationCardMenu";

interface TouristDestinationCardProps {
  touristDestination: any;
  handleOption: (option:string) => void;
}

const TouristDestinationCard: React.FC<TouristDestinationCardProps> = ({
  touristDestination,
  handleOption,
}) => {
  console.log('touristDestination::: ', touristDestination);
  const BASE_URL = "http://localhost:3000";
  // console.log(`${BASE_URL}/${touristDestination.images.[0]}`)
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }}>
      <CardHeader
        title={touristDestination.name}
        action={<TouristDestinationCardMenu onOptionSelect={handleOption} />}
      />
      <CardMedia
        component="img"
        // height="150"
        sx={{
          height: "194px",
          // width:"100%",
          // objectFit: "cover",
          // backgroundSize: "cover",
          // backgroundPosition:"center"
          // ".MuiCardMedia-img": {
          // }
        }}
        image={`${BASE_URL}${touristDestination.images[0]}`}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {touristDestination.description}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default TouristDestinationCard;
