import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  Stack,
  Divider,
  Chip,
  Grid,
  Button,
} from "@mui/material";
import { BookingType } from "../../../types/BookingType";
import { TourPackageType } from "../../../../tourPackage/types/TourPackageType";
import { DateRangeType } from "../../../../tourPackage/types/DateRangeType";
import { TouristType } from "../../../types/TouristType";
import { PaymentType } from "../../../types/PaymentType";
import { User } from "../../../../userManagement/types/UserType";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BookingProofPDF from "../../pdf/BookingProofPDF";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(timezone);

interface BookingProofDialogProps {
  open: boolean;
  onClose: () => void;
  booking: BookingType | null;
  tourPackage: TourPackageType | null;
  tourists: TouristType[];
  dateRange: DateRangeType | null;
  seller: User | null;
}
const BookingProofDialog: React.FC<BookingProofDialogProps> = ({
  open,
  onClose,
  booking,
  tourPackage,
  tourists,
  dateRange,
  seller,
}) => {
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: 20 }}>
        Comprobante de Reserva
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          {/* RESERVA */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Información de la reserva
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Typography fontWeight="bold">Código:</Typography>
                <Typography>{booking?.bookingCode}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">Fecha de creación:</Typography>
                <Typography>
                  {dayjs(booking!.createdAt)
                    .tz("America/La_Paz")
                    .format("DD/MM/YYYY HH:mm")}
                </Typography>
              </Grid>
            </Grid>
            {/* <Chip
              label={booking?.status.toUpperCase()}
              color={booking?.status === "pagado" ? "success" : "warning"}
              sx={{ mt: 1 }}
            /> */}
          </Box>
          <Divider />

          {/* PAQUETE */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Datos del paquete turístico
            </Typography>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography fontWeight="bold">Nombre:</Typography>
                <Typography>{tourPackage?.name}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">Fecha inicio:</Typography>
                <Typography>{dateRange?.dates?.[0]}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography fontWeight="bold">Fecha fin:</Typography>
                <Typography>{dateRange?.dates?.at(-1)}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography fontWeight="bold">Precio total:</Typography>
                <Typography>{booking?.totalPrice.toFixed(2)} Bs</Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* TURISTAS */}
          <Box>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Turistas
            </Typography>

            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              {/* HEADER */}
              <Box sx={{ display: "flex", p: 1, bgcolor: "#f5f5f5" }}>
                <Box flex={2} fontWeight="bold" sx={{ color: "black" }}>
                  Nombre
                </Box>
                <Box flex={1} fontWeight="bold" sx={{ color: "black" }}>
                  Tipo Doc
                </Box>
                <Box flex={1} fontWeight="bold" sx={{ color: "black" }}>
                  Número
                </Box>
              </Box>

              {/* ROWS */}
              {tourists?.map((t, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    p: 1,
                    borderTop: "1px solid #eee",
                  }}
                >
                  <Box flex={2}>
                    {t.firstName} {t.lastName}
                  </Box>
                  <Box flex={1}>{t.documentType}</Box>
                  <Box flex={1}>
                    {t.documentType === "ci" ? t.ci : t.passportNumber}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider />

          {/* PAGO INICIAL */}
          {booking!.payments?.length > 0 && (
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Pago inicial
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Monto:</Typography>
                  <Typography>
                    {booking!.payments[0].amount.toFixed(2)} Bs
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight="bold">Fecha:</Typography>
                  <Typography>{booking!.payments[0].paymentDate}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight="bold">Método:</Typography>
                  <Typography>
                    {booking!.payments[0].paymentMethod === "cash"
                      ? "Efectivo"
                      : "Transferencia"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography fontWeight="bold">Saldo restante:</Typography>
                  <Typography>
                    {(
                      booking!.totalPrice - booking!.payments[0].amount
                    ).toFixed(2)}{" "}
                    Bs
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          <Divider />

          {/* FOOTER */}
          {/* <Typography
            textAlign="center"
            fontStyle="italic"
            color="text.secondary"
          >
            Gracias por reservar con nosotros.
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
              width: "100%",
            }}
          >
            <PDFDownloadLink
              document={
                <BookingProofPDF
                  booking={booking!}
                  dateRangeInfo={dateRange!}
                  tourPackageInfo={tourPackage!}
                  // cancellationPolicy={cancellationPolicy}
                  // tourType={tourType}
                  // touristDestination={touristDestination!}
                  payments={booking?.payments!}
                  tourists={tourists}
                  dateRange={dateRange}
                  // guides={guides}
                  sellerInfo={seller}
                />
              }
              fileName={`RESERVA-${booking!.bookingCode}.pdf`}
            >
              {({ blob, loading, error }) => (
                <Button variant="contained">
                  {loading ? "Generando PDF..." : "Generar PDF"}
                </Button>
              )}
              {/* {({ loading }) => (loading ? "Generando PDF..." : "Generar PDF")} */}
            </PDFDownloadLink>
            <Button variant="contained" onClick={onClose} color="success">
              Cerrar
            </Button>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
export default BookingProofDialog;
