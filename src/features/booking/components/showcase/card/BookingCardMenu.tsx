import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";

const options = ["Ver detalles", "Editar", "Registrar pago","Cancelar"];

interface BookingCardMenuProps {
  onOptionSelect: (option: string) => void;
  balance: number;
  status: string;
}

const BookingCardMenu: React.FC<BookingCardMenuProps> = ({
  onOptionSelect,
  balance,
  status,
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
        aria-controls={open ? "long=menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => 
        {
          if (option === "Registrar pago" && balance === 0) { 
            return null
          }
          return <MenuItem key={option} onClick={() => handleOptionClick(option)} disabled={option === "Cancelar" && status !== "pending" || option === "Editar" && status !== "pending"}>
            {option}
          </MenuItem>
          }
        )}
      </Menu>
    </>
  );
};

export default BookingCardMenu;
