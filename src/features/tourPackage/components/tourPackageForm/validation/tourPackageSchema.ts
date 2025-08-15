import * as Yup from "yup";

// export const tourPackageSchema = Yup.object().shape({
//   name: Yup.string()
//     .required("El campo es necesario")
//     .min(3, "Debe tener almenos 3 caracteres"),
//   tourType: Yup.string().required("El campo es necesario"),
//   cancellationPolicy: Yup.string().required("El campo es necesario"),
//   touristDestination: Yup.string().required("El campo es necesario"),
//   price: Yup.number()
//     .required("El precio es requerido")
//     .positive("Debe ser un valor positivo")
//     .typeError("Debe ser un numero valido"),
//   itinerary: Yup.object().shape({
//     days: Yup.array().of(
//       Yup.object().shape({
//         dayNumber: Yup.number().required("El número de día es requerido"),
//         activities: Yup.array().of(
//           Yup.object().shape({
//             description: Yup.string().optional(),
//             time: Yup.string().optional(),
//           })
//         ),
//       })
//     ),
//   }).nullable(),
// });

export const tourPackageSchema = (isEditMode: boolean) =>
  Yup.object().shape({
    name: Yup.string()
      .required("El campo es necesario")
      .min(3, "Debe tener al menos 3 caracteres"),

    tourType: Yup.string().required("El campo es necesario"),

    cancellationPolicy: Yup.string().required("El campo es necesario"),

    touristDestination: Yup.string().required("El campo es necesario"),

    price: Yup.number()
      .required("El precio es requerido")
      .positive("Debe ser un valor positivo")
      .typeError("Debe ser un número válido"),

    dateRanges: isEditMode
      ? Yup.array().optional()
      : Yup.array()
          .of(
            Yup.object().shape({
              id: Yup.string().optional(),
              state: Yup.string().optional(),
              dates: Yup.array().of(Yup.string()).optional(),
              tourPackageId: Yup.string().optional(),
              guides: Yup.array()
                .of(Yup.string().required("El ID del guía es requerido"))
                .min(1, "Debes asignar al menos un guía")
                .required("Guías requeridos"),
            })
          )
          .min(1, "Debes agregar al menos un rango de fechas")
          .required("Los rangos de fechas son requeridos"),

    itinerary: Yup.object()
      .shape({
        days: Yup.array().of(
          Yup.object().shape({
            dayNumber: Yup.number().required("El número de día es requerido"),
            activities: Yup.array().of(
              Yup.object().shape({
                description: Yup.string().optional(),
                time: Yup.string().optional(),
              })
            ),
          })
        ),
      })
      .nullable(),
  });
