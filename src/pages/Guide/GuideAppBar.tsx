import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface Props {
  toggleDrawer: (newOpen: boolean) => () => void;
  guideName: string;
}

/**
 * Normaliza un path de imagen que viene del backend:
 * - si ya es URL absoluta (https://...), la devuelve tal cual
 * - si es ruta (/uploads/...), antepone VITE_API_BASE_URL
 */
const buildImageUrl = (path?: string): string => {
  if (!path) return "";

  // URL absoluto
  if (/^https?:\/\//i.test(path)) return path;

  // Base del backend (Railway)
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
  const normalized = path.startsWith("/") ? path : `/${path}`;

  return `${base}${normalized}`;
};

const GuideAppBar: React.FC<Props> = ({ toggleDrawer, guideName }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const navigate = useNavigate();

  const getImage = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const user: any = jwtDecode(token);

      // user.imagePath puede ser "/uploads/..." o "https://..."
      setImageUrl(buildImageUrl(user.imagePath));
    } catch {
      // Token inválido/corrupto: no rompemos la UI
      setImageUrl("");
    }
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentDateRange");
    localStorage.removeItem("currentTourPackage");
    setAuth(false);
    navigate("/");
  };

  React.useEffect(() => {
    getImage();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: "10px 10px 10px 10px",
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "rgba(88, 83, 79, 0.4)",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgb(41, 39, 37)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(191, 182, 174, 1)",
        }}
      >
        <Toolbar>
          <Tooltip title="Abrir menu" disableInteractive>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              "@media (max-width:600px)": {
                fontSize: "1rem",
              },
            }}
          >
            {guideName}
          </Typography>

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {imageUrl ? (
                  <Avatar
                    src={imageUrl}
                    imgProps={{
                      onError: () => {
                        // Si falla la carga, volvemos al icono
                        setImageUrl("");
                      },
                    }}
                  />
                ) : (
                  <AccountCircle fontSize="large" />
                )}
              </IconButton>

              <Menu
                sx={{ mt: "50px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GuideAppBar;