import * as Yup from "yup";

export const securityAnswerSchema = Yup.object().shape({
  answerText: Yup.string().required("El campo es necesario"),
});
