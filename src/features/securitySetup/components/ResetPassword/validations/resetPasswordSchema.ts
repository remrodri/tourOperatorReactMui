import * as Yup from "yup";

export const resetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("debe ser un formato valido")
    .required("El campo es requerido"),
});
