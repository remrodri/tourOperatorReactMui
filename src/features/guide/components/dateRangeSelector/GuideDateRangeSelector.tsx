import { Box, Button, Typography } from "@mui/material";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { CustomDateRangeType } from "../../context/GuideContext";

interface GuideDateRangeSelectorProps {
  guideDateRanges: CustomDateRangeType[];
  loading: boolean;
  setCurrentDateRange: (dateRange: CustomDateRangeType) => void;
}

const GuideDateRangeSelector: React.FC<GuideDateRangeSelectorProps> = ({
  guideDateRanges,
  loading,
  setCurrentDateRange,
}) => {
  // console.log("guideDateRanges::: ", guideDateRanges);
  return (
    <Box
      sx={{
        p: "10px",
        flexGrow: 1,
        height: "calc(100dvh - 86px)",
        width: "100%",
        display: "flex",
        // flexDirection: "column",
        alignItems: "center",
        // background: "rgba(197, 18, 18, 0.6)",
        justifyContent: "center",
        // overflowY: "auto",
        // pb:"5px"
      }}
    >
      {loading ? (
        <Typography variant="h5">Cargando...</Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(191, 182, 174, 0.25)",
            borderRadius: "16px",
            boxShadow: "0 4px 10px rgba(0,0,0,1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(191, 182, 174, 0.35)",
            padding: "10px",
            gap: "10px",
            // justifyContent: "center",
            width: "40rem",
            height: "100%",
          }}
        >
          <Typography variant="h6">Tours asignados</Typography>
          {guideDateRanges.map((dateRange) => (
            <Button
              key={dateRange.id}
              variant="contained"
              sx={{
                width: "100%",
                // height: "5rem",
              }}
              onClick={() => setCurrentDateRange(dateRange)}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">{dateRange.tpName}</Typography>
                <Typography variant="body2">
                  {dateRange.dates && dateRange.dates?.length > 1
                    ? dateRange.dates[0] +
                      " - " +
                      dateRange.dates[dateRange.dates.length - 1]
                    : dateRange.dates?.[0]}
                </Typography>
              </Box>
            </Button>
            // <Box
            //   key={dateRange.id}
            //   sx={{
            //     display: "flex",
            //     flexDirection: "column",
            //     alignItems: "center",
            //   }}
            // >
            //   fechas
            //   {/* <Typography variant="h5">{dateRange.dates}</Typography>
            //   <Typography variant="h5">{dateRange.endDate}</Typography> */}
            // </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default GuideDateRangeSelector;
