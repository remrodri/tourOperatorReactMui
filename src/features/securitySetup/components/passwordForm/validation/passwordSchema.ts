import * as Yup from "yup";

export const passwordSchema = Yup.object({
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "Debe tener al menos 6 caracteres"),

  confirmPassword: Yup.string()
    .required("Confirma la contraseña")
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
});