import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MouseEvent, useMemo, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export type DateRangeStatus = "completed" | "cancelled";

interface DateSelectorCardMenuProps {
  disabled?: boolean;
  onStatusChange: (status: DateRangeStatus) => void;
}

const DateSelectorCardMenu: React.FC<DateSelectorCardMenuProps> = ({
  disabled = false,
  onStatusChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if (disabled) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleSelect = (status: DateRangeStatus) => {
    onStatusChange(status);
    handleClose();
  };

  const options = useMemo(
    () => [
      {
        label: "Completado",
        value: "completed" as const,
        icon: <CheckCircleIcon fontSize="small" />,
      },
      {
        label: "Cancelado",
        value: "cancelled" as const,
        icon: <CancelIcon fontSize="small" />,
      },
    ],
    [],
  );

  return (
    <>
      <IconButton
        aria-label="more"
        id="date-range-menu-button"
        aria-controls={open ? "date-range-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        disabled={disabled}
        size="small"
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>

      <Menu
        id="date-range-menu"
        MenuListProps={{ "aria-labelledby": "date-range-menu-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} onClick={() => handleSelect(opt.value)}>
            <ListItemIcon>{opt.icon}</ListItemIcon>
            <ListItemText>{opt.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DateSelectorCardMenu;
