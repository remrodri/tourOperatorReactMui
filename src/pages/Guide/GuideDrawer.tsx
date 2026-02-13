import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import GuideAppBar from "./GuideAppBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { IconButton, Tooltip, Typography } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import { SvgIconComponent } from "@mui/icons-material";
// import ExploreIcon from "@mui/icons-material/Explore";
// import PlaceIcon from "@mui/icons-material/Place";
// import PeopleIcon from "@mui/icons-material/People";
// import PendingActionsIcon from "@mui/icons-material/PendingActions";

// const icons = [PlaceIcon, ExploreIcon, PeopleIcon, PendingActionsIcon];

interface DrawerItem {
  text: string;
  icon: SvgIconComponent;
  path: string;
}

interface GuideDrawerProps {
  drawerItems: DrawerItem[];
  guideName: string;
}

const GuideDrawer: React.FC<GuideDrawerProps> = ({
  drawerItems,
  guideName,
}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const currentDateRange = localStorage.getItem("currentDateRange");
  const currentTourPackage = localStorage.getItem("currentTourPackage");

  const blockButton = !currentDateRange || !currentTourPackage;

  const DrawerList = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start", // o "center" si querés centrarlo verticalmente
        // mt: 2 // margen superior para bajarlo un poco
        background: "rgba(0, 0, 0, 0.6)",
        boxShadow: "0 4px 10px rgba(0,0,0,1)",
        borderRadius: "16px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(0,0,0,0.7)",
      }}
      // role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "@media (max-width:600px)": {
              fontSize: "1rem",
            },
          }}
        >
          GUIA DE TURISMO
        </Typography>
        <Tooltip title="Cerrar menu" disableInteractive>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(false)}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
        </Tooltip>
      </List>
      <List>
        {drawerItems.map(({ text, icon: Icon, path }) => (
          <ListItem
            key={text}
            disablePadding
            sx={
              {
                // borderRadius: "16px",
                // p:"0 10px",
              }
            }
          >
            <ListItemButton
              disabled={blockButton}
              selected={location.pathname.includes(path)} // ✅ activa el color si estás en esa ruta
              onClick={() => {
                navigate(path);
                setOpen(false); // opcional: cierra el drawer al seleccionar
              }}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  color: "white",
                  // borderRadius: "10px",
                  // p:"10px",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "primary.dark",
                  // borderRadius: "10px",
                  // p:"10px",
                },
              }}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        // p:"10px",
        flexDirection: "column",
        // gap:"10px",
      }}
    >
      <Box>
        <GuideAppBar toggleDrawer={toggleDrawer} guideName={guideName} />
      </Box>
      {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button> */}

      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            position: "relative",
            width: 260,
            backgroundColor: "transparent", // elimina fondo
            boxShadow: "none", // elimina sombra
            border: "none", // elimina borde
            backdropFilter: "none", // elimina blur
            color: "inherit",
            // height:"100%",
            borderRadius: "16px",
          },
          p: "10px",
        }}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          // height: "100%",
          // width:"100%",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default GuideDrawer;
