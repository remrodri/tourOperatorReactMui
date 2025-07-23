import { Box, Button, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { BookingType } from "../types/BookingType";
import BookingCardContainer from "./card/BookingCardContainer";

interface BookingShowcaseProps {
  handleClick: () => void;
  bookings: BookingType[] | null;
  open: boolean;
}

const BookingShowcase: React.FC<BookingShowcaseProps> = ({
  handleClick,
  bookings,
  open,
}) => {
  // console.log('bookings::: ', bookings);
  // if (!bookings || bookings.length === 0) {
  //   return <Box>No hay reservas disponibles</Box>;
  // }
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          height: "5rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: "0 0 0 1.5rem",
        }}
      >
        <BreadCrumbsContainer />
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          reservas
          <Button
            variant="contained"
            sx={{ height: "2rem", width: "12rem" }}
            onClick={handleClick}
          >
            nuevo
          </Button>
        </Box>
      </Typography>
      <Box
        sx={{
          height: "calc(100% - 5rem)",
          display: "flex",
          p: "20px",
        }}
      >
        <Box
          sx={{
            pt: "30px",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            overflowY: "auto",
            gap: "1rem",
            alignContent: "flex-start",
            background: "rgba(89, 22, 22, 0.4)",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
            // backdropFilter: "blur(10px)",
            border: "1px solid rgba(89, 22, 22, 0.5)",
          }}
        >
          {!bookings || bookings.length === 0 ? (
            <p>No hay reservas</p>
          ) : (
            bookings.map((booking, index) => (
              <BookingCardContainer
                key={booking.id}
                booking={booking}
                index={index}
              />
            ))
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default BookingShowcase;
