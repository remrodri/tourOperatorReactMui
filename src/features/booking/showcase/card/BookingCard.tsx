import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { BookingType } from "../../types/BookingType";
import { User } from "../../../userManagement/types/User";
import { TouristType } from "../../types/TouristType";
import { PaymentInfoType } from "../../types/PaymentInfoType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import BookingCardMenu from "./BookingCardMenu";

interface BookingCardProps {
  booking: BookingType;
  sellerInfo: User | null;
  touristInfo: TouristType | null;
  paymentsInfo: PaymentInfoType[];
  dateRangeInfo: DateRangeType | null;
  tourPackageInfo: TourPackageType | null;
  index: number;
  handleMenuOptions: (option: string) => void;
  balance: () => number;
}

const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  sellerInfo,
  touristInfo,
  paymentsInfo,
  dateRangeInfo,
  tourPackageInfo,
  index,
  handleMenuOptions,
  balance,
}) => {
  // Verifica que todas las dependencias existan antes de mostrar los datos
  if (!booking) {
    return (
      <Card sx={{ width: 300, borderRadius: "10px" }}>
        <CardContent>
          <Typography>Cargando datos de la reserva...</Typography>
        </CardContent>
      </Card>
    );
  }

  // Accede a las propiedades de manera segura
  const totalPrice = booking?.totalPrice || 0;
  const touristName = touristInfo
    ? `${touristInfo.firstName || ""} ${touristInfo.lastName || ""}`
    : "Cliente";
  const packageName = tourPackageInfo?.name || "Paquete";
  const currentBalance = balance();

  return (
    <Card
      sx={{
        borderRadius: "10px",
        background: "rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "Blur(5px)",
        border: "1px solid rgba(255,255,255,0.3)",
        width: 300,
      }}
    >
      <CardHeader
        title={`${index + 1} ${packageName}`}
        subheader={touristName}
        action={
          <BookingCardMenu
            onOptionSelect={handleMenuOptions}
            balance={balance}
          />
        }
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {`Costo total: ${totalPrice} Bs.`}
        </Typography>
        <Typography variant="h6" component="div">
          {currentBalance === 0
            ? "Saldo: Pagado"
            : `Saldo: ${currentBalance} Bs.`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
