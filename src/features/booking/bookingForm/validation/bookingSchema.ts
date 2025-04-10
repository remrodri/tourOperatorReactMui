import * as yup from "yup";
import { touristSchema } from "./touristSchema";
import { paymentInfoSchema } from "./paymentInfoSchema";
export const bookingSchema = yup.object().shape({
  id: yup.string().optional(),
  tourPackageId: yup.string().required("El paquete turistico es requerido"),
  dateRangeId: yup.string().required("El rango de fechas es requerido"),
  // sellerId: yup.string().required("El vendedor es requerido"),
  mainTouristId: yup.string().optional(),
  mainTourist: touristSchema.required().optional(),
  additionalTouristIds: yup.array().of(yup.string()).optional(),
  additionalTourist: yup.array().of(touristSchema).optional(),
  totalPrice: yup.number(),
  paymentIds: yup.array().of(yup.string()).optional(),
  payments: yup
    .array()
    .of(paymentInfoSchema)
    .min(1, "Debe haber al menos un pago"),
  notes: yup.string().optional(),
  status: yup
    .string()
    .oneOf(
      ["pending", "paid", "cancelled", "completed"],
      "Estado de reserva invalido"
    )
    .required("El estado de la es requerido"),
});
