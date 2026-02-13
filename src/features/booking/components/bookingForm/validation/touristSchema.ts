import * as yup from "yup";

export const touristSchema = yup.object().shape({
  firstName: yup.string().required("El campo es requerido"),
  lastName: yup.string().required("El campo es requerido"),
  email: yup.string().email("Email invalido").required("El campo es requerdio"),
  phone: yup.string().required("El campo es requerido").min(8),
  // ci: yup.string().required("El campo es requerido"),
  // passport: yup.string(),
  documentType: yup
    .string()
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
