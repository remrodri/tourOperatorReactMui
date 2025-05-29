import * as yup from "yup";
import { touristSchema } from "./touristSchema";
import { paymentInfoSchema } from "./paymentInfoSchema";

export const bookingSchema = yup.object().shape({
  id: yup.string().optional(),
  tourPackageId: yup.string().required("El paquete turistico es requerido"),
  dateRangeId: yup.string().required("El rango de fechas es requerido"),
  // sellerId: yup.string().required("El vendedor es requerido"),
  mainTouristId: yup.string().optional(),
  mainTourist: yup.lazy((value) => {
    if (value) {
      return touristSchema;
    } else {
      return yup.object().shape({});
    }
  }),
  additionalTouristIds: yup.array().of(yup.string()).optional(),
  additionalTourists: yup.array().of(touristSchema).optional(),
  totalPrice: yup.number(),
  paymentIds: yup.array().of(yup.string()).optional(),
  firstPayment:paymentInfoSchema,
  // payments: yup.array().of(paymentInfoSchema),
    // .min(1, "Debe haber al menos un pago")
    // .required("La información de pago es requerida"),
  notes: yup.string().optional(),
  // status: yup
  //   .string()
  //   .oneOf(
  //     ["pending", "paid", "cancelled", "completed"],
  //     "Estado de reserva invalido"
  //   )
  //   .optional(),
});
