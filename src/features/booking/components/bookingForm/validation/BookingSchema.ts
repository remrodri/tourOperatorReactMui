import * as yup from "yup";
import { paymentSchema } from "./PaymentSchema";
import { touristSchema } from "./touristSchema";

export const bookingSchema=yup.object().shape({
  tourPackageId:yup.string().required("El paquete turistico es requerido"),
  dateRangeId:yup.string().required("El rango de fechas es requerido"),
  mainTourist:touristSchema,
  additionalTourists:yup.array().of(touristSchema).optional(),
  // firstPayment:yup.object().when('$isEditing',([isEditing],schema)=>isEditing===true ? paymentSchema : schema.notRequired()),
  firstPayment: yup.object().when('$isEditing', ([isEditing]) => {
    return isEditing === false ? paymentSchema : yup.object().optional();
  }),
  // firstPayment:paymentSchema,
  notes:yup.string().optional(),
})
