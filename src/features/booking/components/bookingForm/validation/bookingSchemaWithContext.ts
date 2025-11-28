import * as yup from "yup";
import { touristSchema } from "./touristSchema";
import { paymentSchema } from "./PaymentSchema";

export const bookingSchemaWithContext = (context: {
  isEditing: boolean;
  hasTouristsBySearch: boolean;
}) =>
  yup.object().shape({
    tourPackageId: yup.string().required("El paquete turístico es requerido"),
    dateRangeId: yup.string().required("El rango de fechas es requerido"),
    //  mainTourist: touristSchema,

    mainTourist: yup.mixed().when([], (__, schema) => {
      return context.hasTouristsBySearch ? schema.notRequired() : touristSchema;
    }),

    additionalTourists: yup.array().of(touristSchema).optional(),
    firstPayment: yup.object().when([], (__, schema) => {
      return context.isEditing ? schema.notRequired() : paymentSchema;
    }),
    notes: yup.string().optional(),
  });
