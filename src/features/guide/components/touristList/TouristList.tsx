// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Checkbox,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from "@mui/material";
// import PersonIcon from '@mui/icons-material/Person';
// import PhoneIcon from '@mui/icons-material/Phone';
// import { Group } from "../../context/GuideContext";

import {
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  Typography,
} from "@mui/material";
import { Group } from "../../context/GuideContext";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";

interface TouristListProps {
  attendanceList: Group[];
  handleCheckboxChange: (touristId: string) => void;
  loading: boolean;
  handleRegisterAttendance: () => void;
}

const TouristList: React.FC<TouristListProps> = ({
  attendanceList,
  handleCheckboxChange,
  loading,
  handleRegisterAttendance,
}) => {
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
      {loading ? (
        <Box>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            p: "20px 20px",
            // flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            // background: "rgba(0,0,0,0.6)",
            background: "rgba(88, 83, 79, 0.4)",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgb(41, 39, 37)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(191, 182, 174, 1)",
            // padding: "10px",
            gap: "10px",
            width: {
              xs: "100%",
              sm: "100%",
              md: "60%",
            },

            overflowY: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Lista de turistas
          </Typography>
          <Box
            sx={{
              // flexGrow: 1,
              display: "flex",
              // alignItems: "center",
              flexDirection: "column",
              // gap: "10px",
            }}
          >
            {attendanceList.map((subList, groupIndex) => (
              <Box
                key={groupIndex}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  // width: {
                  //   xs: "100%",
                  //   sm: "100%",
                  //   md: "50%",
                  // },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    pl: "10px",
                  }}
                >
                  Grupo: {groupIndex + 1}
                </Typography>
                {subList.group.map((tourist: any, touristIndex: number) => (
                  <Card
                    key={touristIndex}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      // justifyContent: "center",
                      // alignItems: "center",
                      p: "10px 10px 10px 15px",
                      borderRadius: "12px",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "5px", // grosor de la barra
                        height: "100%",
                        backgroundColor:
                          tourist.status === "present" ? "#00C853" : "#FF0000",
                        // borderTopLeftRadius: "12px",
                        // borderBottomLeftRadius: "12px",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <PersonIcon />
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {tourist.tourist.firstName} {tourist.tourist.lastName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <PhoneIcon />
                      <Typography
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {tourist.tourist.phone}
                      </Typography>
                    </Box>
                    <Checkbox
                      checked={tourist.status === "present"}
                      onChange={() => handleCheckboxChange(tourist.tourist.id)}
                    />
                  </Card>
                ))}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              pt: "10px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              // sx={{
              //   width: {
              //     xs: "100%",
              //     sm: "100%",
              //     // md: "50%",
              //   },
              // }}
              variant="contained"
              color="primary"
              onClick={handleRegisterAttendance}
            >
              Registrar asistencia
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TouristList;
