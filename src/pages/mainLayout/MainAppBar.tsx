/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
// import { AppBarStyle } from "./MainLayout";
// import TextType from "../../TextAnimations/TextType/TextType";
// import AnimatedContent from "../../Animations/AnimatedContent/AnimatedContent";
import DecryptedText from "../../TextAnimations/DecryptedText/DecryptedText";
import { AppBarStyle } from "./style/MainStyles";

interface Props {
  currentStyles: AppBarStyle;
  // toggleDrawer: (newOpen: boolean) => () => void;
}

const MainAppBar: React.FC<Props> = ({ currentStyles }) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");

  const navigate = useNavigate();

  const buildImageUrl = (path?: string) => {
    if (!path) return "";

    // Si ya es absoluta, no tocar
    if (/^https?:\/\//i.test(path)) return path;

    const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
    return `${base}${path.startsWith("/") ? path : `/${path}`}`;
  };

  const getImage = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const user: any = jwtDecode(token);

    // ✅ NORMALIZADO
    setImageUrl(buildImageUrl(user.imagePath));
    setUserName(`${user.firstName} ${user.lastName}`.toUpperCase());
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  React.useEffect(() => {
    getImage();
  }, []);

  return (
    <Box sx={{ p: "10px" }}>
      <AppBar
        position="static"
        sx={{
          background: currentStyles.background,
          borderRadius: currentStyles.borderRadius,
          boxShadow: currentStyles.boxShadow,
          backdropFilter: currentStyles.backdropFilter,
          border: currentStyles.border,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <DecryptedText
            text={userName}
            speed={50}
            maxIterations={20}
            sequential
            characters="ABCD1234!?@"
            animateOn="view"
          />

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {imageUrl ? (
                  <Avatar src={imageUrl} />
                ) : (
                  <AccountCircle fontSize="large" />
                )}
              </IconButton>

              <Menu
                sx={{ mt: "50px" }}
                anchorEl={anchorEl}
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
export default MainAppBar;
