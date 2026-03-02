import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Debe ser un email válido")
    .required("El correo es requerido"),
  password: Yup.string()
    .min(6, "Debe tener al menos 6 caracteres")
    // .matches(/[A-Z]/, "Debe contener al menos una mayúscula")
    // .matches(/[a-z]/, "Debe contener al menos una minúscula")
    // .matches(/\d/, "Debe contener al menos un número")
    // .matches(/[@$!%*?&]/, "Debe contener al menos un carácter especial")
    .required("La contraseña es requerida"),
});
