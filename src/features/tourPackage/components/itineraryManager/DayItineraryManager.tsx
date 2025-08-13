import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import { ActivityType } from "../../types/ActivityType";
import { DayItineraryType, TourItineraryType } from "../../types/DayItineraryType";
// import TextType from "../../../../TextAnimations/TextType/TextType";

interface DayItineraryManagerProps {
  duration: number;
  itinerary: TourItineraryType;
  onChange: (itinerary: TourItineraryType) => void;
}

// Using array indices instead of IDs for activities
const DayItineraryManager: React.FC<DayItineraryManagerProps> = ({
  duration,
  itinerary,
  onChange,
}) => {
  const [currentDay, setCurrentDay] = useState<number>(1);

  // Initialize or update days based on duration
  useEffect(() => {
    if (!duration || duration < 1) return;

    // If the current itinerary doesn't have the right number of days, initialize it
    if (!itinerary.days || itinerary.days.length !== duration) {
      const newDays: DayItineraryType[] = [];
      
      // Keep existing days where possible
      for (let i = 0; i < duration; i++) {
        if (itinerary.days && itinerary.days[i]) {
          newDays.push(itinerary.days[i]);
        } else {
          newDays.push({
            dayNumber: i + 1,
            activities: [],
          });
        }
      }
      
      onChange({ days: newDays });
      
      // Ensure selected day is valid
      if (currentDay > duration) {
        setCurrentDay(1);
      }
    }
  }, [duration, itinerary, onChange]);

  const handleDayChange = (event: React.SyntheticEvent, newDay: number) => {
    setCurrentDay(newDay);
  };

  const handleAddActivity = (dayNumber: number) => {
    const newActivity: ActivityType = {
      description: "",
      time: "",
    };
    const updatedDays = itinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: [...day.activities, newActivity],
        };
      }
      return day;
    });

    onChange({ days: updatedDays });
  };

  const handleDeleteActivity = (dayNumber: number, activityIndex: number) => {
    const updatedDays = itinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.filter((_, index) => index !== activityIndex),
        };
      }
      return day;
    });
    onChange({ days: updatedDays });
  };

  const handleActivityChange = (
    dayNumber: number,
    activityIndex: number,
    field: keyof ActivityType,
    value: string
  ) => {
    const updatedDays = itinerary.days.map((day) => {
      if (day.dayNumber === dayNumber) {
        return {
          ...day,
          activities: day.activities.map((activity, index) =>
            index === activityIndex ? { ...activity, [field]: value } : activity
          ),
        };
      }
      return day;
    });

    onChange({ days: updatedDays });
  };

  // Early return if no duration is set or it's invalid
  if (!duration || duration < 1 || !itinerary.days) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography color="text.secondary">
          Por favor, establezca una duración válida para el tour antes de configurar el itinerario.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Itinerario de actividades por día
      </Typography>
      {/* <TextType
        className="text-lg"
        text="Itinerario de actividades por día"
        typingSpeed={50}
        pauseDuration={1000}
        showCursor={true}
        cursorCharacter="_"
        deletingSpeed={50}
      /> */}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs 
          value={currentDay} 
          onChange={handleDayChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {itinerary.days.map((day) => (
            <Tab 
              key={day.dayNumber} 
              label={`Día ${day.dayNumber}`} 
              value={day.dayNumber} 
            />
          ))}
        </Tabs>
      </Box>

      {itinerary.days.map((day) => (
        <Box
          key={day.dayNumber}
          sx={{ display: currentDay === day.dayNumber ? 'block' : 'none' }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="subtitle1">Actividades para el Día {day.dayNumber}</Typography>
            {/* <TextType
              className="text-lg"
              text={`Actividades para el día ${day.dayNumber}`}
              typingSpeed={50}
              pauseDuration={1000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
            /> */}
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              onClick={() => handleAddActivity(day.dayNumber)}
              size="small"
            >
              Agregar Actividad
            </Button>
          </Box>

          {day.activities.length === 0 ? (
            <Typography
              color="text.secondary"
              sx={{ fontStyle: "italic", textAlign: "center", my: 2 }}
            >
              No hay actividades agregadas para este día. Haz clic en "Agregar Actividad" para comenzar.
            </Typography>
          ) : (
            <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
              {day.activities.map((activity, index) => (
                <Paper
                  key={index}
                  elevation={1}
                  sx={{ p: 2, mb: 2, bgcolor: "background.default" }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={1}>
                      <Typography variant="body2" fontWeight="bold">
                        #{index + 1}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Descripción de la actividad"
                        size="small"
                        value={activity.description}
                        onChange={(e) =>
                          handleActivityChange(
                            day.dayNumber,
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        fullWidth
                        label="Hora"
                        size="small"
                        type="time"
                        value={activity.time}
                        onChange={(e) =>
                          handleActivityChange(
                            day.dayNumber,
                            index,
                            "time",
                            e.target.value
                          )
                        }
                        InputLabelProps={{
                          shrink: true,
                        }}
                        inputProps={{
                          step: 300, // 5 min
                        }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={2}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteActivity(day.dayNumber, index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}
        </Box>
      ))}

      {/* Alternative Accordion View */}
      <Box sx={{ display: 'none' }}> {/* This is hidden by default */}
        {itinerary.days.map((day) => (
          <Accordion key={day.dayNumber}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`day${day.dayNumber}-content`}
              id={`day${day.dayNumber}-header`}
            >
              <Typography>Día {day.dayNumber} ({day.activities.length} actividades)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mb: 2,
                }}
              >
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddActivity(day.dayNumber)}
                  size="small"
                >
                  Agregar Actividad
                </Button>
              </Box>

              {day.activities.length === 0 ? (
                <Typography
                  color="text.secondary"
                  sx={{ fontStyle: "italic", textAlign: "center", my: 2 }}
                >
                  No hay actividades para este día.
                </Typography>
              ) : (
                day.activities.map((activity, index) => (
                  <Paper
                    key={index}
                    elevation={1}
                    sx={{ p: 2, mb: 2, bgcolor: "background.default" }}
                  >
                    {/* Same grid content as in the tabs view */}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={1}>
                        <Typography variant="body2" fontWeight="bold">
                          #{index + 1}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Descripción de la actividad"
                          size="small"
                          value={activity.description}
                          onChange={(e) =>
                            handleActivityChange(
                              day.dayNumber,
                              index,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          fullWidth
                          label="Hora"
                          size="small"
                          type="time"
                          value={activity.time}
                          onChange={(e) =>
                            handleActivityChange(
                              day.dayNumber,
                              index,
                              "time",
                              e.target.value
                            )
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          inputProps={{
                            step: 300, // 5 min
                          }}
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={2}
                        sx={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteActivity(day.dayNumber, index)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Paper>
                ))
              )}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default DayItineraryManager;

