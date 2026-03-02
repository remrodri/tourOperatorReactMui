import { Box, Button, Grow, Typography } from "@mui/material";
import { BookingType } from "../../types/BookingType";
import BookingCardContainer from "./card/BookingCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";
import BookingSearchByCodeContainer from "./searchByCode/BookingSearchByCodeContainer";
import BookingFilterContainer from "./filter/BookingFilterContainer";

interface BookingShowcaseProps {
  handleClick: () => void;
  bookings: BookingType[] | null;
  open: boolean;
  role: string;
  setBookingFound: (booking: BookingType | null) => void;
  bookingFound: BookingType | null;
  // tourPackages: TourPackageType[] | null;
  filteredBookings: BookingType[];
  setFilteredBookings: (bookings: BookingType[]) => void;
  setBookingProof: (booking: BookingType | null) => void;
}

const BookingShowcase: React.FC<BookingShowcaseProps> = ({
  handleClick,
  bookings,
  role,
  setBookingFound,
  bookingFound,
  // tourPackages,
  filteredBookings,
  setFilteredBookings,
  setBookingProof,
}) => {
  // console.log('bookings::: ', bookings);
  // console.log('bookingFound::: ', bookingFound);
  // if (!bookings || bookings.length === 0) {
  //   return <Box>No hay reservas disponibles</Box>;
  // }

  return (
    // <Fade in={true} timeout={1000}>
      <Box
        sx={{
          flexGrow: 1,
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <Box
          // variant="h4"
          sx={{
            // height: "5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: "1rem 1.5rem 0 1.5rem",
          }}
        >
          {/* <BreadCrumbsContainer /> */}
          <Box
            sx={{
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <Typography variant="h4" sx={{ width: "10rem" }}>
                <TextType
                  text={"Reservas"}
                  typingSpeed={50}
                  pauseDuration={1000}
                  showCursor={true}
                  cursorCharacter="_"
                  deletingSpeed={50}
                />
              </Typography>
              {/* <Button variant="contained" sx={{ height: "2rem" }}>buscar por codigo</Button> */}
              <BookingSearchByCodeContainer
                bookings={bookings}
                setBookingFound={setBookingFound}
              />
            </Box>
            <BookingFilterContainer
              bookings={bookings || []}
              // tourPackages={tourPackages}
              setFilteredBookings={setFilteredBookings}
            />
            <Button
              variant="contained"
              sx={{ height: "2rem", width: "12rem" }}
              onClick={handleClick}
            >
              nuevo
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            // height: "calc(100% - 5rem)",
            display: "flex",
            p: "20px",
          }}
        >
          <Box
            sx={{
              // pt: "30px",
              p: "20px",
              // flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              overflowY: "auto",
              gap: "0.5rem",
              alignContent: "flex-start",
              background: "rgba(0, 0, 0, 0.44)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
              // backdropFilter: "blur(10px)",
              border: "1px solid rgba(0, 0, 0, 0.5)",
              height: "calc(100dvh - 12.8rem)",
              width: "100%",
            }}
          >
            <Box
              sx={{
                // display: "flex",
                // justifyContent: "space-around",
                width: "100%",
                pr: "3.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <Typography sx={{ width: "30%", pl: "1rem" }}>
                  Codigo de reserva
                </Typography>
                <Typography sx={{ width: "30%", pl: "1rem" }}>
                  Nombre del paquete
                </Typography>
                <Typography sx={{ width: "25%", pl: "0.7rem" }}>
                  Costo total
                </Typography>
                <Typography sx={{ width: "15%", pl: "0.2rem" }}>
                  Saldo
                </Typography>
              </Box>
            </Box>
            {bookingFound ? (
              <BookingCardContainer
                key={bookingFound.id}
                booking={bookingFound}
                index={0}
                role={role}
                setBookingProof={setBookingProof}
              />
            ) : (
              <>
                {!filteredBookings || filteredBookings.length === 0 ? (
                  <p>No hay reservas</p>
                ) : (
                  filteredBookings.map((booking, index) => (
                    // <BookingCardContainer
                    //   key={booking.id}
                    //   booking={booking}
                    //   index={index}
                    //   role={role}
                    //   setBookingProof={setBookingProof}
                    // />
                    <Grow
                      in={true} // o una condición si quieres mostrar/ocultar
                      style={{ transformOrigin: "0 0 0" }}
                      timeout={500 + index * 300} // cada card entra con más delay
                      key={booking.id}
                    >
                      <Box sx={{ width: "100%" }}>
                        <BookingCardContainer
                          key={booking.id}
                          booking={booking}
                          index={index}
                          role={role}
                          setBookingProof={setBookingProof}
                        />
                      </Box>
                    </Grow>
                  ))
                )}
              </>
            )}
          </Box>
        </Box>
      </Box>
    // </Fade>
  );
};
export default BookingShowcase;
