import * as yup from "yup";

export const touristItemSchema = yup.object({
  firstName: yup.string().required("El campo es requerido"),
  lastName: yup.string().required("El campo es requerido"),
  email: yup.string().email("Email inválido").required("El campo es requerido"),
  phone: yup.string().required("El campo es requerido").min(8),

  documentType: yup
    .string()
    .transform((v) => (v ? v.toLowerCase() : v))
    .oneOf(["ci", "passport"])
    .required("El campo es requerido"),

  ci: yup.string().when("documentType", {
    is: "ci",
    then: (schema) => schema.required("El CI es requerido"),
    otherwise: (schema) => schema.nullable(),
  }),

  passportNumber: yup.string().when("documentType", {
    is: "passport",
    then: (schema) => schema.required("El pasaporte es requerido"),
    otherwise: (schema) => schema.nullable(),
  }),

  nationality: yup.string().required("El campo es requerido"),
  dateOfBirth: yup.string().required("El campo es requerido"),
});
