import * as Yup from "yup";

export const answerSchema = Yup.object().shape({
  answer1: Yup.string().required("El campo es necesario"),
  answer2: Yup.string().required("El campo es necesario"),
  answer3: Yup.string().required("El campo es necesario"),
});
