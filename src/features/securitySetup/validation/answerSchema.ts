import * as Yup from "yup";

const answerField = Yup.string()
  .transform((v) => (typeof v === "string" ? v.trim() : v))
  .required("La respuesta es obligatoria")
  .min(2, "Debe tener al menos 2 caracteres")
  .max(100, "No puede superar los 100 caracteres");

export const answerSchema = Yup.object()
  .shape({
    answer1: answerField,
    answer2: answerField,
    answer3: answerField,
  })
  .test(
    "answers-unique",
    "Las respuestas no pueden ser iguales entre sí",
    (values) => {
      if (!values) return false;
      const { answer1, answer2, answer3 } = values;
      const set = new Set([
        answer1?.toLowerCase(),
        answer2?.toLowerCase(),
        answer3?.toLowerCase(),
      ]);
      return set.size === 3;
    },
  );
