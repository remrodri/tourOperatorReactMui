import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("El campo es necesario")
    .min(3, "El campo debe tener al menos 3 caracteres"),
  lastName: Yup.string()
    .required("El campo es necesario")
    .min(3, "El campo debe tener al menos 3 caracteres"),
  email: Yup.string()
    .email("El campo debe ser un correo electrónico válido")
    .required("El campo es necesario"),
  ci: Yup.string()
    .required("El campo es necesario")
    .min(7, "El ci debe tener almenos 7 caracteres"),
  phone: Yup.string().required("El campo es necesario"),
  role: Yup.string().required("El campo es requerido"),
});
