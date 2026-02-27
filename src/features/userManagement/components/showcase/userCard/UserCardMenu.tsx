import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MouseEvent, useState } from "react";
import { TokenService } from "../../../../../utils/tokenService";
import { User } from "../../../types/UserType";
import { jwtDecode } from "jwt-decode";

const options = [
  "Ver mas",
  "Editar",
  // "Dar de baja"
  "Habilitar",
  "Deshabilitar",
];

// const token = TokenService.getToken();
// const user: User = jwtDecode(token!);
// const role = user.role;

interface UserCardMenuProps {
  onOptionSelect: (option: string) => void;
  role: string;
  user: User;
}

const UserCardMenu: React.FC<UserCardMenuProps> = ({
  onOptionSelect,
  role,
  user,
}) => {
  // console.log("::: ", user);
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
        {/* {options.map((option) => (
          <MenuItem key={option} onClick={() => handleOptionClick(option)}>
            {option}
          </MenuItem>
        ))} */}
        <MenuItem
          key={options[0]}
          onClick={() => handleOptionClick(options[0])}
        >
          {options[0]}
        </MenuItem>
        {role === "690cbf7c64756dcc541d8a19" && (
          <MenuItem
            key={options[1]}
            onClick={() => handleOptionClick(options[1])}
          >
            {options[1]}
          </MenuItem>
        )}
        {role === "690cbf7c64756dcc541d8a19" && user.deleted === true && (
          <MenuItem
            key={options[2]}
            onClick={() => handleOptionClick(options[2])}
          >
            {options[2]}
          </MenuItem>
        )}
        {role === "690cbf7c64756dcc541d8a19" && user.deleted === false && (
          <MenuItem
            key={options[3]}
            onClick={() => handleOptionClick(options[3])}
          >
            {options[3]}
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default UserCardMenu;
