import * as Yup from "yup";

export const tourTypeSchema = Yup.object().shape({
  name: Yup.string()
    .required("El campo es necesario")
    .min(3, "Debe tener al menos 3 caracteres"),
  description: Yup.string()
    .required("El campo es necesario")
    .min(10, "Debe tener al menos 10 caracteres"),
});
