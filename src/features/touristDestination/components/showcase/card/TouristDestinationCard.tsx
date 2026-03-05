/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import TouristDestinationCardMenu from "./TouristDestinationCardMenu";
// import AnimatedContent from "../../../../../Animations/AnimatedContent/AnimatedContent";

// const URL_BASE = import.meta.env.VITE_API_URL;

interface TouristDestinationCardProps {
  touristDestination: any;
  handleOption: (option: string) => void;
  role: string;
}

const TouristDestinationCard: React.FC<TouristDestinationCardProps> = ({
  touristDestination,
  handleOption,
  role,
}) => {
  const shortenDescription = (description: string) => {
    if (description.length < 38) return description;
    return `${description.substring(0, 37)}...`;
  };

  const buildImageUrl = (path?: string) => {
    if (!path) return "";

    // si ya es absoluta, no tocar
    if (/^https?:\/\//i.test(path)) return path;

    const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const backgroundImg = buildImageUrl(touristDestination.images?.[0]);

  return (
    <Card
      sx={{
        width: 300,
        height: "260px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        backgroundImage: `url("${backgroundImg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardHeader
        title={touristDestination.name}
        action={
          <TouristDestinationCardMenu
            onOptionSelect={handleOption}
            role={role}
          />
        }
        sx={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)",
        }}
      />

      <CardContent
        sx={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Typography variant="body2" sx={{ color: "white" }}>
          {shortenDescription(touristDestination.description)}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default TouristDestinationCard;
