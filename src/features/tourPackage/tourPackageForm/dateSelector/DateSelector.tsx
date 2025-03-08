import { Box, Typography, IconButton, Chip, Tooltip, Button } from "@mui/material";
import {
  DateCalendar,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';
import { DateRange } from './DateSelectorContainer';

interface DateSelectorProps {
  handleDateSelection: (date: Dayjs | null) => void;
  blockedDates: string[];
  selectedDates: string[];
  dateRanges: DateRange[];
  onRemoveRange: (rangeId: string) => void;
  onClearAllDates: () => void;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  handleDateSelection,
  blockedDates,
  selectedDates,
  dateRanges,
  onRemoveRange,
  onClearAllDates,
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
      <Box sx={{ mt: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="subtitle1">Fechas seleccionadas</Typography>
          {dateRanges.length > 0 && (
            <Button 
              variant="outlined" 
              color="error" 
              size="small" 
              onClick={onClearAllDates}
              startIcon={<DeleteIcon />}
            >
              Limpiar fechas
            </Button>
          )}
        </Box>
        {dateRanges.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {dateRanges.map((range) => (
              <Box 
                key={range.id} 
                sx={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  p: 1.5, 
                  bgcolor: "#f5f5f5", 
                  borderRadius: 1,
                  position: "relative"
                }}
              >
                <Box sx={{ position: "absolute", top: 5, right: 5 }}>
                  <IconButton 
                    size="small" 
                    color="error" 
                    onClick={() => onRemoveRange(range.id)}
                    sx={{ padding: "2px" }}
                  >
                    <Tooltip title="Eliminar este rango de fechas">
                      <DeleteIcon fontSize="small" />
                    </Tooltip>
                  </IconButton>
                </Box>
                
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
                  Rango: {range.dates[0]} a {range.dates[range.dates.length - 1]}
                </Typography>
                
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {range.dates.map((date, index) => (
                    <Chip
                      key={`${range.id}-${index}`}
                      label={date}
                      variant="outlined"
                      size="small"
                      sx={{
                        bgcolor: "#e3f2fd",
                        border: "1px solid #90caf9",
                      }}
                    />
                  ))}
                </Box>
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
