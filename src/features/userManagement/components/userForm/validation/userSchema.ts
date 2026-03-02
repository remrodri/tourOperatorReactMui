import * as Yup from "yup";

const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const userSchema = (isEditMode: boolean) =>
  Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("El campo es necesario"),

    lastName: Yup.string()
      .trim()
      .min(3, "Debe tener al menos 3 caracteres")
      .required("El campo es necesario"),

    email: Yup.string()
      .trim()
      .lowercase()
      .email("Debe ser un correo electrónico válido")
      .matches(
        EMAIL_REGEX,
        "El correo debe incluir un dominio válido (ej: usuario@gmail.com)",
      )
      .required("El campo es necesario"),

    ci: Yup.string()
      .trim()
      .matches(
        /^\d{5,10}(-[A-Z0-9]{1,3})?$/,
        "CI inválido (ej: 6543210 o 6543210-1A)",
      )
      .required("El campo es necesario"),

    phone: Yup.string()
      .trim()
      .matches(/^\d+$/, "El teléfono solo debe contener números")
      .min(7, "El teléfono es demasiado corto")
      .required("El campo es necesario"),

    role: Yup.string().required("El campo es necesario"),

    address: Yup.string()
      .trim()
      .min(5, "La dirección es demasiado corta")
      .required("El campo es necesario"),

    image: Yup.mixed<File>()
      .nullable()
      .when([], {
        is: () => !isEditMode,
        then: (schema) =>
          schema
            .required("Debe seleccionar una imagen")
            .test("fileType", "El archivo debe ser una imagen", (value) => {
              if (!value) return false;
              return SUPPORTED_IMAGE_TYPES.includes(value.type);
            })
            .test("fileSize", "El archivo debe ser menor a 2 MB", (value) => {
              if (!value) return false;
              return value.size <= 2 * 1024 * 1024;
            }),
        otherwise: (schema) =>
          schema
            .test("fileType", "El archivo debe ser una imagen", (value) => {
              if (!value) return true;
              return SUPPORTED_IMAGE_TYPES.includes(value.type);
            })
            .test("fileSize", "El archivo debe ser menor a 2 MB", (value) => {
              if (!value) return true;
              return value.size <= 2 * 1024 * 1024;
            }),
      }),
  });
