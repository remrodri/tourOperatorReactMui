import { Box, Typography } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface DateSelectorProps {
  handleDateSelection: (date: Dayjs | null) => void;
  blockedDates: string[];
  selectedDates: string[];
}

const DateSelector: React.FC<DateSelectorProps> = ({
  handleDateSelection,
  blockedDates,
  selectedDates,
}) => {
  // Función para bloquear fechas
  const shouldDisableDate = (date: Dayjs) => {
    const formattedDate = date.format("DD-MM-YYYY");
    return blockedDates.includes(formattedDate);
  };

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast
          onChange={(newDate) => handleDateSelection(dayjs(newDate))}
          shouldDisableDate={shouldDisableDate}
          slotProps={{
            day: (ownerState) => {
              const formattedDate = dayjs(ownerState.day).format("DD-MM-YYYY");

              return {
                sx: selectedDates.includes(formattedDate)
                  ? {
                      backgroundColor: "#1976D2",
                      color: "#fff",
                      borderRadius: "50%",
                      "&:hover": {
                        backgroundColor: "#1565C0",
                      },
                    }
                  : {},
              };
            },
          }}
        />
      </LocalizationProvider>

      {/* Mostrar fechas seleccionadas debajo del calendario */}
      <Box sx={{ mt: 2, mb:3 }}>
        <Typography variant="subtitle1">Fechas seleccionadas</Typography>
        {selectedDates.length > 0 ? (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedDates.map((date, index) => (
              <Box key={index}>
                <Typography
                  sx={{
                    background: "#ddd",
                    padding: "4px 8px",
                    borderRadius: "4px",
                  }}
                >
                  {date}
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography color="error">No hay fechas seleccionadas</Typography>
        )}
      </Box>
    </Box>
  );
};

export default DateSelector;
