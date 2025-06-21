import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { BookingType } from "../../types/BookingType";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../types/TouristType";
import BookingCardMenu from "./BookingCardMenu";


interface BookingCardProps{
    booking:BookingType | null;
    index:number;
    tpInfo:TourPackageType | null;
    mainTouristInfo:TouristType | null;
    balance:number;
    handleMenuOptions:(option:string)=>void;
    // getBalance:(booking:BookingType)=>number;
}
const BookingCard:React.FC<BookingCardProps>=({
  booking,
  index,
  tpInfo,
  mainTouristInfo,
  balance,
  handleMenuOptions,
  // getBalance
})=>{
  //   console.log('booking::: ', booking);
  // console.log('tpInfo::: ', tpInfo);
  // console.log('mainTouristInfo::: ', mainTouristInfo);
  // console.log('balance::: ', balance);

  if(!booking){
    return<Card sx={{ width: 300, borderRadius: "10px" }}>
    <CardContent>
      <Typography>Cargando datos de la reserva...</Typography>
    </CardContent>
  </Card>
  }
    return(
        <Card
        sx={{
            borderRadius:"10px",
            background:"rgba(255, 255, 255, 0.2)",
            boxShadow:"0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter:"Blur(5px)",
            border:"1px solid rgba(255,255,255,0.3)",
            width:300,
        }}
        >
          <CardHeader
          title={`${index + 1} ${tpInfo?.name}`}
          subheader={mainTouristInfo? `${mainTouristInfo.firstName} ${mainTouristInfo.lastName}` : ""}
          action={
            <BookingCardMenu
              onOptionSelect={handleMenuOptions}
              balance={balance}
            />
          }
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {`Costo total: ${booking.totalPrice.toFixed(2)} Bs.`}
          </Typography>
          <Typography variant="h6" component="div">
            {balance === 0
              ? "Saldo: No tiene"
              : `Saldo: ${balance.toFixed(2)} Bs.`}
          </Typography>
        </CardContent>
        </Card>
    )
}
export default BookingCard;