import { Box, Typography } from "@mui/material";
import { PaymentInfoType } from "../types/PaymentType";

interface PaymentsInfoProps {
  payments: PaymentInfoType[];
}

const PaymentsInfo: React.FC<PaymentsInfoProps> = ({ payments }) => {
  // console.log("payments::: ", payments);
  return (
    <Box
    sx={{p:1}}
    >
      <Typography variant="h5" gutterBottom sx={{display:'flex',justifyContent:'center'}}>Informacion de pagos</Typography>
      <Box>
        {payments &&
          payments.length > 0 &&
          payments.map((payment, index) => (
            <Box key={index}>
              <Typography variant="body1">pago N° {index + 1}</Typography>
              <Typography variant="body1">Monto: {payment.amount}</Typography>
              <Typography variant="body1" gutterBottom>
                Tipo de deposito:
                {payment.paymentMethod === "cash"
                  ? " Efectivo"
                  : " Transferencia bancaria"}
              </Typography>
              {payment.transactionId && (
                <Typography variant="body1">
                  Id de transccion: {payment.transactionId}
                </Typography>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};
export default PaymentsInfo;
