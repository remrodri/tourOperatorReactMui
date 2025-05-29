import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { BookingType } from "../types/BookingType";
import { User } from "../../userManagement/types/User";
import { TouristType } from "../types/TouristType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import { Close } from "@mui/icons-material";
import { forwardRef, ReactElement, Ref, useState, useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions/transition";
import TourPackageInfo from "./TourPackageInfo";
import { CancellationPolicy } from "../../cancellationPolicy/types/CancellationPolicy";
import CancellationPolicyInfo from "./CancellationPolicyInfo";
import { TourType } from "../../userManagement/types/TourType";
import TourTypeInfo from "./TourTypeInfo";
import TouristDestinationInfo from "./TouristDestinationInfo";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import SellerInfo from "./SellerInfo";
import PaymentsInfo from "./PaymentsInfo";
import TouristsInfo from "./TouristsInfo";
import BookingInfo from "./DateRangeInfo";
import DateRangeInfo from "./DateRangeInfo";
import GuidesInfo from "./GuidesInfo";

interface MoreInfoDialogProps {
  open: boolean;
  handleClose: () => void;
  booking: BookingType;
  sellerInfo: User | null;
  // touristInfo: TouristType | null;
  // paymentsInfo: PaymentInfoType[];
  dateRangeInfo: DateRangeType | null;
  tourPackageInfo: TourPackageType | null;
  balance: number;
  cancellationPolicy: CancellationPolicy | null;
  tourType: TourType | null;
  touristDestination: TouristDestinationType | null;
  payments: PaymentInfoType[];
  tourists: TouristType[];
  dateRange: DateRangeType | null;
  guides: User[];
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MoreInfoDialog: React.FC<MoreInfoDialogProps> = ({
  open,
  handleClose,
  booking,
  sellerInfo,
  // touristInfo,
  // paymentsInfo,
  dateRangeInfo,
  tourPackageInfo,
  balance,
  cancellationPolicy,
  tourType,
  touristDestination,
  payments,
  tourists,
  dateRange,
  guides,
}) => {
  // console.log('dateRange::: ', dateRange);
  // console.log('guides::: ', guides);
  // console.log("payments::: ", payments);
  // console.log('tourType::: ', tourType);
  // Estado local para manejar correctamente la animación
  const [isOpen, setIsOpen] = useState(false);

  // Sincroniza el estado local con la prop open
  useEffect(() => {
    if (open) {
      setIsOpen(true);
    }
  }, [open]);

  // Maneja el cierre con animación
  const handleCloseWithTransition = () => {
    setIsOpen(false);
    // Espera a que termine la animación antes de llamar a handleClose
    setTimeout(() => {
      handleClose();
    }, 300); // Ajusta este tiempo según la duración de tu transición
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleCloseWithTransition}
      TransitionComponent={Transition}
      TransitionProps={{
        timeout: 300, // Duración de la transición en ms
        onExited: handleClose, // Callback cuando la transición de salida termina
      }}
    >
      <DialogTitle>Detalle de la reserva</DialogTitle>
      <IconButton
        autoFocus
        aria-label="close"
        onClick={handleCloseWithTransition}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers>
        <Box>
          <DateRangeInfo dateRange={dateRange} />
          {/* <Typography gutterBottom>{tourPackageInfo?.name}</Typography> */}
          <TourPackageInfo tourPackage={tourPackageInfo} />
          {/* <Divider/> */}
          <CancellationPolicyInfo cancellationPolicy={cancellationPolicy} />
          <TourTypeInfo tourType={tourType} />
          <TouristDestinationInfo touristDestination={touristDestination} />
          <SellerInfo seller={sellerInfo} />
          <PaymentsInfo payments={payments} />
          <TouristsInfo tourists={tourists} />
          <GuidesInfo guides={guides} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default MoreInfoDialog;
