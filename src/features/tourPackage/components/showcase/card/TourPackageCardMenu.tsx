import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TourPackageType } from "../../../types/TourPackageType";

const options = [
  "Ver mas",
  "Editar",
  "Gestion de fechas",
  // "Inhabilitar"
];

interface TourPackageCardMenuProps {
  onOptionSelect: (option: string) => void;
  tourPackage: TourPackageType;
  role: string;
  // handleClickInfo: () => void;
}

const TourPackageCardMenu: React.FC<TourPackageCardMenuProps> = ({
  onOptionSelect,
  tourPackage,
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
        slotProps={{ paper: { style: { width: "20ch" } } }}
      >
        {/* {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))} */}
        <MenuItem onClick={() => handleOptionClick("Ver mas")}>
          Ver mas
        </MenuItem>
        {role === "690cbf7c64756dcc541d8a19" && [
          <MenuItem key="editar" onClick={() => handleOptionClick("Editar")}>
            Editar
          </MenuItem>,
          <MenuItem
            key="gestion"
            onClick={() => handleOptionClick("Gestion de fechas")}
          >
            Gestion de fechas
          </MenuItem>,
        ]}
        {role === "690cbf7c64756dcc541d8a19" && (
          <MenuItem
            onClick={() =>
              handleOptionClick(
                tourPackage.status === "active" ? "Inhabilitar" : "Habilitar"
              )
            }
          >
            {tourPackage.status === "active" ? "Inhabilitar" : "Habilitar"}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};
export default TourPackageCardMenu;
