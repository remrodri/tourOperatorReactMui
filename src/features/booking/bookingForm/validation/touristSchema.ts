import * as yup from "yup";

export const touristSchema = yup.object().shape({
  id: yup.string().optional(),
  firstName: yup.string().required("El campo es requerido"),
  lastName: yup.string().required("El campo es requerido"),
  email: yup.string().email("Email invalido").required("El campo es requerdio"),
  phone: yup.string().required("El campo es requerido"),
  ci: yup.string().required("El campo es requerido"),
  nationality: yup.string().required("El campo es requerido"),
  dateOfBirth: yup.string().required("El campo es requerido"),
  passportNumber: yup.string().optional(),
  documentType: yup.string().required("El campo es requerido"),
  // additionalInformation: yup.string().optional(),
});

// export const bookingSchema = Yup.object().shape({
//   tourPackageId: Yup.string(),
//   DateRangeId: Yup.string(),
//   sellerId: Yup.string(),
//   mainTouristId: Yup.string(),
//   additionalTourists:
// });
