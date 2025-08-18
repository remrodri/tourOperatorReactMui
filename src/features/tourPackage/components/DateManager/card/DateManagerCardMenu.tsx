import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const options = ["Completado", "Cancelado", "Editar"];

interface DateManagerCardMenuProps {
  onOptionSelect: (option: string) => void;
  state: string;
  // handleClickInfo: () => void;
}

const DateManagerCardMenu: React.FC<DateManagerCardMenuProps> = ({
  onOptionSelect,
  state,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // slotProps={
        //   { paper: { style: { width: "20ch" } } }
        // }
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={state !== "pending"}
          >
            {option}
          </MenuItem>
        ))}
        <MenuItem
          key={"Ver reservas"}
          onClick={() => handleOptionClick("Ver reservas")}
        >
          Ver reservas
        </MenuItem>
      </Menu>
    </>
  );
};
export default DateManagerCardMenu;
