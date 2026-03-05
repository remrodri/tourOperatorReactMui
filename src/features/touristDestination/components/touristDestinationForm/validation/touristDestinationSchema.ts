import * as Yup from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_IMAGES = 5;

const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const touristDestinationSchema = (isEditing: boolean) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Debe tener al menos 3 caracteres")
      .max(60, "Debe tener como máximo 60 caracteres")
      .required("El nombre es obligatorio"),

    description: Yup.string()
      .trim()
      .min(10, "Debe tener al menos 10 caracteres")
      .max(500, "Debe tener como máximo 500 caracteres")
      .required("La descripción es obligatoria"),

    newImages: Yup.array()
      .of(
        Yup.mixed<File>()
          .test(
            "fileType",
            "Solo se permiten imágenes JPG, PNG o WEBP",
            (file) => {
              if (!file) return true;
              return SUPPORTED_FORMATS.includes(file.type);
            },
          )
          .test("fileSize", "Cada imagen debe ser menor a 2 MB", (file) => {
            if (!file) return true;
            return file.size <= MAX_FILE_SIZE;
          }),
      )
      .max(MAX_IMAGES, `No puede subir más de ${MAX_IMAGES} imágenes`)
      .test(
        "totalSize",
        "El tamaño total de las imágenes no debe superar 10 MB",
        (files) => {
          if (!files || files.length === 0) return true;
          const total = files.reduce((acc, file) => acc + (file?.size ?? 0), 0);
          return total <= MAX_TOTAL_SIZE;
        },
      )
      .when("existingImages", {
        is: (existingImages: string[]) =>
          !isEditing || existingImages.length === 0,
        then: (schema) => schema.min(1, "Debe subir al menos una imagen"),
      }),

    existingImages: Yup.array().of(Yup.string()),
  });
