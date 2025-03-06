import { Box, Typography } from "@mui/material";
import TourPackageForm from "./TourPackageForm";
import BreadCrumbsContainer from "../../breadCrumbs/BreadCrumbsContainer";
import { useFormik } from "formik";
import { TourPackageType } from "../types/TourPackageType";
import { tourPackageSchema } from "./validation/tourPackageSchema";
import { useTourTypeContext } from "../../../context/TourTypeContext";
import { useCancellationConditionContext } from "../../cancellationPolicy/context/CancellationPolicyContext";
import { useTouristDestinationContext } from "../../touristDestination/context/TouristDestinationContext";
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
}
const TourPackageformContainer: React.FC<TourPackageFormContainerProps> = ({
  open,
  handleClick,
  tourPackage,
}) => {
  const { tourTypes } = useTourTypeContext();
  const { cancellationPolicy } = useCancellationConditionContext();
  const { touristDestinations } = useTouristDestinationContext();

  const onSubmit = async (userData: any) => {
    console.log("userData::: ", userData);
  };

  const formik = useFormik<TourPackageFormValues>({
    initialValues: {
      id: tourPackage?.id ?? "",
      name: tourPackage?.name ?? "",
      tourType: tourPackage?.tourType ?? "",
      cancellationPolicy: tourPackage?.cancellationPolicy ?? "",
      touristDestination: tourPackage?.touristDestination ?? "",
    },
    validationSchema: tourPackageSchema,
    onSubmit,
  });

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
