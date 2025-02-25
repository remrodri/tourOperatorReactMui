import * as Yup from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024; //2MB
const MAX_TOTAL_SIZE = 10 * 1024 * 1024; //10MB
const MAX_IMAGES = 5;
const SUPPORTED_FORMATS = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const touristDestinationSchema = Yup.object().shape({
  name: Yup.string()
    .required("El campo es necesario")
    .min(3, "Debe tener almenos 3 caracteres"),
  description: Yup.string()
    .required("El campo es necesario")
    .min(10, "Debe tener almenos 10 caracteres"),
  newImages: Yup.array()
    .compact() //eliminar valores nulos o undefined
    .of(
      Yup.mixed<File>()
        // .required("Debe seleccionar una imagen")
        .test(
          "fileType",
          "El archivo debe ser una imagen valida",
          (file) => {
            if (!file) return false;
            // if (typeof file === "string") return true;
            return SUPPORTED_FORMATS.includes(file.type);
          }
          // file ? SUPPORTED_FORMATS.includes(file.type) : false
        )
        .test(
          "fileSize",
          "Cada imagen debe ser menor a 2MB",
          (file) => {
            if (!file) return false;
            if (typeof file === "string") return true;
            return file.size <= MAX_FILE_SIZE;
          }
          // file ? file.size <= MAX_FILE_SIZE : false
        )
    )
    .min(1, "Debe subir al menos una imagen")
    .max(MAX_IMAGES, `No puede subir mas de ${MAX_IMAGES} imagenes`)
    // .test("uniqueFiles", "No puede subir imagenes duplicadas", (files) => {
    //   if (!files) return true;
    //   const fileNames = files.map((file) =>
    //     typeof file === "string" ? file : file?.name
    //   );
    //   return new Set(fileNames).size === fileNames.length; // verifica que no haya duplicados
    // })
    .test(
      "totalSize",
      "El tamaño total de las imagenes no debe superar 10MB",
      (files) => {
        if (!files) return true;
        const totalSize = files.reduce(
          // (acc, file) => acc + (typeof file === "string" ? 0 : file?.size ?? 0),
          (acc, file) => acc + (file?.size ?? 0),
          0
        );
        return totalSize <= MAX_TOTAL_SIZE; // 10MB maximo
      }
    ),
  existingImages: Yup.array().of(Yup.string()),
});
