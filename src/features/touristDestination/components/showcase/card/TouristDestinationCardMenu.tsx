import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, MouseEvent } from "react";

const options = [
  "Ver mas",
  "Ver galeria",
  // "Editar",
  // "Dar de baja"
];

interface TouristDestinationCardMenuProps {
  onOptionSelect: (option: string) => void;
  role: string;
}

const TouristDestinationCardMenu: React.FC<TouristDestinationCardMenuProps> = ({
  onOptionSelect,
  role,
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
        slotProps={{
          paper: { style: { width: "20ch" } },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
        {role === "690cbf7c64756dcc541d8a19" && (
          <MenuItem key="Editar" onClick={() => handleOptionClick("Editar")}>
            Editar
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
export default TouristDestinationCardMenu;
