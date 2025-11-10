import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
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
import { Collapse, Tooltip, useMediaQuery } from "@mui/material";
// import { ExpandLess, ExpandMore, HorizontalSplit } from "@mui/icons-material";
// import RecentActorsIcon from "@mui/icons-material/RecentActors";
// import CoPresentIcon from "@mui/icons-material/CoPresent";
// import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import ListAltIcon from "@mui/icons-material/ListAlt";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import ExploreIcon from "@mui/icons-material/Explore";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { TokenService } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { useRoleContext } from "../../features/Role/context/RoleContext";
import { User } from "../../features/userManagement/types/User";
import MainAppBar from "./MainAppBar";
import { AppBarStyle } from "./MainLayout";
// import DecryptedText from "../../TextAnimations/DecryptedText/DecryptedText";
import TextType from "../../TextAnimations/TextType/TextType";
// import ShinyText from "../../TextAnimations/ShinyText/ShinyText";
import PeopleIcon from "@mui/icons-material/People";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CategoryIcon from "@mui/icons-material/Category";

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

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme }) => ({
//   position: "static",
//   // padding:"5px",
//   // zIndex: theme.zIndex.drawer + 1,
//   // m:"5px 0 0 0",
//   height: "5.5rem",
//   // p:"5px 0 0 0",
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         // marginLeft: drawerWidth,
//         // width: `calc(100% - ${drawerWidth}px)`,
//         transition: theme.transitions.create(["width", "margin"], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//     {
//       props: ({ open }) => !open,
//       style: {
//         // marginLeft: drawerWidth,
//         // width: `calc(100% - 5rem)`,
//         // padding:"5px",
//         // height:"4rem",
//         transition: theme.transitions.create(["width", "margin"], {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

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

// const settings = ["Cerrar sesion"];

interface Props {
  currentStyles: AppBarStyle;
}

export default function MainDrawer({ currentStyles }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(true);
  // const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);
  // const { error, logout } = useLogout();
  const [selectedOption, setSelectedOption] = useState("");
  const [packageOpen, setPackageOpen] = useState(true);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [bookingOpen, setBookingOpen] = useState(true);

  // const handleClickBooking = () => {
  //   setBookingOpen(!bookingOpen);
  // };

  // const packageHandleClick = () => {
  //   setPackageOpen(!packageOpen);
  // };

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

  // const userHandleClick = () => {
  //   setUserOpen(!userOpen);
  // };

  // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setUserMenuOpen(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setUserMenuOpen(null);
  // };
  // const handleOptionUserMenu = (setting: string) => {
  //   switch (setting) {
  //     case settings[0]:
  //       console.log("cerrar sesion::: ");
  //       logout();
  //       break;
  //     default:
  //       console.log("no hay opciones::: ");
  //       console.log(error);
  //       break;
  //   }
  //   handleCloseUserMenu();
  // };

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
  const token = TokenService.getToken();
  const user: User = jwtDecode(token as string);
  // console.log(user)
  const { getRoleById } = useRoleContext();
  const getRoleName = () => {
    const role = getRoleById(user.role);
    setRoleName(role.name);
  };
  // console.log(roleName)

  useEffect(() => {
    getRoleName();
  }, [user]);

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
            // background: "rgba(0, 0, 0, 0.6)",
            background: currentStyles.drawerBackground,
            // boxShadow: "0 4px 10px rgba(0,0,0,1)",
            boxShadow: currentStyles.drawerBoxShadow,
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
            // border: "1px solid rgba(0,0,0,0.7)",
            border: currentStyles.drawerBorder,
          },
        }}
      >
        <DrawerHeader>
          {open && (
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              <TextType
                text={roleName.toUpperCase()}
                typingSpeed={75}
                pauseDuration={1000}
                showCursor={true}
                cursorCharacter="_"
              />
            </Typography>
          )}
          {open ? (
            <Tooltip title="Cerrar" placement="right">
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
          {/* <ListItemText primary="Usuarios" /> */}
          {/* <Tooltip title="Gestion de usuarios" placement="right">
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
          </Tooltip> */}
          {/* {!open && (
          )} */}
          <Box width="100%">
            <Typography
              // variant="caption"
              // component="div"
              sx={{
                // flexGrow: 1,
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Usuarios
            </Typography>
          </Box>
          {/* <Collapse in={userOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding> */}
          <Tooltip title="Listar usuarios" placement="right">
            <ListItemButton
              // selected={location.pathname.includes("gestion-de-usuarios")}
              sx={{
                pl: open ? 4 : 2.5,
                // "&.Mui-selected": {
                //   backgroundColor: "rgba(78, 140, 179, 0.4)",
                //   color: "white",
                //   // borderRadius: "10px",
                //   // p:"10px",
                // },
                // "&.Mui-selected:hover": {
                //   backgroundColor: "primary.dark",
                //   // borderRadius: "10px",
                //   // p:"10px",
                // },
                backgroundColor:
                  selectedOption === "Ver todos"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Ver todos"
                  //     ? "rgba(255, 255, 255, 0.5)"
                  //     : "rgba(172, 170, 164, 0.5)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                // selectedOption==="Ver todos" && {
                //   backgroundColor: "rgba(255, 255, 255, 0.4)",
                // }
                color:
                  selectedOption === "Ver todos"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Ver todos")}
            >
              <ListItemIcon>
                <PeopleIcon
                  sx={{
                    color:
                      selectedOption === "Ver todos"
                        ? "rgba(43, 43, 43, 0.88)"
                        : "inherit",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={open ? "Ver todos" : ""} />
            </ListItemButton>
          </Tooltip>
        </List>
        <Divider />
        <List sx={{ display: "flex", flexDirection: "column" }}>
          <Box width="100%">
            <Typography
              // variant="caption"
              // component="div"
              sx={{
                // flexGrow: 1,
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Paquetes
            </Typography>
          </Box>
          <Tooltip title="Ver todos los paquetes" placement="right">
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Paquetes turisticos"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Paquetes turisticos"
                  //     ? "rgba(255, 255, 255, 0.5)"
                  //     : "rgba(172, 170, 164, 0.5)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Paquetes turisticos"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Paquetes turisticos")}
            >
              <ListItemIcon>
                <ListAltIcon
                  sx={{
                    color:
                      selectedOption === "Paquetes turisticos"
                        ? "rgba(43, 43, 43, 0.88)"
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
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Tipo de tour"
                  //     ? "rgba(255, 255, 255, 0.5)"
                  //     : "rgba(172, 170, 164, 0.5)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Tipo de tour"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Tipo de tour")}
            >
              <ListItemIcon>
                <CategoryIcon
                  sx={{
                    color:
                      selectedOption === "Tipo de tour"
                        ? "rgba(43, 43, 43, 0.88)"
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
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Politicas"
                  //     ? "rgba(255, 255, 255, 0.5)"
                  //     : "rgba(172, 170, 164, 0.5)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Politicas"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Politicas")}
            >
              <ListItemIcon>
                <EventBusyIcon
                  sx={{
                    color:
                      selectedOption === "Politicas"
                        ? "rgba(43, 43, 43, 0.88)"
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
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Destinos"
                  //     ? "rgba(255, 255, 255, 0.5)"
                  //     : "rgba(172, 170, 164, 0.5)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Destinos"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Destinos")}
            >
              <ListItemIcon>
                <ExploreIcon
                  sx={{
                    color:
                      selectedOption === "Destinos"
                        ? "rgba(43, 43, 43, 0.88)"
                        : "inherit",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={open ? "Destinos" : ""} />
            </ListItemButton>
          </Tooltip>
        </List>
        <Divider />
        <List>
          <Box width="100%">
            <Typography
              // variant="caption"
              // component="div"
              sx={{
                // flexGrow: 1,
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Reservas
            </Typography>
          </Box>
          <Tooltip title="Ver todas las reservas" placement="right">
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Reservas"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Reservas"
                  //     ? "rgba(255,255,255,0.5)"
                  //     : "rgba(172,170,164,0.5)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Reservas"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Reservas")}
            >
              <ListItemIcon>
                <BookOnlineIcon
                  sx={{
                    color:
                      selectedOption === "Reservas"
                        ? "rgba(43, 43, 43, 0.88)"
                        : "inherit",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={open ? "Ver todos" : ""} />
            </ListItemButton>
          </Tooltip>
          {/* </List>
          </Collapse> */}
        </List>
        <Divider />
        <List>
          <Box width="100%">
            <Typography
              // variant="caption"
              // component="div"
              sx={{
                // flexGrow: 1,
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Reportes
            </Typography>
          </Box>
          <Tooltip title="Reportes" placement="right">
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Reportes"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  // backgroundColor:
                  //   selectedOption === "Reportes"
                  //     ? "rgba(255, 255, 255, 0.4)"
                  //     : "rgba(255, 255, 255, 0.4)",
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Reportes"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Reportes")}
            >
              <ListItemIcon>
                <QueryStatsIcon
                  sx={{
                    color:
                      selectedOption === "Reportes"
                        ? "rgba(43, 43, 43, 0.88)"
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
          // flexGrow: 1,
          // display: "flex",
          // flexDirection: "column",
          // height: "100dvh",
          // width: "calc(100vw - 83px)",
          width: "100%",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MainAppBar currentStyles={currentStyles} />
        <Box
          sx={{
            // flexGrow: 1,
            // height: "calc(100% - 5.5rem)",
            height: "calc(100dvh - 5.4rem)",
            display: "flex",
            // flexDirection: "column",
            // width: "calc(100vw - 83px)",
            // background: "rgba(193, 45, 45, 0.4)",
            // backdropFilter: "blur(10px)",
          }}
        >
            
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
