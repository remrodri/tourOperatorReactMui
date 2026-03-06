import React, { useMemo } from "react";
import { Box, Card, Chip, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { DateRangeType } from "../../../../types/DateRangeType";
import { UserType } from "../../../../../userManagement/types/UserType";

import DateSelectorCardMenu, { DateRangeStatus } from "./DateSelectorCardMenu";

// Si luego reactivas tu context:
// import { useDateRangeContext } from "../../../../../dateRange/context/DateRangeContext";

interface DateSelectorCardProps {
  range: DateRangeType;
  guides: UserType[];
  index: number;
  handleRemoveRange: (index: number) => void;
  isEditing: boolean;
}

const DateSelectorCard: React.FC<DateSelectorCardProps> = ({
  range,
  guides,
  index,
  handleRemoveRange,
  isEditing,
}) => {
  const dates = range.dates ?? [];
  const guideIds = range.guides ?? [];

  const guideMap = useMemo(
    () => new Map(guides.map((g) => [g.id, g])),
    [guides],
  );

  const startDate = dates[0];
  const endDate = dates.length > 1 ? dates[dates.length - 1] : undefined;

  const handleStatusChange = (status: DateRangeStatus) => {
    // ✅ Aquí conectas tu backend cuando quieras:
    // if (range.id) updateDateRangeStatus(range.id, status);

    // Por ahora, al menos puedes loguearlo:
    console.log("DateRange status change:", { rangeId: range.id, status });
  };

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 2,
        p: 2,
        bgcolor: "#5f5f5f",
        borderRadius: 1,
      }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        {/* Fechas */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
            Rango:
          </Typography>

          {startDate ? (
            <>
              <Chip label={startDate} size="small" />
              {endDate && (
                <>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    al
                  </Typography>
                  <Chip label={endDate} size="small" />
                </>
              )}
              <Chip
                label={`${dates.length} día(s)`}
                size="small"
                variant="outlined"
                sx={{ ml: 0.5 }}
              />
            </>
          ) : (
            <Typography variant="caption" color="error">
              Fechas no disponibles
            </Typography>
          )}
        </Box>

        {/* Guías */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" sx={{ fontWeight: "bold" }}>
            Guía(s) asignado(s):
          </Typography>

          {guideIds.length > 0 ? (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 0.5 }}>
              {guideIds.map((guideId) => {
                const guide = guideMap.get(guideId);
                return guide ? (
                  <Chip
                    key={guide.id}
                    label={`${guide.firstName} ${guide.lastName}`}
                    size="small"
                    color="primary"
                  />
                ) : (
                  <Chip
                    key={guideId}
                    label={`Guía desconocida (${guideId})`}
                    size="small"
                    color="warning"
                    variant="outlined"
                  />
                );
              })}
            </Box>
          ) : (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 0.5 }}
            >
              Sin guías asignados
            </Typography>
          )}
        </Box>
      </Box>

      {/* Acciones */}
      {isEditing ? (
        <DateSelectorCardMenu
          disabled={!range.id} // ✅ sin id no puedes actualizar estado en backend
          onStatusChange={handleStatusChange} // ✅ callback real
        />
      ) : (
        <IconButton
          color="error"
          onClick={() => handleRemoveRange(index)}
          size="small"
          aria-label="Eliminar rango"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Card>
  );
};

export default React.memo(DateSelectorCard);
