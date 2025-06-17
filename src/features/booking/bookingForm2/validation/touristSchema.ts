import * as yup from "yup";

export const touristSchema=yup.object().shape({
  firstName:yup.string().required("El campo es requerido"),
  lastName:yup.string().required("El campo es requerido"),
  email:yup.string().email("Email invalido").required("El campo es requerdio"),
  phone:yup.string().required("El campo es requerido"),
  ci:yup.string().required("El campo es requerido"),
  nationality:yup.string().required("El campo es requerido"),
  dateOfBirth:yup.string().required("El campo es requerido"),
})