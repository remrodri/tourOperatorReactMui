import * as Yup from "yup";

export const resetPasswordSchema = Yup.object({
  email: Yup.string()
    .transform((v) => (typeof v === "string" ? v.trim() : v))
    .email("Debe ser un correo válido")
    .required("El correo es obligatorio"),
});
