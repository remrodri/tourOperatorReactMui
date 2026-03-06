import * as Yup from "yup";
import { ActivityType } from "../../../types/ActivityType";
import { DayItineraryType, TourItineraryType } from "../../../types/DayItineraryType";
import { DateRangeType } from "../../../types/DateRangeType";


const DATE_FORMAT = /^\d{2}-\d{2}-\d{4}$/; // DD-MM-YYYY
const MAX_DURATION = 30;

// ✅ Permite flags para schemas con default()
type YupFlags = "" | "d" | "s"; // recomendado cuando usas default() [1](https://www.justinmind.com/ux-design/user-onboarding)[2](https://www.toptal.com/designers/product-design/guide-to-onboarding-ux)

const numberFromInput = (typeMsg: string, reqMsg: string) =>
  Yup.number()
    .transform((value, originalValue) =>
      originalValue === "" || Number.isNaN(value) ? undefined : value,
    )
    .typeError(typeMsg)
    .required(reqMsg);

/* -----------------------------
   ITINERARY (no actividades vacías)
-------------------------------- */

// ActivityType: description y time obligatorios
const activitySchema: Yup.ObjectSchema<ActivityType> = Yup.object({
  id: Yup.string().optional(),

  description: Yup.string()
    .trim()
    .min(1, "La descripción no puede estar vacía")
    .required("La descripción es obligatoria"),

  time: Yup.string()
    .trim()
    .min(1, "La hora no puede estar vacía")
    .required("La hora es obligatoria"),
});

// DayItineraryType: activities es requerido (array)
const daySchema: Yup.ObjectSchema<DayItineraryType> = Yup.object({
  dayNumber: Yup.number()
    .integer("El día debe ser un entero")
    .min(1, "El día mínimo es 1")
    .required("El número de día es requerido"),

  activities: Yup.array()
    .of(activitySchema)
    .required("Las actividades son requeridas")
    .default([]), // <- esto activa flag "d"
});

// ✅ CLAVE: NO tipar con 4to genérico ""
const itinerarySchema: Yup.Schema<
  TourItineraryType | null,
  any,
  any,
  YupFlags
> = Yup.object({
  days: Yup.array()
    .of(daySchema)
    .required("Los días del itinerario son requeridos")
    .default([]), // <- flag "d"
})
  .nullable()
  .default(null); // <- flag "d"

/* -----------------------------
   DATERANGE
-------------------------------- */

const dateRangeItemSchema: Yup.ObjectSchema<DateRangeType> = Yup.object({
  id: Yup.string().optional(),
  state: Yup.string().optional(),
  tourPackageId: Yup.string().optional(),

  dates: Yup.array()
    .of(
      Yup.string()
        .required("Fecha inválida")
        .matches(DATE_FORMAT, "Formato de fecha inválido (DD-MM-YYYY)"),
    )
    .required("Fechas requeridas")
    .default([]), // flag "d"

  guides: Yup.array()
    .of(Yup.string().required("ID de guía requerido"))
    .min(1, "Debes asignar al menos un guía")
    .required("Guías requeridos")
    .default([]), // flag "d"
});

/* -----------------------------
   MAIN: TOUR PACKAGE
-------------------------------- */

export const tourPackageSchema = (isEditMode: boolean) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .min(3, "Debe tener al menos 3 caracteres")
      .max(80, "Debe tener como máximo 80 caracteres")
      .required("El nombre es obligatorio"),

    tourType: Yup.string().required("El tipo de tour es obligatorio"),

    touristDestination: Yup.string().required(
      "El destino turístico es obligatorio",
    ),

    duration: numberFromInput(
      "La duración debe ser un número válido",
      "La duración es obligatoria",
    )
      .integer("La duración debe ser un número entero")
      .min(1, "La duración mínima es 1 día")
      .max(MAX_DURATION, `La duración máxima es ${MAX_DURATION} días`),

    price: Yup.number()
      .moreThan(0, "Debe ser mayor a 0")
      .max(
        100000,
        "El precio supera el límite permitido. Contacta con administración.",
      )
      .required("El precio es obligatorio"),

    dateRanges: Yup.array()
      .of(dateRangeItemSchema)
      .when([], {
        is: () => !isEditMode,
        then: (schema) =>
          schema
            .min(1, "Debes agregar al menos un rango de fechas")
            .required("Los rangos de fechas son requeridos"),
        otherwise: (schema) => schema.optional(),
      })
      // ✅ cada rango debe tener exactamente duration fechas
      .test("dates-match-duration", function (ranges) {
        if (!ranges || ranges.length === 0) return true;

        const duration = this.parent?.duration;
        if (!duration || typeof duration !== "number") return true;

        const badIndex = ranges.findIndex(
          (r: DateRangeType) => (r.dates?.length ?? 0) !== duration,
        );

        if (badIndex === -1) return true;

        return this.createError({
          path: `dateRanges[${badIndex}].dates`,
          message: `El rango debe tener exactamente ${duration} día(s) según la duración`,
        });
      })
      // ✅ no permitir fechas repetidas entre rangos
      .test(
        "no-overlap",
        "No puede haber fechas repetidas entre rangos",
        (ranges) => {
          if (!ranges || ranges.length === 0) return true;
          const all = ranges.flatMap((r) => r.dates ?? []);
          return new Set(all).size === all.length;
        },
      ),

    itinerary: itinerarySchema.test(
      "itinerary-days-match-duration",
      function (itinerary) {
        if (!itinerary) return true;

        const duration = this.parent?.duration;
        if (!duration || typeof duration !== "number") return true;

        const len = itinerary.days.length;
        if (len === duration) return true;

        return this.createError({
          path: "itinerary.days",
          message: `El itinerario debe tener exactamente ${duration} día(s)`,
        });
      },
    ),
  });
