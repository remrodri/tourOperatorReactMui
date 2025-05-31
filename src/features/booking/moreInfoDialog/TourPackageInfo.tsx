import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
interface TourPackageInfoProps {
  tourPackage: TourPackageType | null;
}
const TourPackageInfo: React.FC<TourPackageInfoProps> = ({ tourPackage }) => {
  // console.log("tourPackage::: ", tourPackage);
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Informacion del paquete turistico
      </Typography>
      <Typography variant="body1">
        Nombre: {tourPackage?.name || "No disponible"}
      </Typography>
      <Typography variant="body1">
        Precio (por persona): {tourPackage?.price} Bs.
      </Typography>
      <Typography variant="body1">Itinerario</Typography>
      <Typography variant="body1">
        Duracion (dias): {tourPackage?.duration || "No disponible"}
      </Typography>
      {tourPackage?.itinerary &&
        tourPackage.itinerary.days &&
        tourPackage.itinerary.days.map((day, index) => (
          <Box key={index}>
            <Typography variant="body1">Dia: {day.dayNumber}</Typography>
            {day.activities &&
              day.activities.length > 0 &&
              day.activities.map((activity, index) => (
                <Typography variant="body2" key={index} gutterBottom>
                  {activity.time} - {activity.description}
                </Typography>
              ))}
          </Box>
        ))}
    </Box>
  );
};
export default TourPackageInfo;
