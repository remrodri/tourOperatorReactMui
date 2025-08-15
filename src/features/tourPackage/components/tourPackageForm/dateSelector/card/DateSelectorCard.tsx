import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { DateRangeType } from "../../../../types/DateRangeType";
import { User } from "../../../../../userManagement/types/User";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, MouseEvent } from "react";
import DateSelectorCardMenu from "./DateSelectorCardMenu";
import { useDateRangeContext } from "../../../../../dateRange/context/DateRangeContext";
interface DateSelectorCardProps {
  range: DateRangeType;
  guides: User[];
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
  const [openMenu, setOpenMenu] = useState(false);
  const { updateDateRangeStatus } = useDateRangeContext();
  const handleClick = (option: string) => {
    // setAnchorEl(anchorEl);
    // console.log(option);
    if (range.id) {
      let status: string = "";
      if (option === "Completado") {
        status = "completed";
      } else if (option === "Cancelado") {
        status = "cancelled";
      }
      // console.log('option::: ', status);
      updateDateRangeStatus(range.id, status);
    }
    setOpenMenu(false);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };
  return (
    <Card
      key={index}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "#5f5f5f",
        borderRadius: 1,
      }}
    >
      <Box>
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          {range.dates?.[0] ? (
            // `${range.dates[0]} al ${
            //     range.dates[range.dates.length - 1]
            //   }`
            range.dates.length === 1 ? (
              <Chip label={range.dates[0]} size="small" />
            ) : (
              // `${range.dates[0]} al ${range.dates[range.dates.length - 1]}`
              <>
                <Chip label={range.dates[0]} size="small" />
                {" al "}
                <Chip
                  label={range.dates[range.dates.length - 1]}
                  size="small"
                />
              </>
            )
          ) : (
            "Fechas no disponibles"
          )}
        </Typography>

        {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {range.dates?.map((date, index) => (
                            <Chip key={index} label={date} size="small" />
                          )) || []}
                        </Box> */}
        {/* Display assigned guides */}
        {range.guides && range.guides.length > 0 && (
          <Box>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Guia(s) asignado(s):
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 0.5,
                mt: 0.5,
              }}
            >
              {range.guides.map((guideId) => {
                const guide = guides.find((g) => g.id === guideId);
                return guide ? (
                  <Chip
                    key={guide.id}
                    label={`${guide.firstName} ${guide.lastName}`}
                    size="small"
                    variant="filled"
                    color="primary"
                  />
                ) : null;
              })}
            </Box>
          </Box>
        )}
      </Box>
      {isEditing ? (
        <DateSelectorCardMenu onOptionSelect={handleClick} />
      ) : (
        <IconButton
          color="error"
          // onClick={() => handleRemoveRange(range.id)}
          onClick={() => handleRemoveRange(index)}
          size="small"
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Card>
  );
};

export default DateSelectorCard;
