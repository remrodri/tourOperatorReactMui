import {
  // AppBar,
  Box,
  Button,
  // Container,
  Divider,
  // IconButton,
  // Menu,
  // MenuItem,
  // TextField,
  // Toolbar,
  Typography,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import TouristDestinationSectionContainer from "../../features/home/components/touristDestinationSection/TouristDestinationSectionContainer";
import Footer from "../../features/home/components/footer/Footer";
import ReviewSectionContainer from "../../features/home/components/reviewSection/ReviewSectionContainer";
// import { SearchOutlined } from "@mui/icons-material";
import HomeAppBar from "../../features/home/components/appBar/HomeAppBar";
import TourPackageSectionContainer from "../../features/home/components/tourPackageSection/TourPackageSectionContainer";
import ContactSection from "../../features/home/components/contactSection/ContactSection";

interface HomePageProps {
  anchorElNav: null | HTMLElement;
  handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void;
  handleCloseNavMenu: () => void;
  handleOption: (
    option: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) => void;
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  // handleClickSearchByBookingCode: () => void;
  bookingCode: string;
  setBookingCode: (code: string) => void;
}
const HomePage: React.FC<HomePageProps> = ({
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
  handleOption,
  anchorEl,
  open,
  handleClose,
  // handleClickSearchByBookingCode,
  bookingCode,
  setBookingCode,
}) => {
  return (
    <Box
      id="inicio"
      sx={{
        // height: "100rem",
        // background: "rgba(228, 226, 225, 1)",
        background: "#1C1C1C",
        // backgroundImage: `url(${home})`,
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        pt: "5rem",
      }}
    >
      <Box>
        <HomeAppBar
          anchorElNav={anchorElNav}
          handleOpenNavMenu={handleOpenNavMenu}
          handleCloseNavMenu={handleCloseNavMenu}
          handleOption={handleOption}
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
          // handleClickSearchByBookingCode={handleClickSearchByBookingCode}
          bookingCode={bookingCode}
          setBookingCode={setBookingCode}
        />
        <Box
          sx={{
            height: "7rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontSize: "2.5rem",
              fontWeight: "600",
              fontFamily: "Montserrat",
              color: "#fff",
            }}
          >
            DESCUBRE BOLIVIA
          </Typography>
          <Typography variant="h6" sx={{ color: "#fff" }}>
            CON NOSOTROS
          </Typography>
        </Box>
        <Divider
          sx={{
            margin: "0 auto",
            backgroundColor: "rgb(213, 13, 13)",
            height: "5px",
            width: "50%",
            borderRadius: "10px",
            border: "none",
          }}
          variant="middle"
        />
        <Box
          sx={{
            height: "65dvh",
            position: "relative",
            overflow: "hidden",
            // inset: "0 0 0 0",
          }}
        >
          <video
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            width="100%"
            height="100%"
            muted
            autoPlay
            controls={false}
            preload="auto"
            poster="image.png"
            loop={true}
          >
            <source src={"videoShowcase.mp4"} type="video/mp4" />
          </video>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexDirection: "column",
              color: "#fff",
              textAlign: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              // pb: "1.5rem",
            }}
          >
            {/* <Box
              sx={{
                height: "80%",
                width: "100%",
              }}
            ></Box> */}
            <Box
              sx={{
                // padding: "0 2.5rem 0.7rem 2.5rem",
                height: "100%",
                width: "100%",
                // backgroundColor: "rgba(0, 0, 0, 0.5)",
                // background: "rgba(49, 49, 49, 0.46)",
                // borderRadius: "10px",
                // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
                // backdropFilter: "blur(5px)",
                // border: "1px solid rgba(49, 49, 49, 0.46)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // mb: "2rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "2rem",
                  fontWeight: "500",
                  fontFamily: "Montserrat",
                  mb: 1,
                }}
              >
                Elije tu próxima aventura
              </Typography>
              <Button
                variant="contained"
                sx={{
                  height: "2.5rem",
                  backgroundColor: "#6f0000",
                  color: "#fff",
                  fontSize: "1rem",
                  padding: "0.8rem 2rem",
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#a00000" },
                }}
                onClick={() => handleOption("Paquetes")}
              >
                Ver paquetes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box id="destinos" sx={{ height: "4.5rem" }}></Box>
      <TouristDestinationSectionContainer />
      <Box id="paquetes" sx={{ height: "4.5rem" }}></Box>
      <TourPackageSectionContainer />
      <Box id="reseñas" sx={{ height: "4.5rem" }}></Box>
      <ReviewSectionContainer />
      <Box id="contacto" sx={{ height: "4.5rem" }}></Box>
      <ContactSection />
      <Box sx={{ height: "4.5rem" }}></Box>
      <Footer />
    </Box>
  );
};
export default HomePage;
