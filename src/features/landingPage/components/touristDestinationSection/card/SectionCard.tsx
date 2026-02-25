import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { TouristDestinationType } from "../../../../touristDestination/types/TouristDestinationType";

interface SectionCardProps {
  touristDestination: TouristDestinationType;
  // openDialog: boolean;
  // handleCloseDialog: () => void;
  handleOpenDialog: () => void;
}

const BASE_URL = "http://localhost:3000";

const SectionCard: React.FC<SectionCardProps> = ({
  touristDestination,
  // openDialog,
  // handleCloseDialog,
  handleOpenDialog,
}) => {
  return (
    <Card
      sx={{
        width: "300px",
        height: "260px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        backgroundImage: `url(${BASE_URL}${touristDestination.images[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardActionArea
        onClick={() => {
          handleOpenDialog();
        }}
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <CardHeader
          title={touristDestination.name}
          sx={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)",
            fontFamily: "Montserrat",
            fontWeight: "500",
            fontSize: "1.4rem",
          }}
          disableTypography
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
        />
        <CardContent
          sx={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
              "rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            gutterBottom
            variant="body2"
            // color="red"
            // fontFamily="Montserrat"
            // fontWeight="200"
            component="div"
            sx={{
              color: "rgba(227, 227, 227, 1)",
              height: "5rem",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              // alignItems: "center",
              // color: "white",
              // fontWeight: "200",
            }}
            // noWrap
          >
            {/* {touristDestination.description} */}
            Click para ver mas
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default SectionCard;
