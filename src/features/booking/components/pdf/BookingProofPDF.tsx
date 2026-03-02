import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { BookingType } from "../../types/BookingType";
import { TourPackageType } from "../../../tourPackage/types/TourPackageType";
import { TouristType } from "../../types/TouristType";
import { PaymentType } from "../../types/PaymentType";
import { DateRangeType } from "../../../tourPackage/types/DateRangeType";
import { TourType } from "../../../userManagement/types/TourType";
import { TouristDestinationType } from "../../../touristDestination/types/TouristDestinationType";
import { User } from "../../../userManagement/types/UserType";
import dayjs from "dayjs";
// import utc from "dayjs-plugin-utc";
import timezone from "dayjs/plugin/timezone";

// const styles = StyleSheet.create({
//   page: { padding: 20, fontSize: 12 },
//   section: { marginBottom: 10 },
//   title: { fontSize: 16, marginBottom: 10 },
//   label: { fontWeight: "bold" },
// });

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  sectionBox: {
    border: "1px solid #CCCCCC",
    borderRadius: 6,
    padding: 12,
    marginBottom: 12,
  },

  label: {
    fontWeight: "bold",
    marginRight: 4,
  },

  row: {
    flexDirection: "row",
    marginBottom: 4,
  },

  divider: {
    borderBottom: "1px solid #DDDDDD",
    marginVertical: 10,
  },

  touristsTable: {
    marginTop: 8,
    border: "1px solid #CCCCCC",
    borderRadius: 6,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderBottom: "1px solid #E0E0E0",
  },

  tableHeader: {
    backgroundColor: "#F2F2F2",
    fontWeight: "bold",
  },

  colSmall: {
    width: "25%",
  },
  colMedium: {
    width: "40%",
  },
  colLarge: {
    width: "60%",
  },

  badge: {
    fontSize: 10,
    padding: 4,
    color: "white",
    backgroundColor: "#1976D2",
    borderRadius: 4,
    marginTop: 6,
    textAlign: "center",
    width: 120,
  },

  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: "center",
    color: "#666",
  },
});

interface BookingProofPDFProps {
  booking: BookingType;
  dateRangeInfo: DateRangeType | null;
  tourPackageInfo: TourPackageType | null;
  // tourType: TourType | null;
  // touristDestination: TouristDestinationType | null;
  payments: PaymentType[] | null;
  tourists: TouristType[] | null;
  dateRange: DateRangeType | null;
  // guides: User[] | null;
  sellerInfo: User | null;
}
// dayjs.extend(utc);
dayjs.extend(timezone);

export const ComprobanteReservaPDF: React.FC<BookingProofPDFProps> = ({
  booking,
  dateRangeInfo,
  tourPackageInfo,
  // tourType,
  // touristDestination,
  payments,
  tourists,
  dateRange,
  // guides,
  sellerInfo,
}) => {
  // const { code, createdAt, packageInfo, tourists, payments } = booking;

  return (
    <Document>
      <Page style={styles.page}>
        {/* TITLE */}
        <Text style={styles.title}>Comprobante de reserva</Text>

        {/* RESERVA */}
        <View style={styles.sectionBox}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>
            Información de la reserva
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Código:</Text>
            <Text>{booking.bookingCode}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha de creación:</Text>
            <Text>
              {dayjs(booking.createdAt)
                .tz("America/La_Paz")
                .format("DD/MM/YYYY HH:mm")}
            </Text>
          </View>

          <View style={styles.badge}>{booking.status.toUpperCase()}</View>
        </View>

        {/* PAQUETE */}
        <View style={styles.sectionBox}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>
            Datos del paquete turístico
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Nombre:</Text>
            <Text>{tourPackageInfo?.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha de inicio:</Text>
            <Text>{dateRangeInfo?.dates![0]}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha fin:</Text>
            <Text>{dateRangeInfo?.dates?.at(-1)}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Precio total:</Text>
            <Text>{booking.totalPrice.toFixed(2)} Bs</Text>
          </View>
        </View>

        {/* TURISTAS */}
        <View style={styles.sectionBox}>
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Turistas</Text>

          <View style={styles.touristsTable}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.colMedium}>Nombre</Text>
              <Text style={styles.colSmall}>Tipo Doc</Text>
              <Text style={styles.colSmall}>Número</Text>
            </View>

            {tourists?.map((t, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colMedium}>
                  {t.firstName} {t.lastName}
                </Text>
                <Text style={styles.colSmall}>{t.documentType}</Text>
                <Text style={styles.colSmall}>
                  {t.documentType === "ci" ? t.ci : t.passportNumber}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* PAGO INICIAL */}
        {payments!.length > 0 && (
          <View style={styles.sectionBox}>
            <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>
              Pago inicial
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>Monto:</Text>
              <Text>{payments![0].amount.toFixed(2)} Bs</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Fecha:</Text>
              <Text>{payments![0].paymentDate}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Método:</Text>
              <Text>
                {payments![0].paymentMethod === "cash"
                  ? "Efectivo"
                  : "Transferencia"}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Saldo restante:</Text>
              <Text>
                {(booking.totalPrice - payments![0].amount).toFixed(2)} Bs
              </Text>
            </View>
          </View>
        )}

        {/* FOOTER */}
        <Text style={styles.footer}>Gracias por reservar con nosotros.</Text>
      </Page>
    </Document>
  );
};
export default ComprobanteReservaPDF;
