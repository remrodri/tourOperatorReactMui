import { useEffect, useMemo } from "react";
import { useFormik } from "formik";

import TourPackageForm from "./TourPackageForm";
import { tourPackageSchema } from "./validation/tourPackageSchema";

import { useTourTypeContext } from "../../../tourType/context/TourTypeContext";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { useTourPackageContext } from "../../context/TourPackageContext";
import { useUserContext } from "../../../userManagement/context/UserContext";

import { TourPackageType } from "../../types/TourPackageType";
import { DateRangeType } from "../../types/DateRangeType";
import { TourItineraryType } from "../../types/DayItineraryType";

export interface TourPackageFormValues {
  id?: string;
  name: string;
  tourType: string;
  touristDestination: string;
  duration: number | ""; // para permitir input vacío mientras escribe
  dateRanges: DateRangeType[];
  price: number | ""; // idem
  itinerary: TourItineraryType; // lo mantenemos SIEMPRE presente en el form
}

interface Props {
  open: boolean;
  handleClick: () => void;
  tourPackage?: TourPackageType;
}

const TourPackageFormContainer: React.FC<Props> = ({
  open,
  handleClick,
  tourPackage,
}) => {
  const { tourTypes } = useTourTypeContext();
  const { touristDestinations } = useTouristDestinationContext();
  const { createTourPackage, updateTourPackage } = useTourPackageContext();
  const { guides, fetchGuides } = useUserContext();

  const isEditMode = Boolean(tourPackage?.id);

  // Normaliza dateRanges (dates/guides nunca undefined en UI)
  const normalizedDateRanges = useMemo<DateRangeType[]>(
    () =>
      (tourPackage?.dateRanges ?? []).map((dr) => ({
        ...dr,
        dates: dr.dates ?? [],
        guides: dr.guides ?? [],
      })),
    [tourPackage?.dateRanges],
  );

  // Itinerary inicial (si no viene del backend, lo creamos)
  const initialItinerary = useMemo<TourItineraryType>(() => {
    const dur = tourPackage?.duration ?? 1;

    if (tourPackage?.itinerary?.days?.length) {
      return tourPackage.itinerary;
    }

    return {
      days: Array.from({ length: dur }, (_, i) => ({
        dayNumber: i + 1,
        activities: [],
      })),
    };
  }, [tourPackage]);

  const formik = useFormik<TourPackageFormValues>({
    initialValues: {
      id: tourPackage?.id ?? "",
      name: tourPackage?.name ?? "",
      tourType: tourPackage?.tourType ?? "",
      touristDestination: tourPackage?.touristDestination ?? "",
      duration: tourPackage?.duration ?? 1,
      dateRanges: normalizedDateRanges,
      price: tourPackage?.price ?? 0,
      itinerary: initialItinerary,
    },
    enableReinitialize: true,
    validationSchema: tourPackageSchema(isEditMode),
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const duration = values.duration === "" ? 1 : Number(values.duration);
      const price = values.price === "" ? 0 : Number(values.price);

      if (isEditMode && tourPackage?.id) {
        await updateTourPackage(tourPackage.id, {
          id: tourPackage.id,
          name: values.name,
          tourType: values.tourType,
          touristDestination: values.touristDestination,
          duration,
          price,
          itinerary: values.itinerary,

          // si tu updateTourPackage también exige estos, añade:
          // activities: tourPackage.activities ?? [],
          // status: tourPackage.status ?? "active",
        });
      } else {
        await createTourPackage({
          name: values.name,
          tourType: values.tourType,
          touristDestination: values.touristDestination,
          duration,
          price,
          dateRanges: values.dateRanges,
          itinerary: values.itinerary,

          // ✅ requeridos por Omit<TourPackageType,"id">
          activities: [],
          status: "active", // o "draft"
        });
      }

      handleClick();
    },
  });

  // Traer guías
  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  // Mantener itinerary sincronizado con duration SOLO en creación (en edición duration está bloqueado)
  useEffect(() => {
    if (isEditMode) return;

    const dur =
      formik.values.duration === "" ? 1 : Number(formik.values.duration);
    const days = formik.values.itinerary.days ?? [];

    if (days.length !== dur) {
      const nextDays = Array.from({ length: dur }, (_, i) => ({
        dayNumber: i + 1,
        activities: days[i]?.activities ?? [],
      }));
      formik.setFieldValue("itinerary", { days: nextDays }, false);
    }
  }, [formik.values.duration, isEditMode]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TourPackageForm
      open={open}
      handleClick={handleClick}
      formik={formik}
      tourTypes={tourTypes}
      touristDestinations={touristDestinations}
      guides={guides}
      isEditing={isEditMode}
    />
  );
};

export default TourPackageFormContainer;
