import { Box, Typography } from "@mui/material";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { User } from "../../../userManagement/types/UserType";

interface TourPackageProps {
  loading: boolean;
  tourPackage: TourPackageType | null;
  asignedGuides: User[];
}

const TourPackage: React.FC<TourPackageProps> = ({
  tourPackage,
  loading,
  asignedGuides,
}) => {
  // console.log("tourPackage::: ", tourPackage);
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "calc(100dvh - 86px)",
        p: "0 10px 0 10px",
      }}
    >
      {loading ? (
        <Typography variant="h5">Cargando...</Typography>
      ) : (
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
              Guías asignados:
            </Typography>
            {asignedGuides.length === 0 ? (
              <Typography variant="body1" align="justify">
                Solo tú
              </Typography>
            ) : (
              // <Typography variant="body1" align="justify">
              <Box>
                {asignedGuides.map((guide) => (
                  <Box key={guide.id}>
                    <Typography variant="body1" align="justify">
                      {guide.firstName} {guide.lastName}
                    </Typography>
                    <Typography variant="body1" align="justify">
                      {guide.phone}
                    </Typography>
                  </Box>
                ))}
              </Box>
              // </Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TourPackage;
