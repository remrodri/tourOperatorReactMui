import { Avatar, Box, Typography } from "@mui/material";
import { User } from "../../userManagement/types/User";

interface GuidePerfilProps {
  loading: boolean;
  guideInfo: any | null;
}

const BASE_URL = "http://localhost:3000";

const GuidePerfil: React.FC<GuidePerfilProps> = ({ loading, guideInfo }) => {
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
        // width:"50%",
        height: "calc(100dvh - 86px)",
        // width: "100%",
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
          padding: "10px 20px",
          gap: "10px",
          width: {
            xs: "100%",
            sm: "100%",
            md: "60%",
          },
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" align="center" sx={{ padding: "20px" }}>
          Informacion del guia
        </Typography>
        {/* <Typography variant="body1" align="justify">Informacion del guia</Typography> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              background: "rgba(43, 37, 32, 0.47)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgb(46, 39, 33)",
              // backdropFilter: "blur(10px)",
              border: "1px solid rgb(73, 63, 54)",
              padding: "20px 30px",
            }}
          >
            <Avatar
              src={`${BASE_URL}${guideInfo?.imagePath}`}
              alt={guideInfo?.firstName}
              sx={{ width: 150, height: 150 }}
            />
            <Box>
              <Typography variant="body1" align="justify">
                Nombre:
              </Typography>
              <Typography variant="body1" align="justify">
                {guideInfo?.firstName}
              </Typography>
              <Typography variant="body1" align="justify">
                Apellido:
              </Typography>
              <Typography variant="body1" align="justify">
                {guideInfo?.lastName}
              </Typography>
              <Typography variant="body1" align="justify">
                Email:
              </Typography>
              <Typography variant="body1" align="justify">
                {guideInfo?.email}
              </Typography>
              <Typography variant="body1" align="justify">
                Telefono:
              </Typography>
              <Typography variant="body1" align="justify">
                {guideInfo?.phone}
              </Typography>
              <Typography variant="body1" align="justify">
                ci:
              </Typography>
              <Typography variant="body1" align="justify">
                {guideInfo?.ci}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GuidePerfil;
