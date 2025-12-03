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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Fade, Tooltip, useMediaQuery } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ExploreIcon from "@mui/icons-material/Explore";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import { TokenService } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import { useRoleContext } from "../../features/Role/context/RoleContext";
import { User } from "../../features/user/types/User";
import MainAppBar from "./MainAppBar";
import { AppBarStyle } from "./MainLayout";
import TextType from "../../TextAnimations/TextType/TextType";
import PeopleIcon from "@mui/icons-material/People";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CategoryIcon from "@mui/icons-material/Category";
import { Groups } from "@mui/icons-material";

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

interface Props {
  currentStyles: AppBarStyle;
}

export const MainDrawer: React.FC<Props> = ({ currentStyles }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const [showOutlet, setShowOutlet] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setShowOutlet(false);
    const timer = setTimeout(() => {
      setShowOutlet(true);
    }, 200);

    // Limpieza del timer cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleClick(text: string): void {
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
      case "Turistas":
        navigate("turistas/todos");
        break;
      default:
        console.warn("la ruta no existe");
        break;
    }
    matches && setOpen(false);
  }

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
    if (path.includes("turistas/todos")) setSelectedOption("Turistas");
  }, [location.pathname]);

  const [roleName, setRoleName] = useState<string>("");
  const token = TokenService.getToken();
  const user: User = jwtDecode(token as string);
  const { getRoleById } = useRoleContext();
  const getRoleName = () => {
    const role = getRoleById(user.role);
    setRoleName(role.name);
  };

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
            background: currentStyles.drawerBackground,
            boxShadow: currentStyles.drawerBoxShadow,
            borderRadius: "16px",
            backdropFilter: "blur(10px)",
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
          <Box width="100%">
            <Typography
              sx={{
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Personal
            </Typography>
          </Box>
          <Tooltip
            title="En este modulo puedes gestionar el personal registrado de la operadora que incluye administradores, operadores de venta, guias de turismo"
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Ver todos"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
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
              sx={{
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Servicios
            </Typography>
          </Box>
          <Tooltip
            title="En este modulo puedes crear y gestionar los paquetes turisticos registrados, tambien gestionar su disponibilidad y sus fechas disponibles "
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Paquetes turisticos"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
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
              <ListItemText primary={open ? "Paquetes" : ""} />
            </ListItemButton>
          </Tooltip>
          <Tooltip
            title="En este modulo puedes gestionar los tipos de tour registrados "
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Tipo de tour"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
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

          <Tooltip
            title="En este modulo puedes crear nuevos destinos turisticos y gestionar los destinos existentes "
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Destinos"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
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
              sx={{
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
          <Tooltip
            title="En este modulo puedes crear, gestionar y buscar las reservas registradas, ademas puedes gestionar pagos y cancelaciones de los mismos"
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Reservas"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
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
        </List>
        <Divider />
        <List>
          <Box width="100%">
            <Typography
              sx={{
                fontSize: open ? "0.8rem" : "0.7rem",
                width: open ? "100%" : "3.8rem",
                fontWeight: "100",
                display: "flex",
                justifyContent: open ? "left" : "center",
                pl: open ? 2 : 0,
              }}
            >
              Turistas
            </Typography>
          </Box>
          <Tooltip
            title="En este modulo puedes crear, gestionar y buscar los turistas registrados"
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Turistas"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.4)",
                },
                color:
                  selectedOption === "Turistas"
                    ? "rgba(43, 43, 43, 0.88)"
                    : "inherit",
              }}
              onClick={() => handleClick("Turistas")}
            >
              <ListItemIcon>
                <Groups
                  sx={{
                    color:
                      selectedOption === "Turistas"
                        ? "rgba(43, 43, 43, 0.88)"
                        : "inherit",
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={open ? "Ver todos" : ""} />
            </ListItemButton>
          </Tooltip>
        </List>
        <List>
          <Box width="100%">
            <Typography
              sx={{
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
          <Tooltip
            title="En este modulo puedes visualizar reportes sobre datos relevantes de la operadora de turismo"
            placement="right"
          >
            <ListItemButton
              sx={{
                pl: open ? 4 : 2.5,
                backgroundColor:
                  selectedOption === "Reportes"
                    ? "rgba(255, 255, 255, 0.4)"
                    : "transparent",
                "&:hover": {
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
          width: "100%",
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MainAppBar currentStyles={currentStyles} />
        <Box
          sx={{
            height: "calc(100dvh - 5.4rem)",
            display: "flex",
          }}
        >
          {/* <Box> */}
          {/* {showOutlet && <Outlet />} */}
          <Outlet />
          {/* </Box> */}
        </Box>
      </Box>
    </Box>
  );
};
