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
  selectedDates: string[];
  dateRanges: DateRange[];
  onRemoveRange: (rangeId: string) => void;
  onClearAllDates: () => void;
}

const DateSelector2: React.FC<DateSelectorProps> = ({
  handleDateSelection,
  selectedDates,
  dateRanges,
  onRemoveRange,
  onClearAllDates,
}) => {
  // console.log('dateRanges::: ', dateRanges);
  // Debug log to check selected dates being passed to the component
  // console.log('DateSelector - selectedDates:', selectedDates);
  // console.log('DateSelector - dateRanges:', dateRanges);

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          disablePast
          onChange={(newDate) => handleDateSelection(dayjs(newDate))}
          slotProps={{
            day: (ownerState) => {
              const formattedDate = dayjs(ownerState.day).format("DD-MM-YYYY");
              
              // Debug logs to check date comparison
              const isIncluded = selectedDates.includes(formattedDate);
              // if (ownerState.day.date() === 1 || ownerState.day.date() === 15) {
                // Only log for certain days to avoid excessive logs
                // console.log(`DateSelector - Checking day: ${formattedDate}`, {
                //   formattedDate,
                //   isIncluded,
                //   dayJSFormat: ownerState.day.format("DD-MM-YYYY"),
                //   selectedDatesArray: selectedDates,
                //   exactMatch: selectedDates.some(d => d === formattedDate)
                // });
              // }

              return {
                sx: isIncluded
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
          // Debug log when rendering date ranges
          // console.log('DateSelector - Rendering date ranges:', dateRanges) || 
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

export default DateSelector2;
