import { Box, Typography } from "@mui/material";
import TourPackageForm from "./TourPackageForm";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { useFormik } from "formik";
import { TourPackageType } from "../types/TourPackageType";
import { tourPackageSchema } from "./validation/tourPackageSchema";
import { useTourTypeContext } from "../../../context/TourTypeContext";
import { useCancellationConditionContext } from "../../cancellationPolicy/context/CancellationPolicyContext";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
import { DayItineraryType, TourItineraryType } from "../types/DayItineraryType";
import { useTourPackageContext } from "../context/TourPackageContext";
import { useEffect } from "react";
interface TourPackageFormContainerProps {
  open: boolean;
  handleClick: () => void;
  tourPackage?: TourPackageType;
}

interface TourPackageFormValues {
  id?: string;
  name: string;
  tourType: string;
  cancellationPolicy: string;
  touristDestination: string;
  duration: number;
  selectedDates: string[];
  // blockedDates: string[];
  price: number;
  itinerary: TourItineraryType;
  // onDateChange:(dates:any)=>void
}
const TourPackageformContainer: React.FC<TourPackageFormContainerProps> = ({
  open,
  handleClick,
  tourPackage,
}) => {
  // console.log('tourPackageDelForm::: ', tourPackage);
  const { tourTypes } = useTourTypeContext();
  const { cancellationPolicy } = useCancellationConditionContext();
  const { touristDestinations } = useTouristDestinationContext();
  const { createTourPackage, updateTourPackage } = useTourPackageContext();

  const onSubmit = async (data: any) => {
    // console.log("tourPackage.id::: ", tourPackage?.id);
    if (tourPackage?.id) {
      await updateTourPackage(tourPackage.id, data);
    } else {
      await createTourPackage(data);
    }
    handleClick();
    // createTourPackage(data);
  };
  // console.log('tourPackage.selectedDates::: ', tourPackage.selectedDates);
  const formik = useFormik<TourPackageFormValues>({
    initialValues: {
      id: tourPackage?.id ?? "",
      name: tourPackage?.name ?? "",
      tourType: tourPackage?.tourType ?? "",
      cancellationPolicy: tourPackage?.cancellationPolicy ?? "",
      touristDestination: tourPackage?.touristDestination ?? "",
      duration: tourPackage?.duration ?? 1,
      selectedDates: tourPackage?.selectedDates ?? [],
      // blockedDates: tourPackage?.blockedDates ?? [],
      price: tourPackage?.price ?? 0,
      itinerary: tourPackage?.itinerary ?? {
        days: Array(tourPackage?.duration || 1)
          .fill(null)
          .map((_, index) => ({
            dayNumber: index + 1,
            activities: [],
          })),
      },
    },
    validationSchema: tourPackageSchema,
    onSubmit,
  });
  useEffect(() => {
    if (tourPackage?.selectedDates) {
      formik.setFieldValue("selectedDates", tourPackage.selectedDates);
    }
  }, [tourPackage?.selectedDates]);
  // console.log('formik.values.selectedDates::: ', formik.values.selectedDates);
  return (
    <TourPackageForm
      open={open}
      handleClick={handleClick}
      formik={formik}
      tourTypes={tourTypes}
      cancellationPolicy={cancellationPolicy}
      touristDestinations={touristDestinations}
    />
  );
};
export default TourPackageformContainer;
