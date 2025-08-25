// import * as Yup from "yup";

// export const dateRangeSchema = (isEditMode: boolean) => {
//     return Yup.object().shape({
//         id: Yup.string().optional(),
//         // state: Yup.string().optional(),
//         dates: Yup.array().of(Yup.string()).optional(),
//         // tourPackageId: Yup.string().optional(),
//         guides: Yup.array()
//           .of(Yup.string().required("El ID del guía es requerido"))
//           .min(1, "Debes asignar al menos un guía")
//           // .required("Guías requeridos"),
//     })
// }

// import * as Yup from "yup";

// export const dateRangeSchema = (isEditMode: boolean) => {
//   return Yup.object().shape({
//     id: Yup.string().optional(),
//     dates: Yup.array()
//       .of(Yup.string().required("La fecha es requerida"))
//       .min(1, "Debes seleccionar al menos una fecha")
//       .required("Las fechas son requeridas"),
//     guides: Yup.array()
//       .of(Yup.string().required("El ID del guía es requerido"))
//       .min(1, "Debes asignar al menos un guía")
//       .required("Guías requeridos"),
//   });
// };

import * as Yup from "yup";

export const dateRangeSchema = (isEditMode: boolean) => {
  return Yup.object().shape({
    id: Yup.string().optional(),
    dates: Yup.array()
      .of(Yup.string())
      .min(1, "Debes seleccionar al menos una fecha"),
    guides: Yup.array()
      .of(Yup.string())
      .min(1, "Debes asignar al menos un guía"),
  });
};