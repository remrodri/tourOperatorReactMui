import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Avatar, Tooltip } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3000";

interface Props {
    toggleDrawer: (newOpen: boolean) => () => void;
}

const GuideAppBar:React.FC<Props>=({toggleDrawer})=> {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [imageUrl, setImageUrl] = React.useState<string>("");

  const navigate = useNavigate();

  const getImage=()=>{
    const token = localStorage.getItem("token")
    if(!token){
      return
    }
    const user:any = jwtDecode(token)
    setImageUrl(`${BASE_URL}${user.imagePath}`)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    // console.log('handleMenu::: ', event);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
    navigate("/");
  };

  React.useEffect(()=>{
    getImage()
  },[])
  return (
    <Box sx={{
      flexGrow: 1,
      p:"10px 10px 10px 10px",
    }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Guia de turismo
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
                  <Avatar src={imageUrl} />
                ) : (
                  <AccountCircle fontSize="large" />
                )}
              </IconButton>
              <Menu
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
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default GuideAppBar

