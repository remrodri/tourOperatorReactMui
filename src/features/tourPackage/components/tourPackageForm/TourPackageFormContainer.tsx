import TourPackageForm from "./TourPackageForm";
import { useFormik } from "formik";
import { TourPackageType } from "../../types/TourPackageType";
import { tourPackageSchema } from "./validation/tourPackageSchema";
import { useTourTypeContext } from "../../../tourType/context/TourTypeContext";
import { useCancellationConditionContext } from "../../../cancellationPolicy/context/CancellationPolicyContext";
import { useTouristDestinationContext } from "../../../touristDestination/context/TouristDestinationContext";
import { TourItineraryType } from "../../types/DayItineraryType";
import { useTourPackageContext } from "../../context/TourPackageContext";
import { useEffect, useState } from "react";
import { DateRangeType } from "../../types/DateRangeType";
import { useUserContext } from "../../../userManagement/context/UserContext";
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
  dateRanges: DateRangeType[];
  // dateRanges: string[];
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
  const { guides, fetchGuides } = useUserContext();
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   fetchGuides();
  //   console.log("::: ");
  // }, [fetchGuides,guides]);

  const onSubmit = async (data: any) => {
    // console.log("data::: ", data);
    // console.log("tourPackage.id::: ", tourPackage?.id);
    if (tourPackage?.id) {
      await updateTourPackage(tourPackage.id, data);
    } else {
      await createTourPackage(data);
    }
    handleClick();
  };
  // console.log('tourPackage.dateRanges::: ', tourPackage.dateRanges);
  const formik = useFormik<TourPackageFormValues>({
    initialValues: {
      id: tourPackage?.id ?? "",
      name: tourPackage?.name ?? "",
      tourType: tourPackage?.tourType ?? "",
      cancellationPolicy: tourPackage?.cancellationPolicy ?? "",
      touristDestination: tourPackage?.touristDestination ?? "",
      duration: tourPackage?.duration ?? 1,
      dateRanges: ((tourPackage?.dateRanges as DateRangeType[]) ?? []).map(
        (dr) => ({
          ...dr,
          guides: dr.guides ?? [],
        })
      ),
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
    if(tourPackage){
      setIsEditing(true);
    }
  }, [tourPackage]);
  useEffect(() => {
    if (tourPackage?.dateRanges) {
      formik.setFieldValue("dateRanges", tourPackage.dateRanges);
    }
      // console.log('::: ',);
      fetchGuides();
  }, [tourPackage?.dateRanges]);
  // console.log('formik.values.dateRanges::: ', formik.values.dateRanges);
  return (
    <TourPackageForm
      guides={guides}
      open={open}
      handleClick={handleClick}
      formik={formik}
      tourTypes={tourTypes}
      cancellationPolicy={cancellationPolicy}
      touristDestinations={touristDestinations}
      isEditing={isEditing}
    />
  );
};
export default TourPackageformContainer;
