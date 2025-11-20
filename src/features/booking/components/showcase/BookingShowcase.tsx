import { Box, Button, Fade, Typography } from "@mui/material";
import BreadCrumbsContainer from "../../../breadCrumbs/BreadCrumbsContainer";
import { BookingType } from "../../types/BookingType";
import BookingCardContainer from "./card/BookingCardContainer";
import TextType from "../../../../TextAnimations/TextType/TextType";

interface BookingShowcaseProps {
  handleClick: () => void;
  bookings: BookingType[] | null;
  open: boolean;
  role: string;
}

const BookingShowcase: React.FC<BookingShowcaseProps> = ({
  handleClick,
  bookings,
  open,
  role,
}) => {
  // console.log('bookings::: ', bookings);
  // if (!bookings || bookings.length === 0) {
  //   return <Box>No hay reservas disponibles</Box>;
  // }
  return (
    <Fade in={true} timeout={1000}>
      <Box
        sx={{
          flexGrow: 1,
          // display: "flex",
          // flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
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
            <TextType
              text={"Reservas"}
              typingSpeed={50}
              pauseDuration={1000}
              showCursor={true}
              cursorCharacter="_"
              deletingSpeed={50}
            />
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
            // height: "calc(100% - 5rem)",
            display: "flex",
            p: "20px",
          }}
        >
          <Box
            sx={{
              // pt: "30px",
              p:"20px",
              // flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              overflowY: "auto",
              gap: "0.5rem",
              alignContent: "flex-start",
              background: "rgba(8, 13, 10, 0.4)",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
              // backdropFilter: "blur(10px)",
              border: "1px solid rgba(8, 13, 10, 0.5)",
              height: "calc(100dvh - 12.8rem)",
              width:"100%",
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
                  role={role}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};
export default BookingShowcase;
