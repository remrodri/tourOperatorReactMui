import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
// import Grid from "@mui/material/Grid2"; // ✅ Grid2 (para usar size={{xs,sm}})
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import { ActivityType } from "../../types/ActivityType";
import {
  DayItineraryType,
  TourItineraryType,
} from "../../types/DayItineraryType";

interface DayItineraryManagerProps {
  duration: number;
  itinerary: TourItineraryType;
  onChange: (itinerary: TourItineraryType) => void;
}

const emptyActivity = (): ActivityType => ({ description: "", time: "" });

const isCompleteActivity = (a: ActivityType) =>
  a.description.trim().length > 0 && a.time.trim().length > 0;

const DayItineraryManager: React.FC<DayItineraryManagerProps> = ({
  duration,
  itinerary,
  onChange,
}) => {
  const [currentDay, setCurrentDay] = useState<number>(1);

  // Normaliza days (si por alguna razón llega vacío)
  // const days: DayItineraryType[] = useMemo(() => {
  //   return itinerary?.days ?? [];
  // }, [itinerary]);

  /**
   * ✅ Ajusta el número de días SOLO cuando cambia duration.
   * Evita depender de itinerary completo para no provocar loops.
   */
  useEffect(() => {
    if (!duration || duration < 1) return;

    const current = itinerary?.days ?? [];
    if (current.length === duration) {
      // Asegura que currentDay no se salga
      if (currentDay > duration) setCurrentDay(1);
      return;
    }

    const newDays: DayItineraryType[] = Array.from(
      { length: duration },
      (_, i) => {
        const existing = current[i];
        return existing
          ? { ...existing, dayNumber: i + 1 } // re-numera por si acaso
          : { dayNumber: i + 1, activities: [] };
      },
    );

    onChange({ days: newDays });

    if (currentDay > duration) setCurrentDay(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]); // ✅ SOLO duration

  const handleDayChange = (_: unknown, newDay: number) => setCurrentDay(newDay);

  const updateDay = useCallback(
    (
      dayNumber: number,
      updater: (day: DayItineraryType) => DayItineraryType,
    ) => {
      const updatedDays = (itinerary.days ?? []).map((day) =>
        day.dayNumber === dayNumber ? updater(day) : day,
      );
      onChange({ days: updatedDays });
    },
    [itinerary.days, onChange],
  );

  const handleAddActivity = (dayNumber: number) => {
    const day = itinerary.days.find((d) => d.dayNumber === dayNumber);
    const last = day?.activities?.[day.activities.length - 1];

    // ✅ No permitir agregar si la última actividad está incompleta
    if (last && !isCompleteActivity(last)) return;

    updateDay(dayNumber, (d) => ({
      ...d,
      activities: [...d.activities, emptyActivity()],
    }));
  };

  const handleDeleteActivity = (dayNumber: number, activityIndex: number) => {
    updateDay(dayNumber, (d) => ({
      ...d,
      activities: d.activities.filter((_, idx) => idx !== activityIndex),
    }));
  };

  const handleActivityChange = (
    dayNumber: number,
    activityIndex: number,
    field: keyof ActivityType,
    value: string,
  ) => {
    updateDay(dayNumber, (d) => ({
      ...d,
      activities: d.activities.map((a, idx) =>
        idx === activityIndex ? { ...a, [field]: value } : a,
      ),
    }));
  };

  // Early return si duration inválida
  if (!duration || duration < 1 || !itinerary?.days) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography color="text.secondary">
          Por favor, establezca una duración válida antes de configurar el
          itinerario.
        </Typography>
      </Box>
    );
  }

  const currentDayObj = itinerary.days.find((d) => d.dayNumber === currentDay);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Itinerario de actividades por día
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 2 }}>
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

        {currentDayObj && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <Typography variant="subtitle1">
                Actividades para el Día {currentDayObj.dayNumber}
              </Typography>

              {/* ✅ Si la última actividad está incompleta, no dejar agregar otra */}
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                color="primary"
                onClick={() => handleAddActivity(currentDayObj.dayNumber)}
                size="small"
                disabled={
                  currentDayObj.activities.length > 0 &&
                  !isCompleteActivity(
                    currentDayObj.activities[
                      currentDayObj.activities.length - 1
                    ],
                  )
                }
              >
                Agregar Actividad
              </Button>
            </Box>

            {currentDayObj.activities.length === 0 ? (
              <Typography
                color="text.secondary"
                sx={{ fontStyle: "italic", textAlign: "center", my: 2 }}
              >
                No hay actividades agregadas para este día.
              </Typography>
            ) : (
              <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
                {currentDayObj.activities.map((activity, index) => {
                  const descError = activity.description.trim().length === 0;
                  const timeError = activity.time.trim().length === 0;

                  return (
                    <Paper
                      key={index}
                      elevation={1}
                      sx={{ p: 2, mb: 2, bgcolor: "background.default" }}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid size={{ xs: 12, sm: 1 }}>
                          <Typography variant="body2" fontWeight="bold">
                            #{index + 1}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            required
                            label="Descripción de la actividad"
                            size="small"
                            value={activity.description}
                            error={descError}
                            helperText={descError ? "Requerido" : " "}
                            onChange={(e) =>
                              handleActivityChange(
                                currentDayObj.dayNumber,
                                index,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                          <TimePicker
                            label="Hora"
                            value={
                              activity.time
                                ? dayjs(activity.time, "HH:mm")
                                : null
                            }
                            onChange={(newValue: Dayjs | null) =>
                              handleActivityChange(
                                currentDayObj.dayNumber,
                                index,
                                "time",
                                newValue ? newValue.format("HH:mm") : "",
                              )
                            }
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                size: "small",
                                required: true,
                                error: timeError,
                                helperText: timeError ? "Requerido" : " ",
                              },
                            }}
                          />
                        </Grid>

                        <Grid
                          size={{ xs: 12, sm: 2 }}
                          sx={{ display: "flex", justifyContent: "flex-end" }}
                        >
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDeleteActivity(
                                currentDayObj.dayNumber,
                                index,
                              )
                            }
                            size="small"
                            aria-label="Eliminar actividad"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  );
                })}
              </Box>
            )}

            {/* ✅ Mensaje UX si no deja agregar otra por incompleta */}
            {currentDayObj.activities.length > 0 &&
              !isCompleteActivity(
                currentDayObj.activities[currentDayObj.activities.length - 1],
              ) && (
                <Typography variant="caption" color="error">
                  Completa la última actividad (descripción y hora) antes de
                  agregar otra.
                </Typography>
              )}
          </Box>
        )}
      </Box>
    </LocalizationProvider>
  );
};

export default DayItineraryManager;
