import { useEffect, useState } from "react";
import { BookingType } from "../../booking/types/BookingType";
import PaymentForm from "./PaymentForm";
import { PaymentInfoType } from "../../booking/types/PaymentType";
import { usePaymentContext } from "../context/PaymentContext";
import { paymentInfoSchema } from "../../booking/bookingForm/validation/paymentInfoSchema";
import { useFormik } from "formik";
import { paymentSchema } from "./validation/PaymentSchema";
import DialogAlert from "./DialogAlert";

interface PaymentFormContainerProps {
    open: boolean;
    onClose: () => void;
    booking: BookingType;
}

const DEFAULT_PAYMENT: PaymentInfoType = {
  id: "",
  amount: 0,
  paymentDate: new Date().toISOString(),
  paymentMethod: "cash",
  transactionId: "",
};

export interface PaymentFormContainerValues{
    id?: string;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    transactionId: string;
}

const paymentMethods = [
    { value: "cash", label: "Efectivo" },
    { value: "bank_transfer", label: "Transferencia Bancaria" },
];

const PaymentFormContainer:React.FC<PaymentFormContainerProps> = ({open, onClose, booking}: PaymentFormContainerProps) => {
  const [bookingPayments, setBookingPayments] = useState<PaymentInfoType[]>([]);
  const {getPaymentInfoByIds, getTotalPaid, createPayment}=usePaymentContext();
  const [openDialogAlert, setOpenDialogAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");


  const calculateTotalPaid =()=>{
    const total = bookingPayments.reduce((acc,payment)=>acc+payment.amount,0)
    return total;
  }

  const handleAmountChange = (amount: number) => {
    const willExceedTotal = calculateTotalPaid() + amount > booking.totalPrice;
    if(willExceedTotal){
      // formik.setFieldError("amount", "El pago excede el precio total");
      setAlertMessage(
        `La reserva tiene un saldo de ${booking.totalPrice - calculateTotalPaid()} Bs, el pago que intentas ingresar de ${amount} Bs, excede el saldo por ${calculateTotalPaid() + amount - booking.totalPrice} Bs.`
      );
      setOpenDialogAlert(true);
      formik.setFieldValue("amount", 0);
    }else{
      // formik.setFieldError("amount", "");
      formik.setFieldValue("amount", amount);
    }
      };

  const handleDateChange = (date: string) => {
    formik.setFieldValue("paymentDate", date);
  };

  const handleMethodChange = (method: string) => {
    formik.setFieldValue("paymentMethod", method);
  };

  const getBookingPayments=()=>{
    const payments = getPaymentInfoByIds(booking.paymentIds ?? []);
    setBookingPayments(payments);
  }

  const onSubmit = async(values:PaymentFormContainerValues)=>{
    try {
      await createPayment({...values, bookingId: booking.id});
    } catch (error) {
      console.error('Error al guardar el pago:', error);
    }finally{
      onClose();
    }
  }

  const formik = useFormik<PaymentFormContainerValues>({
    initialValues: {
      id: "",
      amount: 0,
      paymentDate: new Date().toISOString(),
      paymentMethod: "cash",
      transactionId: "",
    },
    validationSchema: paymentSchema,
    onSubmit
  });

  useEffect(() => {
    getBookingPayments();
    // calculateTotalPaid();
  }, [booking]);

  return <>
    <PaymentForm 
      open={open} 
  onClose={onClose} 
  formik={formik} 
  paymentMethods={paymentMethods} 
  handleMethodChange={handleMethodChange}
  handleAmountChange={handleAmountChange}
  handleDateChange={handleDateChange}/>
  {
  openDialogAlert && 
  <DialogAlert 
    open={openDialogAlert} 
    onClose={()=>setOpenDialogAlert(false)} 
    title="Upss!..." 
    message={alertMessage}
    severity="error"
    />}
  </>
  
  };

export default PaymentFormContainer;
