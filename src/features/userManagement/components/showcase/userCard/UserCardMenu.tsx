import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { MouseEvent, useMemo, useState } from "react";
import { UserType } from "../../../types/UserType";
import { TokenService } from "../../../../../utils/tokenService";
import { jwtDecode } from "jwt-decode";

const options = ["Ver mas", "Editar", "Habilitar", "Deshabilitar"];

// Si en tu token no viene exactamente UserType, puedes tipar solo lo que usas:
type TokenPayload = { id?: string };

interface UserCardMenuProps {
  onOptionSelect: (option: string) => void;
  role: string;
  user: UserType; // este es el usuario del card (el que vas a editar/habilitar)
}

const ADMIN_ROLE_ID = "690cbf7c64756dcc541d8a19";

const UserCardMenu: React.FC<UserCardMenuProps> = ({
  onOptionSelect,
  role,
  user,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // ✅ Decodificar token de forma segura (no rompe si no existe / está mal)
  const loggedUserId = useMemo(() => {
    const token = TokenService.getToken();
    if (!token || typeof token !== "string") return undefined;

    try {
      const payload = jwtDecode<TokenPayload>(token);
      return payload?.id;
    } catch {
      // Token inválido/corrupto
      return undefined;
    }
  }, []);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
    handleClose();
  };

  const isAdmin = role === ADMIN_ROLE_ID;
  const isSameUser = loggedUserId && user.id === loggedUserId;

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
        MenuListProps={{ "aria-labelledby": "long-button" }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{ paper: { style: { width: "20ch" } } }}
      >
        <MenuItem
          key={options[0]}
          onClick={() => handleOptionClick(options[0])}
        >
          {options[0]}
        </MenuItem>

        {isAdmin && (
          <MenuItem
            key={options[1]}
            onClick={() => handleOptionClick(options[1])}
          >
            {options[1]}
          </MenuItem>
        )}

        {/* Habilitar: solo admin, user.deleted === true, y no permitir auto-habilitarse */}
        {isAdmin && user.deleted === true && !isSameUser && (
          <MenuItem
            key={options[2]}
            onClick={() => handleOptionClick(options[2])}
          >
            {options[2]}
          </MenuItem>
        )}

        {/* Deshabilitar: solo admin, user.deleted === false, y no permitir auto-deshabilitarse */}
        {isAdmin && user.deleted === false && !isSameUser && (
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
