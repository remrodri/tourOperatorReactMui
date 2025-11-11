import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
interface TourPackageInfoProps {
  tourPackage: TourPackageType | null;
}
const TourPackageInfo: React.FC<TourPackageInfoProps> = ({ tourPackage }) => {
  return (
    <Box
      sx={{
        p: "0 10px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        // flexWrap: "wrap",
        height: "100%",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h6"
        // gutterBottom
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "10%",
        }}
      >
        Paquete turistico
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Typography variant="body1" gutterBottom>
          {tourPackage?.name ?? "No disponible"}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Precio (por persona): {tourPackage?.price} Bs.
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Itinerario
        </Typography>
        <Typography variant="body1" gutterBottom>
          Duracion (dias): {tourPackage?.duration ?? "No disponible"}
        </Typography>
        
        {/* <Box> */}
        {tourPackage?.itinerary &&
          tourPackage.itinerary.days &&
          tourPackage.itinerary.days.map((day, index) => (
            <Box key={index}>
              <Typography variant="body1" gutterBottom>
                Dia: {day.dayNumber}
              </Typography>
              {day.activities &&
                day.activities.length > 0 &&
                day.activities.map((activity, index) => (
                  <Typography variant="body2" key={index}>
                    {activity.time} - {activity.description}
                  </Typography>
                ))}
            </Box>
          ))}
        {/* </Box> */}
      </Box>
    </Box>
  );
};
export default TourPackageInfo;
