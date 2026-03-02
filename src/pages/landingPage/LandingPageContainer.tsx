import { useState } from "react";
import LandingPage from "./LandingPage";
import { TouristDestinationProvider } from "../../features/touristDestination/context/TouristDestinationContext";
import { TourPackageProvider } from "../../features/tourPackage/context/TourPackageContext";
import { BookingProvider } from "../../features/booking/context/BookingContext";
import { TouristProvider } from "../../features/tourist/context/TouristContext";

const LandingPageContainer: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElReserva, setAnchorElReserva] = useState<null | HTMLElement>(
    null,
  );
  const open = Boolean(anchorElReserva);
  const handleCloseReserva = () => {
    setAnchorElReserva(null);
  };

  const [bookingCode, setBookingCode] = useState("");

  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  const handleCloseLoginDialog = () => {
    setOpenLoginDialog(false);
  };

  const handleOpenLoginDialog = () => {
    setOpenLoginDialog(true);
  };

  const handleOption = (
    option: string,
    event?: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorElNav(null);
    if (option === "Iniciar sesion") {
      handleOpenLoginDialog();
    }
    if (option === "Consultar reserva" && event) {
      setAnchorElReserva(event.currentTarget);
    }
    if (option === "Inicio") {
      handleScroll("inicio");
    }
    if (option === "Destinos") {
      handleScroll("destinos");
    }
    if (option === "Paquetes") {
      handleScroll("paquetes");
    }
    if (option === "Reseñas") {
      handleScroll("reseñas");
    }
    if (option === "Contacto") {
      handleScroll("contacto");
    }
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <TouristProvider>
      <TouristDestinationProvider>
        <TourPackageProvider>
          <BookingProvider>
            <LandingPage
              anchorElNav={anchorElNav}
              handleOpenNavMenu={handleOpenNavMenu}
              handleCloseNavMenu={handleCloseNavMenu}
              handleOption={handleOption}
              anchorEl={anchorElReserva}
              open={open}
              handleClose={handleCloseReserva}
              bookingCode={bookingCode}
              setBookingCode={setBookingCode}
              openLoginDialog={openLoginDialog}
              handleCloseLoginDialog={handleCloseLoginDialog}
            />
          </BookingProvider>
        </TourPackageProvider>
      </TouristDestinationProvider>
    </TouristProvider>
  );
};
export default LandingPageContainer;
