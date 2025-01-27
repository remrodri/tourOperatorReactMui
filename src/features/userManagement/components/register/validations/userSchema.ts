import * as Yup from "yup";

export const userSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("El campo es necesario")
    .min(3, "El campo debe tener al menos 3 caracteres"),
  lastName: Yup.string()
    .required("El campo es necesario")
    .min(3, "El campo debe tener al menos 3 caracteres"),
  email: Yup.string()
    .email("El campo debe ser un correo electrónico válido")
    .required("El campo es necesario"),
  ci: Yup.string()
    .required("El campo es necesario")
    .min(7, "El ci debe tener almenos 7 caracteres"),
  phone: Yup.string().required("El campo es necesario"),
  role: Yup.string().required("El campo es requerido"),
  address: Yup.string().required("El campo es requerido"),
  image: Yup.mixed<File>()
    .required("Debe selecciona una imagen")
    .test(
      "fileType",
      "El archivo debe ser una imagen",
      (value) => {
        if (!value) return false;
        const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        return supportedFormats.includes(value.type);
      }
  )
    .test(
      "fileSize",
      "El archivo debe ser menor a 2MB",
      (value) => {
        return value && value.size <= 2 * 1024 * 1024
      }
  )
});
