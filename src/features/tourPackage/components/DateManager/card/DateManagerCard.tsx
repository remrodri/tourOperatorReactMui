import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { DateRangeType } from "../../../types/DateRangeType";
import { User } from "../../../../userManagement/types/User";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DateManagerCardMenu from "./DateManagerCardMenu";
import { useEffect, useState } from "react";

interface DateManagerCardProps {
  dateRange: DateRangeType;
  guides: User[];
  handleOptionSelect: (option: string) => void;
  touristCounter: number;
}
const DateManagerCard: React.FC<DateManagerCardProps> = ({
  dateRange,
  guides,
  handleOptionSelect,
  touristCounter,
}) => {
  // console.log("dateRange::: ", dateRange);
  // console.log("guides::: ", guides);
  const [color, setColor] = useState<any>("primary");
  const [estateName, setEstateName] = useState<string>("");

  useEffect(() => {
    if (dateRange.state === "completed") {
      setColor("success");
      setEstateName("Completado");
      return;
    }
    if (dateRange.state === "cancelled") {
      setColor("error");
      setEstateName("Cancelado");
      return;
    }
    if (dateRange.state === "pending") {
      setColor("warning");
      setEstateName("Pendiente");
    }
  }, [dateRange]);

  return (
    <Card
      sx={{
        width: "100%",
        // maxWidth: 345,
        // minWidth: 300,
        // width: 300,
        // rgb(70, 120, 253)
        // borderRadius: "10px",
        // background: "rgba(10,10,10,0.52)",
        // boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        // backdropFilter: "blur(10px)",
        border: "1px solid rgba(10,10,10,0.6)",
        height: "100%",
        display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-between",
        // display: "grid",
        // gridTemplateRows: "1fr 1fr",
        // gridTemplateColumns: "1fr 1fr",
        p: 1.5,
        gap: 1,
      }}
    >
      {/* <CardContent> */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // gridColumn: "1/2",
            // gridRow: "1/2",
            // height: "3rem",
          }}
        >
          {dateRange.dates?.length === 1 ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">Fecha:</Typography>
              <Chip label={dateRange.dates?.[0]} sx={{ fontSize: "0.8rem" }} />
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="body2">Fechas:</Typography>
              <Chip label={dateRange.dates?.[0]} sx={{ fontSize: "0.8rem" }} />
              {" al "}
              <Chip
                label={dateRange.dates?.[dateRange.dates?.length - 1]}
                sx={{ fontSize: "0.8rem" }}
              />
            </Box>
          )}
          {/* <Chip label={dateRange.state} color={color} /> */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2">Estado:</Typography>
          <Chip label={estateName} color={color} sx={{ fontSize: "0.8rem" }} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // gridColumn: "1/2",
            // gridRow: "2/3",
          }}
        >
          {guides?.length === 1 ? (
            <Box
              sx={{
                // height: "100%",
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
                gap: 1,
                // flexWrap: "wrap",
              }}
            >
              <Typography variant="body2">Guía:</Typography>
              <Chip
                label={`${guides?.[0].firstName} ${guides?.[0].lastName}`}
                // color="primary"
                sx={{ fontSize: "0.8rem", fontWeight: "normal" }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                gap: 1,
                // flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography variant="body2">Guías:</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                {guides.map((guide) => (
                  <Chip
                    key={guide.id}
                    label={`${guide.firstName} ${guide.lastName}`}
                    size="small"
                    variant="filled"
                    // color="primary"
                    sx={{ fontSize: "0.8rem" }}
                  />
                ))}
              </Box>
            </Box>
          )}
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Typography variant="body2">Turistas:</Typography>
            <Chip
              label={touristCounter.toString()}
              // color="info"
              sx={{ fontSize: "0.8rem" }}
            />
          </Box>
        </Box>
      </Box>
      {/* </CardContent> */}
      <Box
        sx={{
          // gridColumn: "2/3",
          // gridRow: "1/3",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          width: "3rem",
        }}
      >
        <DateManagerCardMenu onOptionSelect={handleOptionSelect} state={dateRange.state ?? ""}/>
      </Box>
      {/* {dateRange.state === "pending" && (
        <Box
          sx={{
            // gridColumn: "2/3",
            // gridRow: "1/3",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            width: "3rem",
          }}
        >
          <DateManagerCardMenu onOptionSelect={handleOptionSelect} />
        </Box>
      )} */}
    </Card>
  );
};

export default DateManagerCard;
