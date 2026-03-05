import * as Yup from "yup";

export const tourTypeSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Debe tener al menos 3 caracteres")
    .max(50, "Debe tener como máximo 50 caracteres")
    .required("El nombre es obligatorio"),

  description: Yup.string()
    .trim()
    .min(10, "Debe tener al menos 10 caracteres")
    .max(200, "Debe tener como máximo 200 caracteres")
    .required("La descripción es obligatoria"),
});
