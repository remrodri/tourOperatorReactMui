import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import { Group } from "../context/GuideContext";

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
  if (loading) return <Box>Cargando...</Box>;

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        background: "rgba(0,0,0,0.6)",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.4)",
        padding: "10px",
        gap: "10px",
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
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {attendanceList.map((subList, groupIndex) => (
          <Box
            key={groupIndex}
            sx={{
              width: {
                xs: "100%",
                sm: "100%",
                md: "50%",
              },
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
                  p: "10px",
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
          // width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "50%",
            },
          }}
          variant="contained"
          color="primary"
          onClick={handleRegisterAttendance}
        >
          Registrar asistencia
        </Button>
      </Box>
    </Box>
  );
};

export default TouristList;
