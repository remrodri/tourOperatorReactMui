/* eslint-disable @typescript-eslint/no-explicit-any */
import { Close, MailOutline, Phone } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, useEffect, useState, Ref } from "react";
import background from "../../../../assets/images/bookingDialog2.webp";
import { BookingType } from "../../../booking/types/BookingType";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { TourType } from "../../../userManagement/types/TourType";
import { User } from "../../../userManagement/types/UserType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { ActivityType } from "../../../tourPackage/types/ActivityType";
import { TouristType } from "../../../booking/types/TouristType";

interface BookingInfoProps {
  open: boolean;
  handleClose: () => void;
  booking: {
    booking: BookingType | null;
    tourPackageFound: TourPackageType | null;
    tourTypeFound: TourType | null;
    sellerFound: User | null;
    dateRange: DateRangeType | null;
    tourists: TouristType[];
  };
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookingInfo: React.FC<BookingInfoProps> = ({
  open,
  handleClose,
  booking,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log('tourPackageInfo::: ', tourPackageInfo);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleCloseWithTransition = () => {
    setIsOpen(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };
  const translateStatus = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente";
      case "approved":
        return "Aprobado";
      case "rejected":
        return "Rechazado";
      default:
        return "Estado no identificado";
    }
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleCloseWithTransition}
      TransitionComponent={Transition}
      TransitionProps={{
        timeout: 300,
        onExited: handleClose,
      }}
      PaperProps={{
        sx: {
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
      }}
    >
      <DialogTitle
        sx={{
          // p:2,
          background: "rgba(0, 0, 0, 0.45)",
          // borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.45)",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Typography sx={{ alignContent: "center" }} variant="h6">
          {`Codigo de reserva:  ${booking.booking?.bookingCode}`}
        </Typography>
        {/* <Button
          variant="contained"
        >Imprimir</Button> */}
      </DialogTitle>
      <IconButton
        autoFocus
        aria-label="close"
        onClick={handleCloseWithTransition}
        sx={{
          position: "absolute",
          right: 12,
          top: 12,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent
        sx={{
          width: "100%",
          p: 1,
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: { xs: "1fr", lg: "repeat(3, 1fr)" },
          gridTemplateRows: { xs: "auto", lg: "1fr 1fr" },
          // flexDirection: "column",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "16px",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            p: 2,
            // display: "flex",
            // flexDirection: "column",
            // gap: "1rem",
          }}
        >
          <Typography variant="h6" fontFamily={"Montserrat"} gutterBottom>
            Información del paquete
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: 1,
              background: "rgba(0,0,0,0.45)",
              borderRadius: "16px",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(0, 0, 0, 0.45)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
              p: 2,
            }}
          >
            <Typography>{`Paquete: ${
              booking.tourPackageFound?.name || "No disponible"
            }`}</Typography>
            <Typography>{`Duración (días): ${
              booking.tourPackageFound?.duration || "-"
            }`}</Typography>
            {/* <Typography>{`Tipo de tour: ${
            booking.tourTypeFound?.name || "No disponible"
          }`}</Typography> */}
            <Typography>{`Precio total (BS.): ${
              booking.booking?.totalPrice || 0
            }`}</Typography>
            <Typography>{`Estado: ${translateStatus(
              booking.booking?.status || "",
            )}`}</Typography>
            <Typography>
              {`Fecha de inicio: ${booking.dateRange?.dates?.[0] || "-"}`}
            </Typography>
            {booking.dateRange?.dates?.length &&
              booking.dateRange?.dates?.length > 1 && (
                <Typography>
                  {`Fecha final: ${booking.dateRange?.dates?.at(-1) || "-"}`}
                </Typography>
              )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "16px",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            p: 2,
          }}
        >
          <Typography variant="h6" fontFamily={"Montserrat"} gutterBottom>
            Información del vendedor
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: 1,
              background: "rgba(0,0,0,0.45)",
              // backdropFilter: "blur(6px)",
              borderRadius: "16px",
              // WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(0, 0, 0, 0.45)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
              p: 2,
            }}
          >
            <Typography noWrap>{`Vendedor: ${
              booking.sellerFound?.firstName || "No disponible"
            } ${booking.sellerFound?.lastName || "No disponible"}`}</Typography>
            <Typography>{`Correo: ${
              booking.sellerFound?.email || "No disponible"
            }`}</Typography>
            <Typography>{`Telefono: ${
              booking.sellerFound?.phone || "No disponible"
            }`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            // height: "9rem",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "16px",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            p: 2,
          }}
        >
          <Typography variant="h6" fontFamily={"Montserrat"} gutterBottom>
            Tipo de tour
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: 1,
              background: "rgba(0,0,0,0.45)",
              // backdropFilter: "blur(6px)",
              borderRadius: "16px",
              // WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(0, 0, 0, 0.45)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
              p: 2,
            }}
          >
            <Typography>{`${
              booking.tourTypeFound?.name || "No disponible"
            }`}</Typography>
            <Typography>{`${
              booking.tourTypeFound?.description || "No disponible"
            }`}</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            // height: "9rem",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "16px",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            p: 2,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" fontFamily={"Montserrat"} gutterBottom>
            Itinerario
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {booking.tourPackageFound &&
              booking.tourPackageFound.itinerary &&
              booking.tourPackageFound.itinerary.days &&
              booking.tourPackageFound.itinerary.days.map(
                (
                  day: { dayNumber: number; activities: ActivityType[] },
                  index,
                ) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      // gap: 1,
                      background: "rgba(0,0,0,0.45)",
                      // backdropFilter: "blur(6px)",
                      borderRadius: "16px",
                      // WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid rgba(0, 0, 0, 0.45)",
                      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
                      p: 2,
                    }}
                  >
                    <Typography>{`Dia: ${day.dayNumber}`}</Typography>
                    {day.activities &&
                      day.activities.length > 0 &&
                      day.activities.map((activity, index) => (
                        <Typography variant="body2" key={index}>
                          {activity.time} - {activity.description}
                        </Typography>
                      ))}
                  </Box>
                ),
              )}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            // height: "9rem",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "16px",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            p: 2,
          }}
        >
          <Typography variant="h6" fontFamily={"Montserrat"} gutterBottom>
            Turistas
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {booking.tourists &&
              booking.tourists.map((tourist, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    // gap: 1,
                    background: "rgba(0,0,0,0.45)",
                    // backdropFilter: "blur(6px)",
                    borderRadius: "16px",
                    // WebkitBackdropFilter: "blur(6px)",
                    border: "1px solid rgba(0, 0, 0, 0.45)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
                    p: 2,
                  }}
                >
                  <Typography>{`${tourist.firstName} ${tourist.lastName}`}</Typography>
                  <Typography>
                    <MailOutline /> {tourist.email}
                  </Typography>
                  <Typography gutterBottom>
                    <Phone /> {tourist.phone}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            // height: "9rem",
            height: "100%",
            background: "rgba(0, 0, 0, 0.45)",
            backdropFilter: "blur(6px)",
            borderRadius: "16px",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            p: 2,
          }}
        >
          <Typography variant="h6" fontFamily={"Montserrat"} gutterBottom>
            Informacion de pagos
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {booking.booking?.payments &&
              booking.booking.payments.map((payment, index) => (
                <Box
                  key={payment.id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    // gap: 1,
                    background: "rgba(0,0,0,0.45)",
                    // backdropFilter: "blur(6px)",
                    borderRadius: "16px",
                    // WebkitBackdropFilter: "blur(6px)",
                    border: "1px solid rgba(0, 0, 0, 0.45)",
                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
                    p: 2,
                  }}
                >
                  <Typography variant="body2">{`Pago: ${
                    index + 1
                  }`}</Typography>
                  <Typography variant="body2">
                    {`Tipo de pago: ${
                      payment.paymentMethod === "cash"
                        ? "Efectivo"
                        : "Transferencia"
                    }`}
                  </Typography>
                  <Typography variant="body2">{`Monto: ${payment.amount.toFixed(
                    2,
                  )} Bs.`}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default BookingInfo;
