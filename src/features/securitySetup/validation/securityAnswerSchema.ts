import * as Yup from "yup";

export const securityAnswerSchema = Yup.object({
  answerText: Yup.string()
    .transform((v) => (typeof v === "string" ? v.trim() : v))
    .required("La respuesta es obligatoria")
    .min(2, "Debe tener al menos 2 caracteres")
    .max(100, "Máximo 100 caracteres"),
});
