import * as Yup from "yup";

export const tourPackageSchema = Yup.object().shape({
  name: Yup.string()
    .required("El campo es necesario")
    .min(3, "Debe tener almenos 3 caracteres"),
  tourType: Yup.string().required("El campo es necesario"),
  cancellationPolicy: Yup.string().required("El campo es necesario"),
  touristDestination: Yup.string().required("El campo es necesario"),
  price: Yup.number()
    .required("El precio es requerido")
    .positive("Debe ser un valor positivo")
    .typeError("Debe ser un numero valido"),
});
