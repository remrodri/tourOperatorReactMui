import { Box, Button, CircularProgress, Grow, Typography } from "@mui/material";
import { useRef } from "react";
import { BookingType } from "../../types/BookingType";
import BookingCardContainer from "./card/BookingCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";
import BookingSearchByCodeContainer from "./searchByCode/BookingSearchByCodeContainer";
import BookingFilterContainer from "./filter/BookingFilterContainer";
import { useInfiniteScroll } from "../../../../hooks/useInfiniteScroll";

interface BookingShowcaseProps {
  handleClick: () => void;
  bookings: BookingType[];
  open: boolean;
  role: string;
  setBookingFound: (booking: BookingType | null) => void;
  bookingFound: BookingType | null;
  setBookingProof: (booking: BookingType | null) => void;
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMoreBookings: () => Promise<void>;
}

const BookingShowcase: React.FC<BookingShowcaseProps> = ({
  handleClick,
  bookings,
  role,
  setBookingFound,
  bookingFound,
  setBookingProof,
  loading,
  loadingMore,
  hasMore,
  loadMoreBookings,
}) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useInfiniteScroll({
    hasMore,
    loading: loading || loadingMore,
    onLoadMore: loadMoreBookings,
    root: scrollRef,
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "1rem 1.5rem 0 1.5rem",
        }}
      >
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
            <BookingSearchByCodeContainer setBookingFound={setBookingFound} />
          </Box>
          <BookingFilterContainer />
          <Button
            variant="contained"
            sx={{ height: "2rem", width: "12rem" }}
            onClick={handleClick}
          >
            nuevo
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", p: "20px" }}>
        <Box
          ref={scrollRef}
          sx={{
            p: "20px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "0.5rem",
            alignContent: "flex-start",
            background: "rgba(0, 0, 0, 0.44)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(0, 0, 0, 0.5)",
            height: "calc(100dvh - 12.8rem)",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", pr: "3.5rem" }}>
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
            <>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  px: "1rem",
                }}
              >
                <Typography>Resultado de la busqueda</Typography>
                <Button size="small" onClick={() => setBookingFound(null)}>
                  Ver todas
                </Button>
              </Box>
              <BookingCardContainer
                key={bookingFound.id}
                booking={bookingFound}
                index={0}
                role={role}
                setBookingProof={setBookingProof}
              />
            </>
          ) : (
            <>
              {bookings.length === 0 && !loading && <p>No hay reservas</p>}
              {bookings.map((booking, index) => (
                <Grow
                  in={true}
                  style={{ transformOrigin: "0 0 0" }}
                  timeout={300 + Math.min(index, 10) * 100}
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
              ))}
              {(loading || loadingMore) && (
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", py: 2 }}>
                  <CircularProgress size={28} />
                </Box>
              )}
              {!loading && !hasMore && bookings.length > 0 && (
                <Typography sx={{ width: "100%", textAlign: "center", py: 2 }}>
                  No hay mas reservas
                </Typography>
              )}
              <Box ref={sentinelRef} sx={{ width: "100%", height: "1px" }} />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default BookingShowcase;
