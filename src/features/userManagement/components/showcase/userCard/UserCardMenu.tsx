import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MouseEvent, useState } from "react";

const options = ["Ver mas", "Editar", "Eliminar"];

interface UserCardMenuProps {
  onOptionSelect: (option: string) => void;
}

const UserCardMenu: React.FC<UserCardMenuProps> = ({onOptionSelect}) => {

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
  }

  // const handleOptionClick = (optionName: string) => {
  //   // console.log("optionName::: ", optionName);
  //   switch (optionName) {
  //     case options[0]:
  //       console.log("optionName::: ", optionName);
  //       break;
  //     case options[1]:
  //       console.log("optionName::: ", optionName);
  //       break;
  //     case options[2]:
  //       console.log("optionName::: ", optionName);
  //       break;
  //     default:
  //       console.log("No es opcion valida::: ");
  //       break;
  //   }
  //   handleClose();
  // };



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
    </>
  );
};

export default UserCardMenu;
