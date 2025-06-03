import { Close } from "@mui/icons-material";
import { Box, Dialog, DialogContent, DialogTitle, Grid2, IconButton, Slide } from "@mui/material"
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
import BookingDialogStyledBox from "./template/BookingDialogStyledBox";
import background from "../../../assets/images/home.webp";

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
        PaperProps={{
          sx:{
            backgroundImage:`url(${background})`,
            backgroundSize:"cover",
            backgroundPosition:"center",
            backgroundRepeat:"no-repeat",
          }
        }}
        >
          <DialogTitle sx={{
            // p:2,
            background: "rgba(0, 0, 0, 0.45)",
            // borderRadius: "16px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(0, 0, 0, 0.45)",
          }}>Detalle de la reserva</DialogTitle>
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
            p:1,
          }}
          >
            <Box 
            sx={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr 1fr 1fr",
              gridTemplateRows:"1fr 1fr 1fr 1fr",
              height:"100%",
              width:"100%",
              overflowY:"auto",
              p:1,
              gap:1,
              
            }}
            >
              <BookingDialogStyledBox
              sx={{
                gridRow:'1 / 2',
                gridColumn:'1 / 3',
                p:1,
              }}
              >
              
              <TourTypeInfo tourType={tourType} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'2 / 4',
                gridColumn:'2 / 4',
                p:1,
              }}
              >
              
              <TourPackageInfo tourPackage={tourPackageInfo} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'1 / 2',
                gridColumn:'3 / 4',
                p:1,
              }}
              >
              <GuidesInfo guides={guides??[]} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox 
              sx={{
                gridRow:'1 / 3',
                gridColumn:'4 / 5',
                p:1,
              }}
              >
                <PaymentsInfo payments={payments??[]} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'3 / 5',
                gridColumn:'1 / 2',
                p:1,
              }}
              >
              <CancellationPolicyInfo cancellationPolicy={cancellationPolicy} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'3 / 4',
                gridColumn:'4 / 5',
                p:1,
              }}
              >
                <DateRangeInfo dateRange={dateRangeInfo} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'4 / 5',
                gridColumn:'3 / 5',
                p:1,
              }}
              >
              <TouristDestinationInfo touristDestination={touristDestination} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'4 / 5',
                gridColumn:'2 / 3',
                p:1,
              }}
              >
              
              <SellerInfo seller={sellerInfo} />
              </BookingDialogStyledBox>
              
              <BookingDialogStyledBox
              sx={{
                gridRow:'2 / 3',
                gridColumn:'1 / 2',
                p:1,
              }}
              >
              <TouristsInfo tourists={tourists??[]} />
              </BookingDialogStyledBox>

            </Box>

          </DialogContent>
        </Dialog>
    )
}
export default MoreInfoDialog2
