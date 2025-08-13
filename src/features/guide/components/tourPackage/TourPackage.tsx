import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { User } from "../../../userManagement/types/User";

interface TourPackageProps {
  loading: boolean;
  tourPackage: TourPackageType | null;
  pendingDateRange: DateRangeType | null;
  asignedGuides: User[];
}

const TourPackage: React.FC<TourPackageProps> = ({
  loading,
  tourPackage,
  pendingDateRange,
  asignedGuides,
}) => {
  // console.log("tourPackage::: ", tourPackage);
  // console.log("pendingDateRange::: ", pendingDateRange);
  // console.log("asignedGuides::: ", asignedGuides);
  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // background: "rgba(0,0,0,0.6)",
          background: "rgba(191, 182, 174, 0.25)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0,0,0,1)",
          // backdropFilter: "blur(10px)",
          border: "1px solid rgba(0,0,0,0.4)",
          // padding: "10px",
          // gap: "10px",
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Typography variant="h5">Cargando...</Typography>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        p: "10px",
        flexGrow: 1,
        height: "calc(100dvh - 86px)",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // background: "rgba(197, 18, 18, 0.6)",
        // justifyContent: "center",
        // overflowY: "auto",
        // pb:"5px"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // background: "rgba(0,0,0,0.6)",
          background: "rgba(88, 83, 79, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgb(41, 39, 37)",
          // boxShadow: {
          //   // xs: "0 4px 10px rgb(41, 39, 37)",
          //   // sm: "0 4px 10px rgb(41, 39, 37)",
          //   md: "10px 0 10px -4px rgba(46, 39, 33, 0.69), -10px 0 10px -4px rgba(46, 39, 33, 0.69)",
          // },
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(191, 182, 174, 1)",
          padding: "20px 20px",
          gap: "10px",
          width: {
            xs: "100%",
            sm: "100%",
            md: "60%",
          },
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" align="center">
          Paquete Turístico
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            background: "rgba(43, 37, 32, 0.47)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgb(46, 39, 33)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgb(73, 63, 54)",
            padding: "20px",
            // pb:"5px"
          }}
        >
          <Typography variant="h6" align="center">
            {tourPackage?.name}
          </Typography>
          <Typography variant="body1" align="justify">
            Duración: {tourPackage?.duration} días
          </Typography>
          <Typography variant="body1" align="justify">
            Precio: {tourPackage?.price} Bs.
          </Typography>
          <Typography variant="body1" align="justify">
            Fecha(s):{" "}
            {pendingDateRange?.dates && pendingDateRange?.dates?.length > 1
              ? `${pendingDateRange?.dates[0]} - ${
                  pendingDateRange?.dates[pendingDateRange?.dates.length - 1]
                }`
              : pendingDateRange?.dates?.[0]}
          </Typography>
          <Typography variant="body1" align="justify">
            {/* Itinerario: {tourPackage?.itinerary?.days?.length} días */}
            Guías asignados:{" "}
            {asignedGuides.length === 0
              ? "Solo tú"
              : asignedGuides
                  .map((guide) => `${guide.firstName} ${guide.lastName}`)
                  .join(", ")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default TourPackage;
