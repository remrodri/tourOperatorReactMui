import * as yup from "yup";

export const paymentInfoSchema = yup.object().shape({
  id:yup.string().optional(),
  amount: yup.number()
    .required("El campo es necesario")
    .positive("Debe ser un valor positivo")
    .typeError("Debe ser un numero valido"),
  paymentDate: yup.string().required("El campo es necesario"),
  paymentMethod: yup.string().required("El campo es necesario"),
  transactionId: yup.string().optional()
});
