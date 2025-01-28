import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Outlet, useNavigate } from "react-router-dom";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useState } from "react";
import { Avatar, Collapse, Menu, MenuItem, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { useLogout } from "../../features/auth/hook/useLogout";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ListAltIcon from "@mui/icons-material/ListAlt";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const settings = ["Cerrar sesion"];

export default function MainDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);
  const { error, logout } = useLogout();
  const [selectedOption, setSelectedOption] = useState("");
  const [menuOption, setMenuOption] = useState(Boolean);
  const [packageOpen, setPackageOpen] = useState(false);

  const packageHandleClick = () => {
    setPackageOpen(!packageOpen);
  }

  const handleSelectedOption = (option: string) => {
    setSelectedOption(option);
    // setMenuOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(text: string): void {
    console.log("text::: ", text);
    switch (text) {
      case "Home":
        navigate("home");
        break;
      case "Nuevo":
        navigate("gestion-de-usuarios/nuevo");
        break;
      case "Ver todos":
        navigate("gestion-de-usuarios/usuarios");
        break;
      case "Paquetes turisticos":
        navigate("paquetes-turisticos/ver-todos");
        break;
      case "Nuevo paquete turistico":
        navigate("paquetes-turisticos/nuevo");
        break;
      default:
        console.warn("la ruta no existe");
        break;
    }
  }

  const userHandleClick = () => {
    setUserOpen(!userOpen);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuOpen(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(null);
  };
  const handleOptionUserMenu = (setting: string) => {
    switch (setting) {
      case settings[0]:
        console.log("cerrar sesion::: ");
        logout();
        break;
      default:
        console.log("no hay opciones::: ");
        console.log(error);
        break;
    }
    handleCloseUserMenu();
  };

  // const icons = [<HomeIcon />, <SupervisorAccountIcon />];

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {/* <Tooltip title="Abrir" placement="right"> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          {/* </Tooltip> */}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ alignContent: "center" }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Tooltip title="Configuracion">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, alignSelf: "flex-end" }}
                >
                  <Avatar>SN</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                }}
                id="menu-appbar"
                anchorEl={userMenuOpen}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(userMenuOpen)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleOptionUserMenu(setting)}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Tooltip title="Cerrar" placement="left">
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </Tooltip>
        </DrawerHeader>
        <Divider />
        <List>
          <Tooltip title="Gestion de usuarios" placement="right">
            <ListItemButton
              onClick={userHandleClick}
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon>
                <CoPresentIcon />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
              {userOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Tooltip>
          <Collapse in={userOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title="Crear usuario" placement="right">
                <ListItemButton
                  onClick={() => handleClick("Nuevo")}
                  sx={{
                    // pl: 4
                    pl: open ? 4 : 2.5,
                  }}
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  {/* <ListItemText primary="Nuevo" /> */}
                  <ListItemText primary={open ? "Nuevo" : ""} />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Listar usuarios" placement="right">
                <ListItemButton
                  sx={{ pl: open ? 4 : 2.5 }}
                  onClick={() => handleClick("Ver todos")}
                >
                  <ListItemIcon>
                    <RecentActorsIcon />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Ver todos" : ""} />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <Tooltip title="Gestion de Paquetes turisticos" placement="right">
            <ListItemButton
              onClick={packageHandleClick}
              sx={{
                minHeight: 48,
                px: 2.5,
              }}
            >
              <ListItemIcon>
                <AirplaneTicketIcon />
              </ListItemIcon>
              <ListItemText primary="Paquetes" />
              {packageOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Tooltip>
          <Collapse in={packageOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title="Crear paquete turistico" placement="right">
                <ListItemButton
                  onClick={() => handleClick("Nuevo paquete turistico")}
                  sx={{
                    // pl: 4
                    pl: open ? 4 : 2.5,
                  }}
                >
                  <ListItemIcon>
                    <AddBoxIcon />
                  </ListItemIcon>
                  {/* <ListItemText primary="Nuevo" /> */}
                  <ListItemText primary={open ? "Nuevo" : ""} />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Ver todos los paquetes" placement="right">
                <ListItemButton
                  sx={{ pl: open ? 4 : 2.5 }}
                  onClick={() => handleClick("Paquetes turisticos")}
                >
                  <ListItemIcon>
                    <ListAltIcon />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Ver todos" : ""} />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>

      <Box
        sx={{
          flexGrow: 1,
          // height:"100dvh"
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            height: {
              xs: "3.5rem",
              sm: "4rem",
            },
          }}
        ></Box>
        <Outlet />
      </Box>
    </Box>
  );
}
