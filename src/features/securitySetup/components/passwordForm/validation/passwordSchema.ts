import * as Yup from "yup";

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("El campo es requerido")
    .min(6, "Debe tener almenos 6 caracteres"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("El campo es necesario")
    .min(6, "Debe tener almenos 6 caracteres"),
});
