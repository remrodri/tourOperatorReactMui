import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import TouristDestinationCardMenu from "./TouristDestinationCardMenu";
import AnimatedContent from "../../../../../Animations/AnimatedContent/AnimatedContent";

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
  const shortenDescription = (description: string) => {
    if (description.length < 38) {
      return description;
    }
    const shortenDescription = description.substring(0, 37);
    return `${shortenDescription}...`;
  };
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
          borderRadius: "10px",
          background: "rgba(10,10,10,0.52)",
          boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
          // backdropFilter: "blur(10px)",
          border: "1px solid rgba(10,10,10,0.6)",
          height: "260px",
          backgroundImage: `url(${BASE_URL}${touristDestination.images[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          // backgroundClip: "content-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardHeader
          title={touristDestination.name}
          action={<TouristDestinationCardMenu onOptionSelect={handleOption} />}
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)",
          }}
        />
        {/* <CardMedia
          component="img"
          // height="150"
          sx={{
            height: "194px",
            // width: 300,
            objectFit: "cover",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // ".MuiCardMedia-img": {
            // }
          }}
          // image={`${BASE_URL}${touristDestination.images[0]}`}
        /> */}
        <CardContent
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)",
          }}
        >
          <Typography variant="body2" sx={{ color: "white" }}>
            {shortenDescription(touristDestination.description)}
          </Typography>
        </CardContent>
      </Card>
    </AnimatedContent>
  );
};
export default TouristDestinationCard;
