import {
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { useBookingContext } from "../../../booking/context/BookingContext";
import { useNewSnackbar } from "../../../../context/SnackbarContext";
import { BookingType } from "../../../booking/types/BookingType";
import { useState } from "react";
import { DateRangeProvider } from "../../../dateRange/context/DateRangeContext";
import { TourTypeProvider } from "../../../tourType/context/TourTypeContext";
import { UserProvider } from "../../../user/context/UserContext";
import BookingInfoContainer from "../bookingInfo/BookingInfoContainer";
import LoginDialogComponentContainer from "../login/dialog/LoginDialogComponentContainer";

interface HomeAppBarProps {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
  handleOption: (
    option: string,
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  bookingCode: string;
  setBookingCode: (code: string) => void;
  openLoginDialog: boolean;
  handleCloseLoginDialog: () => void;
}

const sections = [
  "Inicio",
  "Destinos",
  "Paquetes",
  "Reseñas",
  "Contacto",
  "Consultar reserva",
  "Iniciar sesion",
];

const HomeAppBar: React.FC<HomeAppBarProps> = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  handleOption,
  anchorEl,
  open,
  handleClose,
  bookingCode,
  setBookingCode,
  openLoginDialog,
  handleCloseLoginDialog,
}) => {
  const { bookings } = useBookingContext();
  const { showSnackbar } = useNewSnackbar();

  // const [openMoreInfoDialog, setOpenMoreInfoDialog] = useState(false);
  // const handleCloseMoreInfo = () => {
  //   setBookingCode("");
  //   setOpenMoreInfoDialog(false);
  // };

  // const handleOpenMoreInfo = () => {
  //   setOpenMoreInfoDialog(true);
  // };

  const handleClickSearchByBookingCode = () => {
    if (!bookingCode.trim()) {
      showSnackbar("Debe ingresar un codigo de reserva", "error");
      return;
    }

    const bookingFound = searchByBookingCode();

    if (!bookingFound) {
      showSnackbar("No se encontro la reserva", "error");
      return;
    }

    setSelectedBooking(bookingFound);
  };

  const searchByBookingCode = (): BookingType | null => {
    const bCode = bookingCode.trim();
    return bookings.find((booking) => booking.bookingCode === bCode) ?? null;
  };

  const [selectedBooking, setSelectedBooking] = useState<BookingType | null>(
    null,
  );

  const handleCloseBookingInfo = () => {
    setSelectedBooking(null);
    setBookingCode("");
  };



  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#6f0000",
          // background: "rgba(49, 49, 49, 0.46)",
          // borderRadius: "10px",
          // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
          // backdropFilter: "blur(5px)",
          // border: "1px solid rgba(49, 49, 49, 0.46)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {sections.map((section) => (
                  <MenuItem key={section} onClick={() => handleOption(section)}>
                    {section}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              // sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "Montserrat",
                fontWeight: "600",
                letterSpacing: ".3rem",
                // color: "#fff",
                color: "white",
                textDecoration: "none",
              }}
            >
              Operadora de turismo
            </Typography>
            {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                // alignItems:"center",
                justifyContent: "end",
                // pl: "2rem",
                gap: "1rem",
              }}
            >
              {sections.map((section) => (
                <Button
                  key={section}
                  onClick={(event) => handleOption(section, event)}
                  sx={{
                    // width: "10rem",
                    my: 2,

                    "&:hover": { backgroundColor: "#a00000" },
                  }}
                >
                  <Typography
                    noWrap
                    sx={{
                      color: "white",
                      display: "block",
                      fontFamily: "Montserrat",
                      fontWeight: "500",
                    }}
                  >
                    {section}
                  </Typography>
                </Button>
              ))}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  list: {
                    "aria-labelledby": "basic-button",
                  },
                }}
              >
                <Box
                  sx={{
                    m: "10px",
                  }}
                  // onClick={handleClose}
                >
                  <TextField
                    id="outlined-basic"
                    label="Numero de reserva"
                    variant="outlined"
                    size="small"
                    value={bookingCode}
                    onChange={(e) => setBookingCode(e.target.value)}
                    slotProps={{
                      input: {
                        endAdornment: (
                          <IconButton
                            onClick={() => handleClickSearchByBookingCode()}
                          >
                            <SearchOutlined />
                          </IconButton>
                        ),
                      },
                    }}
                  />
                </Box>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <UserProvider>
        <TourTypeProvider>
          <DateRangeProvider>
            <BookingInfoContainer
              booking={selectedBooking as BookingType}
              open={Boolean(selectedBooking)}
              handleClose={handleCloseBookingInfo}
            />
          </DateRangeProvider>
        </TourTypeProvider>
      </UserProvider>
      <LoginDialogComponentContainer
        open={openLoginDialog}
        onClose={handleCloseLoginDialog}
      />
    </>
  );
};

export default HomeAppBar;
