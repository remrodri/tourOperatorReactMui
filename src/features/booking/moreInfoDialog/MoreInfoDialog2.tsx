import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, Grid, IconButton, Slide } from "@mui/material"
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { BookingType } from "../types/BookingType";
import DateRangeInfo from "./DateRangeInfo";
import { DateRangeType } from "../../tourPackage/types/DateRangeType";
import { TourPackageType } from "../../tourPackage/types/TourPackageType";
import TourPackageInfo from "./TourPackageInfo";
import { CancellationPolicy } from "../../cancellationPolicy/types/CancellationPolicy";
import CancellationPolicyInfo from "./CancellationPolicyInfo";
import { TourType } from "../../userManagement/types/TourType";
import { TouristDestinationType } from "../../touristDestination/types/TouristDestinationType";
import { PaymentInfoType } from "../types/PaymentInfoType";
import { TouristType } from "../types/TouristType";
import { User } from "../../userManagement/types/User";
import TourTypeInfo from "./TourTypeInfo";
import TouristDestinationInfo from "./TouristDestinationInfo";
import SellerInfo from "./SellerInfo";
import PaymentsInfo from "./PaymentsInfo";
import TouristsInfo from "./TouristsInfo";
import GuidesInfo from "./GuidesInfo";

interface MoreInfoDialog2Props {
    open: boolean;
    handleClose: () => void;
    booking: BookingType;
    dateRangeInfo: DateRangeType | null;
    tourPackageInfo: TourPackageType | null;
    cancellationPolicy: CancellationPolicy | null;
    tourType: TourType | null;
    touristDestination: TouristDestinationType | null;
    payments: PaymentInfoType[] | null;
    tourists: TouristType[] | null;
    dateRange: DateRangeType | null;
    guides: User[] | null;
    sellerInfo: User | null;
  }
  
  const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
  const MoreInfoDialog2: React.FC<MoreInfoDialog2Props> = ({
    open,
    handleClose, 
    booking,
    dateRangeInfo,
    tourPackageInfo,
    cancellationPolicy,
    tourType,
    touristDestination,
    payments,
    tourists,
    dateRange,
    guides,
    sellerInfo
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log('tourPackageInfo::: ', tourPackageInfo);

    useEffect(() => {
      setIsOpen(open);
    }, [open]);

    const handleCloseWithTransition = () => {
      setIsOpen(false);
      setTimeout(() => {
        handleClose();
      }, 300);
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
          <DialogContent dividers
          // sx={{
          //   display: "flex",
          //   flexWrap: "wrap",
          //   // flexDirection: "column",
          //   height: "100%",
          //   overflowY: "auto",
          //   gap: 2,
          // }}
          >
            <Grid container spacing={2}>
              <DateRangeInfo dateRange={dateRangeInfo} />
              <SellerInfo seller={sellerInfo} />
              <GuidesInfo guides={guides??[]} />
              <TourPackageInfo tourPackage={tourPackageInfo} />
              <CancellationPolicyInfo cancellationPolicy={cancellationPolicy} />
              <TourTypeInfo tourType={tourType} />
              <TouristDestinationInfo touristDestination={touristDestination} />    
              <PaymentsInfo payments={payments??[]} />
              <TouristsInfo tourists={tourists??[]} />
            </Grid>

          </DialogContent>
        </Dialog>
    )
}
export default MoreInfoDialog2
