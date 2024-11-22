import * as Yup from "yup";
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Debe ser un email valido")
    .required("El campo es requerido"),
  password: Yup.string().required("El campo es requerido"),
});
