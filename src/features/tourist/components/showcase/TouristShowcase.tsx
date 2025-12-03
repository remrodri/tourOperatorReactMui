import { Box, Container, Fade, Grow, Typography } from "@mui/material";
import TextType from "../../../../TextAnimations/TextType/TextType";
import { TouristType } from "../../../booking/types/TouristType";
import TouristCardContainer from "./card/TouristCardContainer";
import TouristSearchByCodeContainer from "./search/TouristSearchByCode.Container";
import { useState } from "react";
interface TouristShowcaseProps {
  tourists: TouristType[] | null;
  role: string;
}

const TouristShowcase: React.FC<TouristShowcaseProps> = ({
  tourists,
  role,
}) => {
  const [touristFound, setTouristFound] = useState<TouristType | null>(null);
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          flexGrow: 1,
          width: "calc(100vw - 106px)",
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <Box
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
                  text={"Turistas"}
                  typingSpeed={50}
                  pauseDuration={1000}
                  showCursor={true}
                  cursorCharacter="_"
                  deletingSpeed={50}
                />
              </Typography>
              {/* <Button variant="contained" sx={{ height: "2rem" }}>buscar por codigo</Button> */}
              {/* <BookingSearchByCodeContainer
                bookings={bookings}
                setBookingFound={setBookingFound}
              /> */}
              <TouristSearchByCodeContainer
                tourists={tourists}
                setTouristFound={setTouristFound}
                touristFound={touristFound}
              />
            </Box>
            {/* <BookingFilterContainer
              bookings={bookings}
              // tourPackages={tourPackages}
              setFilteredBookings={setFilteredBookings}
            /> */}
            {/* <Button
              variant="contained"
              sx={{ height: "2rem", width: "12rem" }}
              onClick={handleClick}
            >
              nuevo
            </Button> */}
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
                <Typography sx={{ width: "30%", pl: "2rem" }}>
                  Documento
                </Typography>
                <Typography sx={{ width: "30%", pl: "3rem" }}>
                  Nombre
                </Typography>
                <Typography sx={{ width: "20%", pl: "1rem" }}>Edad</Typography>
                <Typography sx={{ width: "20%", pl: "3rem" }}>
                  Viajes realizados
                </Typography>
              </Box>
            </Box>
            {/* <Box
            sx={{
              // width: "100%",
              flexGrow:1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          > */}
            <Box
              sx={{
                width: "100%",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              {touristFound ? (
                <TouristCardContainer
                  tourist={touristFound}
                  index={0}
                  role={role}
                />
              ) : (
                tourists?.map((tourist, index) => (
                  // <TouristCardContainer
                  //   key={tourist.id}
                  //   tourist={tourist}
                  //   index={index}
                  //   role={role}
                  // />

                  <Grow
                    in={true} // o una condición si quieres mostrar/ocultar
                    style={{ transformOrigin: "0 0 0" }}
                    timeout={500 + index * 300} // cada card entra con más delay
                    key={tourist.id}
                  >
                    <Box sx={{ width: "100%" }}>
                      <TouristCardContainer
                        tourist={tourist}
                        index={index}
                        role={role}
                      />
                    </Box>
                  </Grow>
                ))
              )}
            </Box>
            {/* {bookingFound ? (
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
                    <BookingCardContainer
                      key={booking.id}
                      booking={booking}
                      index={index}
                      role={role}
                      setBookingProof={setBookingProof}
                    />
                  ))
                )}
              </>
            )} */}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};
export default TouristShowcase;
