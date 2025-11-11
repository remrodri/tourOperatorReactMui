import { IconButton, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { useTourType } from "./hook/useTourType";
import DeleteDialog from "./deleteDialog/DeleteDialog";

const options = ["Ver mas", "Editar", "Eliminar"];

interface CardMenuProps {
  onOptionSelect: (option: string) => void;
  handleOpenDialog: () => void;
  handleClickMoreInfo: () => void;
}

const CardMenu: React.FC<CardMenuProps> = ({
  onOptionSelect,
  handleOpenDialog,
  handleClickMoreInfo,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const [openDialog, setOpenDialog] = useState<boolean>(false);

  // const handleOpenDialog = () => {
  //   setOpenDialog(!openDialog);
  // };

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
          paper: {
            style: {
              width: "20ch",
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      {/* {openDialog && (
        <DeleteDialog open={openDialog} handleClose={handleOpenDialog} />
      )} */}
    </>
  );
};
export default CardMenu;
