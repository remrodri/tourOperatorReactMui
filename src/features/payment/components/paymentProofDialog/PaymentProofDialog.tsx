import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Typography,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { BookingType } from "../../../booking/types/BookingType";
import { TouristType } from "../../../booking/types/TouristType";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PaymentProofPDF } from "../pdf/PaymentProofPDF";
import { PaymentType } from "../../../booking/types/PaymentType";

interface PaymentProofDialogProps {
  open: boolean;
  onClose: () => void;
  payment: PaymentType | null;
  booking: BookingType | null;
  tourist: TouristType | null;
}

const PaymentProofDialog: React.FC<PaymentProofDialogProps> = ({
  open,
  onClose,
  payment,
  booking,
  tourist,
}) => {
  if (!open || !payment || !booking) return null;

  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
        Comprobante de Pago
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Información del Pago */}
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Detalle del pago
            </Typography>

            <Typography>
              <b>Monto:</b> {payment.amount.toFixed(2)} Bs
            </Typography>
            <Typography>
              <b>Fecha:</b> {payment.paymentDate}
            </Typography>
            <Typography>
              <b>Método:</b>{" "}
              {payment.paymentMethod === "cash" ? "Efectivo" : "Transferencia"}
            </Typography>
          </Grid>

          <Divider sx={{ width: "100%", my: 2 }} />

          {/* Turista */}
          {tourist && (
            <Grid item xs={12}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Turista
              </Typography>
              <Typography>
                <b>Nombre:</b> {tourist.firstName} {tourist.lastName}
              </Typography>
              <Typography>
                <b>Documento:</b>{" "}
                {tourist.documentType === "ci"
                  ? tourist.ci
                  : tourist.passportNumber}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 3,
          }}
        >
          <PDFDownloadLink
            document={
              <PaymentProofPDF
                payment={payment}
                booking={booking}
                tourist={tourist}
              />
            }
            fileName={`comprobante-pago-${payment.id}.pdf`}
          >
            <Button variant="contained" color="primary">
              Generar PDF
            </Button>
          </PDFDownloadLink>

          <Button variant="contained" color="error" onClick={onClose}>
            Cerrar
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentProofDialog;
