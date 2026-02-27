import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, ReactElement, Ref, useEffect, useState } from "react";
import { BookingType } from "../../types/BookingType";
import DateRangeInfo from "./DateRangeInfo";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import TourPackageInfo from "./TourPackageInfo";
// import { CancellationPolicy } from "../../../cancellationPolicy/types/CancellationPolicy";
// import CancellationPolicyInfo from "./CancellationPolicyInfo";
import { TourType } from "../../../userManagement/types/TourType";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import { PaymentType } from "../../types/PaymentType";
import { TouristType } from "../../types/TouristType";
import { User } from "../../../userManagement/types/UserType";
import TourTypeInfo from "./TourTypeInfo";
import TouristDestinationInfo from "./TouristDestinationInfo";
import SellerInfo from "./SellerInfo";
import PaymentsInfo from "./PaymentsInfo";
import TouristsInfo from "./TouristsInfo";
// import GuidesInfo from "./GuidesInfo";
import BookingDialogStyledBox from "./template/BookingDialogStyledBox";
import background from "../../../../assets/images/home.webp";
import StatusInfo from "./StatusInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingProofPDF from "../pdf/BookingProofPDF";

interface MoreInfoDialogProps {
  open: boolean;
  handleClose: () => void;
  booking: BookingType;
  dateRangeInfo: DateRangeType | null;
  tourPackageInfo: TourPackageType | null;
  // cancellationPolicy: CancellationPolicy | null;
  tourType: TourType | null;
  touristDestination: TouristDestinationType | null;
  payments: PaymentType[] | null;
  tourists: TouristType[] | null;
  dateRange: DateRangeType | null;
  guides: User[] | null;
  sellerInfo: User | null;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MoreInfoDialog: React.FC<MoreInfoDialogProps> = ({
  open,
  handleClose,
  booking,
  dateRangeInfo,
  tourPackageInfo,
  // cancellationPolicy,
  tourType,
  touristDestination,
  payments,
  tourists,
  dateRange,
  // guides,
  sellerInfo,
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
          Detalle de la reserva
        </Typography>
        {/* <Button
          variant="contained"
        >Imprimir</Button> */}
        <PDFDownloadLink
          document={
            <BookingProofPDF
              booking={booking}
              dateRangeInfo={dateRangeInfo}
              tourPackageInfo={tourPackageInfo}
              // cancellationPolicy={cancellationPolicy}
              // tourType={tourType}
              // touristDestination={touristDestination}
              payments={payments}
              tourists={tourists}
              dateRange={dateRange}
              // guides={guides}
              sellerInfo={sellerInfo}
            />
          }
          fileName={`RESERVA-${booking.bookingCode}.pdf`}
        >
          {({ blob, loading, error }) => (
            <Button variant="contained">
              {loading ? "Generando PDF..." : "Generar PDF"}
            </Button>
          )}
          {/* {({ loading }) => (loading ? "Generando PDF..." : "Generar PDF")} */}
        </PDFDownloadLink>
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
          p: 1,
        }}
      >
        <Box
          sx={{
            // display: "grid",
            // gridTemplateColumns: "1fr 1fr 1fr 1fr",
            // gridTemplateRows: "1fr 1fr 1fr 1fr",
            display: "flex",
            flexDirection: "column",
            // height: "100%",
            // width: "100%",
            overflowY: "auto",
            p: 1,
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <Box
              sx={{
                height: "30rem",
                width: "33%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <BookingDialogStyledBox
                sx={{
                  // gridRow: "1 / 2",
                  // gridColumn: "1 / 3",
                  p: 1,
                  height: "40%",
                  width: "100%",
                }}
              >
                <TourTypeInfo tourType={tourType} />
              </BookingDialogStyledBox>
              <BookingDialogStyledBox
                sx={{
                  // gridRow: "1 / 3",
                  // gridColumn: "4 / 5",
                  p: 1,
                  // height: "12.5rem",
                  height: "60%",
                  width: "100%",
                }}
              >
                <PaymentsInfo payments={payments ?? []} />
              </BookingDialogStyledBox>
              {/* <BookingDialogStyledBox
                sx={{
                  // gridRow: "4 / 5",
                  // gridColumn: "3 / 5",
                  p: 1,
                  // height: "30rem",
                  height: "60%",
                  width: "100%",
                }}
              >
                <TouristDestinationInfo
                  touristDestination={touristDestination}
                />
              </BookingDialogStyledBox> */}
            </Box>
            <BookingDialogStyledBox
              sx={{
                // gridRow: "2 / 4",
                // gridColumn: "2 / 4",
                p: 1,
                height: "30rem",
                width: "33%",
              }}
            >
              <TourPackageInfo tourPackage={tourPackageInfo} />
            </BookingDialogStyledBox>

            {/* <BookingDialogStyledBox
              sx={{
                // gridRow: "1 / 2",
                // gridColumn: "3 / 4",
                p: 1,
                height: "30rem",
                width: "33%",
              }}
            >
              <GuidesInfo guides={guides ?? []} />
            </BookingDialogStyledBox> */}
            <Box
              sx={{
                height: "30rem",
                width: "33%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <BookingDialogStyledBox
                sx={{
                  // gridRow: "3 / 4",
                  // gridColumn: "4 / 5",
                  p: 1,
                  height: "20%",
                  width: "100%",
                }}
              >
                <DateRangeInfo dateRange={dateRangeInfo} />
              </BookingDialogStyledBox>
              <BookingDialogStyledBox
                sx={{
                  // gridRow: "3 / 4",
                  // gridColumn: "4 / 5",
                  p: 1,
                  height: "20%",
                  width: "100%",
                }}
              >
                <SellerInfo seller={sellerInfo} />
              </BookingDialogStyledBox>
              <BookingDialogStyledBox
                sx={{
                  // gridRow: "3 / 4",
                  // gridColumn: "4 / 5",
                  p: 1,
                  height: "20%",
                  width: "100%",
                }}
              >
                <StatusInfo status={translateStatus(booking.status) || ""} />
              </BookingDialogStyledBox>
              <BookingDialogStyledBox
                sx={{
                  // gridRow: "2 / 3",
                  // gridColumn: "1 / 2",
                  p: 1,
                  height: "40%",
                  width: "100%",
                }}
              >
                <TouristsInfo tourists={tourists ?? []} />
              </BookingDialogStyledBox>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
            <BookingDialogStyledBox
              sx={{
                // gridRow: "4 / 5",
                // gridColumn: "3 / 5",
                p: 1,
                // height: "30rem",
                height: "9.5rem",
                width: "100%",
              }}
            >
              <TouristDestinationInfo touristDestination={touristDestination} />
            </BookingDialogStyledBox>

            {/* <BookingDialogStyledBox
              sx={{
                // gridRow: "3 / 5",
                // gridColumn: "1 / 2",
                p: 1,
                height: "12.5rem",
                width: "67%",
              }}
            >
              <CancellationPolicyInfo cancellationPolicy={cancellationPolicy} />
            </BookingDialogStyledBox> */}

            {/* <BookingDialogStyledBox
              sx={{
                // gridRow: "3 / 4",
                // gridColumn: "4 / 5",
                p: 1,
                height: "30rem",
                width: "33%",
              }}
            >
              <DateRangeInfo dateRange={dateRangeInfo} />
            </BookingDialogStyledBox> */}
            {/* <BookingDialogStyledBox
              sx={{
                // gridRow: "2 / 3",
                // gridColumn: "1 / 2",
                p: 1,
                height: "30rem",
                width: "33%",
              }}
            >
              <TouristsInfo tourists={tourists ?? []} />
            </BookingDialogStyledBox> */}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
export default MoreInfoDialog;
