import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { BookingType } from "../../../types/BookingType";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../../types/TouristType";
import BookingCardMenu from "./BookingCardMenu";
import AnimatedContent from "../../../../../Animations/AnimatedContent/AnimatedContent";
import { MoreVert } from "@mui/icons-material";

interface BookingCardProps {
  booking: BookingType | null;
  index: number;
  tpInfo: TourPackageType | null;
  mainTouristInfo: TouristType | null;
  balance: number;
  handleMenuOptions: (option: string) => void;
  // getBalance:(booking:BookingType)=>number;
}
const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  index,
  tpInfo,
  mainTouristInfo,
  balance,
  handleMenuOptions,
  // getBalance
}) => {
  //   console.log('booking::: ', booking);
  // console.log('tpInfo::: ', tpInfo);
  // console.log('mainTouristInfo::: ', mainTouristInfo);
  // console.log('balance::: ', balance);

  if (!booking) {
    return (
      <Card sx={{ width: 300, borderRadius: "10px" }}>
        <CardContent>
          <Typography>Cargando datos de la reserva...</Typography>
        </CardContent>
      </Card>
    );
  }
  return (
    // <AnimatedContent
    //   distance={100}
    //   direction="vertical"
    //   reverse={true}
    //   duration={1.2}
    //   ease="power3.out"
    //   initialOpacity={0.2}
    //   animateOpacity
    //   scale={1.1}
    //   threshold={0.2}
    //   delay={0.3}
    // >
    <Card
      sx={{
        borderRadius: "10px",
        // background: "rgba(10,10,10,0.52)",
        background:
          booking.status === "pending"
            ? "rgba(10,10,10,0.52)"
            : "rgba(73, 17, 17, 0.52)",
        // boxShadow: "0 4px 10px rgba(10,10,10,0.6)",
        boxShadow:
          booking.status === "pending"
            ? "0 4px 10px rgba(10,10,10,0.6)"
            : "0 4px 10px rgba(73,17,17,0.6)",
        // backdropFilter: "Blur(5px)",
        // border: "1px solid rgba(10,10,10,0.6)",
        border:
          booking.status === "pending"
            ? "1px solid rgba(10,10,10,0.6)"
            : "1px solid rgba(73, 17, 17, 0.6)",
        width: "100%",
        // height: "100%",
        display: "flex",
        // flexDirection: "column",
        // justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* <CardHeader
        title={`${index + 1}. ${tpInfo?.name}`}
        subheader={
          mainTouristInfo
            ? `${mainTouristInfo.firstName} ${mainTouristInfo.lastName}`
            : ""
        }
        action={
          <BookingCardMenu
            onOptionSelect={handleMenuOptions}
            balance={balance}
            status={booking.status}
          />
        }
      /> */}
      <Box
        sx={{
          display: "flex",
          p: "0.5rem",
          // flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <Typography
          variant="body2"
          component="div"
          sx={{
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>{`${index + 1}.`}</span>
          <span>{`Paquete: ${tpInfo?.name}`}</span>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {mainTouristInfo
            ? `Contacto: ${mainTouristInfo.firstName} ${mainTouristInfo.lastName}`
            : ""}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {booking.status === "pending"
            ? `Estado: Pendiente`
            : booking.status === "cancelled"
            ? `Estado: Cancelado`
            : `Estado: Pagado`}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {`Costo total: ${booking.totalPrice.toFixed(2)} Bs.`}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {`Telefono: ${mainTouristInfo?.phone}`}
        </Typography>
        <IconButton>
          <MoreVert />
        </IconButton>
        {/* <Typography variant="body1" component="div">
            {`Costo total: ${booking.totalPrice.toFixed(2)} Bs.`}
          </Typography> */}
        {/* {booking.status === "cancelled" ? (
            <Typography
              variant="body1"
              component="div"
            >{`Cancelado`}</Typography>
          ) : (
            // <Typography variant="body1" component="div">
            //   {balance === 0
            //     ? "Saldo: No tiene"
            //     : `Saldo: ${balance.toFixed(2)} Bs.`}
            // </Typography>
            <Typography variant="body1" component="div">
              {`Costo total: ${booking.totalPrice.toFixed(2)} Bs.`}
            </Typography>
          )} */}
        {/* {booking.status === "cancelled" ? (
            <Typography
              variant="body1"
              component="div"
            >Monto retenido: {booking.cancellationFee?.toFixed(2)} Bs.</Typography>
          ) : (
            <Typography variant="body1" component="div">
              {`Costo total: ${booking.totalPrice.toFixed(2)} Bs.`}
            </Typography>
          )} */}
      </Box>
    </Card>
    // </AnimatedContent>
  );
};
export default BookingCard;
