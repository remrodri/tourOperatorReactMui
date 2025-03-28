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
  handleOption: (option: string) => void;
}

const TouristDestinationCard: React.FC<TouristDestinationCardProps> = ({
  touristDestination,
  handleOption,
}) => {
  // console.log("touristDestination::: ", touristDestination);
  const BASE_URL = "http://localhost:3000";
  // console.log(`${BASE_URL}/${touristDestination.images.[0]}`)
  return (
    <Card
      sx={{
        maxWidth: 345,
        minWidth: 300,
        borderRadius: "10px",
        background: " rgba(73, 173, 110, 0.9)",
        boxShadow: "0 4px 10px rgba(63, 168, 101, 0.6)",
        // backdropFilter: "blur(10px)",
        border: "1px solid rgb(63, 168, 101)",
      }}
    >
      <CardHeader
        title={touristDestination.name}
        action={<TouristDestinationCardMenu onOptionSelect={handleOption} />}
      />
      <CardMedia
        component="img"
        // height="150"
        sx={{
          height: "194px",
          width: 300,
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
