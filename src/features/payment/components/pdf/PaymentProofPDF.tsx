import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { PaymentType } from "../../../booking/types/PaymentType";
import { BookingType } from "../../../booking/types/BookingType";
import { TouristType } from "../../../booking/types/TouristType";


dayjs.extend(timezone);

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

  footer: {
    marginTop: 20,
    fontSize: 9,
    textAlign: "center",
    color: "#666",
  },
});

interface PaymentPDFProps {
  payment: PaymentType;
  booking: BookingType;
  tourist: TouristType | null;
}

export const PaymentProofPDF: React.FC<PaymentPDFProps> = ({
  payment,
  booking,
  tourist,
}) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Comprobante de Pago</Text>

        {/* INFORMACIÓN DEL PAGO */}
        <View style={styles.sectionBox}>
          <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>
            Detalle del Pago
          </Text>

          <View style={styles.row}>
            <Text style={styles.label}>Código de reserva:</Text>
            <Text>{booking.bookingCode}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Monto pagado:</Text>
            <Text>{payment.amount.toFixed(2)} Bs</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Fecha de pago:</Text>
            <Text>{payment.paymentDate}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Método:</Text>
            <Text>
              {payment.paymentMethod === "cash"
                ? "Efectivo"
                : "Transferencia Bancaria"}
            </Text>
          </View>
        </View>

        {/* TURISTA */}
        {tourist && (
          <View style={styles.sectionBox}>
            <Text style={{ fontSize: 14, fontWeight: "bold", marginBottom: 6 }}>
              Turista asociado
            </Text>

            <View style={styles.row}>
              <Text style={styles.label}>Nombre:</Text>
              <Text>
                {tourist.firstName} {tourist.lastName}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Documento:</Text>
              <Text>
                {tourist.documentType === "ci"
                  ? tourist.ci
                  : tourist.passportNumber}
              </Text>
            </View>
          </View>
        )}

        <Text style={styles.footer}>Gracias por su pago.</Text>
      </Page>
    </Document>
  );
};
