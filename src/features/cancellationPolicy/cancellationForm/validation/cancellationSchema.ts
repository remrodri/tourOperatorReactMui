import * as Yup from "yup";

export const cancellationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El campo es necesario")
    .min(3, "Debe tener al menos 3 caracteres"),
  deadLine: Yup.number()
    .required("El campo es necesario")
    .positive("Debe ser un valor positivo"),
  refoundPercentage: Yup.number()
    .required("El campo es necesario")
    .positive("Debe ser un numero positivo"),
  description: Yup.string()
    .required("El campo es necesario")
    .min(10, "Debe tener al menos 10 caracteres"),
});
