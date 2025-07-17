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
import { useEffect, useState } from "react";
import {
  Avatar,
  Collapse,
  Menu,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { ExpandLess, ExpandMore,HorizontalSplit } from "@mui/icons-material";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import { useLogout } from "../../features/auth/hook/useLogout";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ExploreIcon from "@mui/icons-material/Explore";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { TokenService } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { useRoleContext } from "../../features/Role/context/RoleContext";
import { User } from "../../features/userManagement/types/User";
import GuideDrawer from "./Guide/GuideDrawer3";

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
  // width: `calc(${theme.spacing(7)} + 1px)`,
  width: 0,
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
  position: "static",
  // padding:"5px",
  // zIndex: theme.zIndex.drawer + 1,
  // m:"5px 0 0 0",
  height: "5.5rem",
  // p:"5px 0 0 0",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        // marginLeft: drawerWidth,
        // width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        // marginLeft: drawerWidth,
        // width: `calc(100% - 5rem)`,
        // padding:"5px",
        // height:"4rem",
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
  const [packageOpen, setPackageOpen] = useState(true);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [bookingOpen, setBookingOpen] = useState(true);

  const handleClickBooking = () => {
    setBookingOpen(!bookingOpen);
  };

  const packageHandleClick = () => {
    setPackageOpen(!packageOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(text: string): void {
    // theme.breakpoints.down("sm") && setOpen(false);
    setSelectedOption(text);
    switch (text) {
      case "Home":
        navigate("home");
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
      case "Tipo de tour":
        navigate("paquetes-turisticos/tipo-de-tour");
        break;
      case "Politicas":
        navigate("paquetes-turisticos/politicas");
        break;
      case "Destinos":
        navigate("paquetes-turisticos/destinos");
        break;
      case "Reservas":
        navigate("reservas/todos");
        break;
      case "Reportes":
        navigate("reportes/dashboard");
        break;
      default:
        console.warn("la ruta no existe");
        break;
    }
    matches && setOpen(false);
    // if (theme.breakpoints.down("sm")) {
    //   setOpen(false);
    // }
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

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("gestion-de-usuarios/usuarios"))
      setSelectedOption("Ver todos");
    if (path.includes("paquetes-turisticos/ver-todos"))
      setSelectedOption("Paquetes turisticos");
    if (path.includes("paquetes-turisticos/tipo-de-tour"))
      setSelectedOption("Tipo de tour");
    if (path.includes("paquetes-turisticos/politicas"))
      setSelectedOption("Politicas");
    if (path.includes("paquetes-turisticos/destinos"))
      setSelectedOption("Destinos");
    if (path.includes("reservas/todos")) setSelectedOption("Reservas");
    if (path.includes("reportes/dashboard")) setSelectedOption("Reportes");
    // if (path.includes("home")) setSelectedOption("Home");
  }, [location.pathname]);


  const [roleName, setRoleName] = useState<string>("");
  const token = TokenService.getToken()
  const user:User = jwtDecode(token as string)
  // console.log(user)
  const {getRoleById}=useRoleContext();
  const getRoleName = ()=>{
    const role=getRoleById(user.role)
    setRoleName(role.name)
  }
  // console.log(roleName)
  
  useEffect(()=>{
    getRoleName()
  },[ user ])

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          p: "10px",
          "&.MuiDrawer-docked": { width: open ? 240 : 83 }, // Ajusta según tu necesidad
          "& .MuiDrawer-paper": {
            position: "relative",
            width: "100%",
            background: "rgba(0, 0, 0, 0.6)",
            boxShadow: "0 4px 10px rgba(0,0,0,1)",
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(0,0,0,0.7)",
          },
        }}
      >
        <DrawerHeader>
          {open ? (
            <Tooltip title="Cerrar" placement="left">
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Abrir" placement="right">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={[
                  {
                    marginRight: "3px",
                  },
                  open && { display: "none" },
                ]}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}
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
              <Tooltip title="Listar usuarios" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Ver todos"
                        ? "rgba(172, 170, 164, 0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Ver todos"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(172, 170, 164, 0.27)",
                    },
                  }}
                  onClick={() => handleClick("Ver todos")}
                >
                  <ListItemIcon>
                    <RecentActorsIcon
                      sx={{
                        color:
                          selectedOption === "Ver todos"
                            ? "#90caf9"
                            : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Ver todos" : ""} />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
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
              <Tooltip title="Ver todos los paquetes" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Paquetes turisticos"
                        ? "rgba(172, 170, 164, 0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Paquetes turisticos"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(172, 170, 164, 0.27)",
                    },
                  }}
                  onClick={() => handleClick("Paquetes turisticos")}
                >
                  <ListItemIcon>
                    <ListAltIcon
                      sx={{
                        color:
                          selectedOption === "Paquetes turisticos"
                            ? "#90caf9"
                            : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Ver todos" : ""} />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Tipo de tour" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Tipo de tour"
                        ? "rgba(172, 170, 164, 0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Tipo de tour"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(172, 170, 164, 0.27)",
                    },
                  }}
                  onClick={() => handleClick("Tipo de tour")}
                >
                  <ListItemIcon>
                    <FormatListBulletedIcon
                      sx={{
                        color:
                          selectedOption === "Tipo de tour"
                            ? "#90caf9"
                            : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Tipos de tour" : ""} />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Politicas de cancelacion" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Politicas"
                        ? "rgba(172, 170, 164, 0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Politicas"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(172, 170, 164, 0.27)",
                    },
                    // boxShadow:
                    //   selectedOption === "Politicas"
                    //     ? "0 4px 10px rgba(255, 255, 255, 0.23)"
                    //     : "",
                    // outline:
                    //   selectedOption === "Politicas"
                    //     ? "1px solid rgba(255,255,255,0.2)"
                    //     : "",
                  }}
                  onClick={() => handleClick("Politicas")}
                >
                  <ListItemIcon>
                    <EventBusyIcon
                      sx={{
                        color:
                          selectedOption === "Politicas"
                            ? "#90caf9"
                            : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Politicas " : ""} />
                </ListItemButton>
              </Tooltip>
              <Tooltip title="Destinos" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Destinos"
                        ? "rgba(172, 170, 164, 0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Destinos"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(172, 170, 164, 0.27)",
                    },
                    // boxShadow:
                    //   selectedOption === "Destinos"
                    //     ? "0 4px 10px rgba(255, 255, 255, 0.38)"
                    //     : "",
                    // outline:
                    //   selectedOption === "Destinos"
                    //     ? "1px solid rgba(255, 255, 255, 0.38)"
                    //     : "",
                    // m: selectedOption === "Destinos" ? "0 1px" : "0",
                  }}
                  onClick={() => handleClick("Destinos")}
                >
                  <ListItemIcon>
                    <ExploreIcon
                      sx={{
                        color:
                          selectedOption === "Destinos" ? "#90caf9" : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Destinos" : ""} />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
          <Tooltip title="Gestion de Reservas" placement="right">
            <ListItemButton
              onClick={handleClickBooking}
              sx={{ minHeight: 48, px: 2.5 }}
            >
              <ListItemIcon>
                <BookOnlineIcon />
              </ListItemIcon>
              <ListItemText primary="Reservas" />
              {bookingOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Tooltip>
          <Collapse in={bookingOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Tooltip title="Ver todas las reservas" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Reservas"
                        ? "rgba(172,170,164,0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Reservas"
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(172,170,164,0.27)",
                    },
                  }}
                  onClick={() => handleClick("Reservas")}
                >
                  <ListItemIcon>
                    <HorizontalSplit
                      sx={{
                        color:
                          selectedOption === "Reservas" ? "#90caf9" : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Ver todos" : ""} />
                </ListItemButton>
              </Tooltip>
            </List>
          </Collapse>
        </List>
        <Divider />
        <List>
        <Tooltip title="Reportes" placement="right">
                <ListItemButton
                  sx={{
                    pl: open ? 4 : 2.5,
                    backgroundColor:
                      selectedOption === "Reportes"
                        ? "rgba(172, 170, 164, 0.27)"
                        : "transparent",
                    "&:hover": {
                      backgroundColor:
                        selectedOption === "Reportes"
                          ? "rgba(255, 255, 255, 0.12)"
                          : "rgba(172, 170, 164, 0.27)",
                    },
                  }}
                  onClick={() => handleClick("Reportes")}
                >
                  <ListItemIcon>
                    <ListAltIcon
                      sx={{
                        color:
                          selectedOption === "Reportes"
                            ? "#90caf9"
                            : "inherit",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={open ? "Ver todos" : ""} />
                </ListItemButton>
              </Tooltip>
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AppBar
          open={open}
          sx={{
            background: "none",
            boxShadow: "none",
            border: "none",
            p: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Toolbar
            sx={{
              background: "rgba(0, 0, 0, 0.6)",
              borderRadius: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(0,0,0,0.7)",
              height: "100%", // Ajusta el alto aquí
            }}
          >
            {matches && (
              <Tooltip title="Abrir" placement="right">
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={[
                    {
                      // marginRight: 5,
                    },
                    open && { display: "none" },
                  ]}
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            )}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                height: "100%",
                alignItems: "center",
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
        <Box
          sx={{
            // height: "100dvh"
            height: "calc(100% - 5.5rem)",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
